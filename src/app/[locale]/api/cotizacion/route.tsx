import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getTranslations } from "next-intl/server";

const parseDetailedString = (input: string) => {
  const dateRegex = /(\d{4}-\d{2}-\d{2})/g;
  const messageRegex = /(?:Mensaje|Notas|Detalles):\s*(.*)/i;

  const dates = input.match(dateRegex);
  const messageMatch = input.match(messageRegex);

  return {
    initial_date: dates && dates[0] ? dates[0] : null,
    final_date: dates && dates[1] ? dates[1] : null,
    message: messageMatch ? messageMatch[1].trim() : input
  };
};

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { nombre, email, telefono, personas, experiencia_title, detalles, id, locale = 'es' } = data;

    const t = await getTranslations({ locale, namespace: "Emails.Quote" });
    const { initial_date, final_date, message } = parseDetailedString(detalles);

    // 1. EMAIL PARA EL CLIENTE (Teal & Magenta Flat Design)
    await resend.emails.send({
      from: "Odyssey México <informacion@odysseymexico.com>",
      to: email,
      subject: `${t('subject')} - ${experiencia_title}`,
      html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { background-color: #f4f7f7; margin: 0; padding: 0; }
        .wrapper { font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; }
        .main-card { background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e0e7e7; }
        
        /* Header Teal */
        .header { background-color: #008080; padding: 40px; text-align: left; }
        .logo { font-size: 16px; font-weight: 900; letter-spacing: 8px; text-transform: uppercase; color: #ffffff; margin: 0; }
        
        .body-content { padding: 40px; }
        .title { font-size: 26px; font-weight: 800; color: #000000; margin-top: 0; margin-bottom: 15px; text-transform: uppercase; letter-spacing: -1px; }
        .accent-bar { height: 4px; width: 40px; background-color: #D1127C; margin-bottom: 30px; border-radius: 2px; }
        
        /* Tabla de 2 Columnas */
        .info-table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        .info-row { border-bottom: 1px solid #f0f0f0; }
        .info-label-col { width: 35%; padding: 15px 0; vertical-align: top; }
        .info-value-col { width: 65%; padding: 15px 0 15px 20px; vertical-align: top; }
        
        .label { font-size: 9px; font-weight: 900; color: #99abb0; text-transform: uppercase; letter-spacing: 2px; }
        .value { font-size: 13px; font-weight: 700; color: #008080; line-height: 1.4; text-transform: uppercase; }
        
        /* Caja de Mensaje Magenta */
        .message-box { background-color: #fdf2f8; border-left: 4px solid #D1127C; padding: 20px; margin-top: 30px; border-radius: 4px; }
        .message-label { font-size: 9px; font-weight: 900; color: #D1127C; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; display: block; }

        .footer { padding: 40px; border-top: 1px solid #eeeeee; text-align: left; }
        .footer-text { font-size: 10px; color: #99abb0; letter-spacing: 1px; line-height: 1.6; text-transform: uppercase; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="main-card">
          <div class="header">
            <p class="logo">Odyssey México</p>
          </div>
          
          <div class="body-content">
            <h1 class="title">${t('title')}</h1>
            <div class="accent-bar"></div>
            
            <p style="font-size: 14px; color: #555555; line-height: 1.6; margin-bottom: 30px;">
              ${t.rich('greeting', {
                    name: nombre.split(' ')[0],
                    experience: experiencia_title,
                    strong: (chunks: React.ReactNode) => `<strong>${chunks}</strong>`
                  })}
            </p>

            <table class="info-table" width="100%">
              <tr class="info-row">
                <td class="info-label-col">
                  <span class="label">${t('labels.pax')}</span>
                </td>
                <td class="info-value-col">
                  <span class="value" style="color:#000;">${personas} ${t('labels.people')}</span>
                </td>
              </tr>
              
              ${initial_date ? `
              <tr class="info-row">
                <td class="info-label-col">
                  <span class="label">${t('labels.period')}</span>
                </td>
                <td class="info-value-col">
                  <span class="value">${initial_date} — ${final_date}</span>
                </td>
              </tr>
              ` : ''}

              <tr class="info-row" style="border-bottom: none;">
                <td class="info-label-col">
                  <span class="label">ID Ref</span>
                </td>
                <td class="info-value-col">
                  <span class="value" style="font-size: 11px; color: #999;">#${id?.substring(0, 8)}</span>
                </td>
              </tr>
            </table>

            <div class="message-box">
              <span class="message-label">${t('labels.notes')}</span>
              <p style="margin: 0; font-size: 13px; color: #333; line-height: 1.5; font-style: italic;">"${message}"</p>
            </div>
          </div>

          <div class="footer">
            <p class="footer-text">
              <strong style="color: #008080;">Odyssey México</strong><br>
              Luxury & Concierge Services<br><br>
              ${t('disclaimer')}
            </p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `,
    });

    // 2. EMAIL PARA EL ADMINISTRADOR (Flat & High-Contrast para gestión)
    await resend.emails.send({
      from: "Odyssey México System <informacion@odysseymexico.com>",
      to: "informacion@odysseymexico.com",
      subject: `NUEVA SOLICITUD: ${nombre} - ID: ${id?.substring(0, 8)}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; background: #ffffff; border: 2px solid #008080; border-radius: 12px;">
          <h2 style="font-size: 12px; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 25px; background: #008080; color: #ffffff; padding: 12px; display: inline-block; border-radius: 4px;">Lead de Cotización</h2>
          
          <table width="100%" style="border-collapse: collapse; margin-top: 10px;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-size: 10px; font-weight: bold; color: #999; text-transform: uppercase; width: 30%;">Cliente</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-size: 13px; color: #000; font-weight: 700;">${nombre}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-size: 10px; font-weight: bold; color: #999; text-transform: uppercase;">Contacto</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-size: 13px; color: #008080;">${email} | ${telefono}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-size: 10px; font-weight: bold; color: #999; text-transform: uppercase;">Experiencia</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-size: 13px; color: #D1127C; font-weight: 800;">${experiencia_title}</td>
            </tr>
             <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-size: 10px; font-weight: bold; color: #999; text-transform: uppercase;">Detalles</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-size: 13px; color: #000;">${personas} pax | Idioma: ${locale.toUpperCase()}</td>
            </tr>
          </table>

          <div style="margin-top: 30px; padding: 25px; background: #f4f7f7; border-radius: 8px; border: 1px dashed #008080;">
            <p style="font-size: 10px; font-weight: bold; color: #008080; text-transform: uppercase; margin-top: 0; letter-spacing: 1px;">Mensaje del Cliente</p>
            <p style="font-size: 14px; color: #333; line-height: 1.6; margin-bottom: 0;">${message}</p>
            ${initial_date ? `<p style="font-size: 12px; margin-top: 15px; color: #666;"><strong>Fechas:</strong> ${initial_date} / ${final_date}</p>` : ''}
          </div>
          
          <p style="font-size: 9px; color: #bbb; margin-top: 25px; text-align: center; text-transform: uppercase;">ID Sistema: ${id}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error en API Cotización:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}