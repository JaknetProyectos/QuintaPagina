import { CheckoutInfo } from "@/interfaces/CheckoutInfo";
import { Reservation } from "@/interfaces/Reservations";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getTranslations } from "next-intl/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      reservations,
      checkoutInfo,
      locale = 'es'
    }: { reservations: Reservation[], checkoutInfo: CheckoutInfo, locale?: string } = body;

    const t = await getTranslations({ locale, namespace: "Emails.Checkout" });
    const customerEmail = checkoutInfo.billingAddress.email;

    await resend.emails.send({
      from: "Odyssey México <informacion@odysseymexico.com>",
      to: [customerEmail, "informacion@odysseymexico.com"],
      subject: `${t('subject')} #${checkoutInfo.orderId}`,
      html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { background-color: #f8f8f8; margin: 0; padding: 0; }
        .wrapper { font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; }
        .main-card { background-color: #ffffff; padding: 50px; border: 1px solid #eeeeee; }
        
        .header { text-align: left; margin-bottom: 50px; border-bottom: 2px solid #000000; padding-bottom: 20px; }
        .logo { font-size: 16px; font-weight: 900; letter-spacing: 6px; text-transform: uppercase; color: #000000; margin: 0; }
        
        .title { font-size: 28px; font-weight: 800; color: #000000; text-transform: uppercase; letter-spacing: -1px; margin-bottom: 5px; }
        .order-id { font-size: 10px; font-weight: 800; color: #999999; text-transform: uppercase; letter-spacing: 2px; }

        /* Tabla de Experiencias */
        .ticket-table { width: 100%; border-collapse: collapse; margin: 40px 0; }
        .ticket-table th { text-align: left; font-size: 9px; text-transform: uppercase; color: #999999; padding-bottom: 15px; letter-spacing: 2px; border-bottom: 1px solid #000000; }
        .ticket-table td { padding: 20px 0; border-bottom: 1px solid #f2f2f2; vertical-align: top; }
        
        .item-title { font-size: 13px; font-weight: 800; text-transform: uppercase; color: #000000; display: block; }
        .item-subtitle { font-size: 10px; color: #888888; text-transform: uppercase; letter-spacing: 1px; }
        .pax-count { font-size: 12px; font-weight: 700; color: #000000; }
        .price-text { font-size: 13px; font-weight: 800; color: #000000; text-align: right; }

        /* Estructura de 2 columnas para totales y billing */
        .grid-table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        .grid-col { width: 50%; vertical-align: top; padding: 20px 10px 20px 0; }
        .grid-col.right { padding: 20px 0 20px 10px; border-left: 1px solid #eeeeee; }

        .label { font-size: 9px; font-weight: 800; color: #999999; text-transform: uppercase; letter-spacing: 2px; display: block; margin-bottom: 10px; }
        .value-large { font-size: 22px; font-weight: 800; color: #000000; letter-spacing: -1px; }
        .value-small { font-size: 11px; font-weight: 600; color: #555555; line-height: 1.8; text-transform: uppercase; }

        .footer { margin-top: 60px; padding-top: 30px; border-top: 1px solid #eeeeee; text-align: center; }
        .footer-text { font-size: 9px; color: #bbbbbb; text-transform: uppercase; letter-spacing: 3px; line-height: 2; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="main-card">
          <div class="header">
            <p class="logo">Odyssey México</p>
          </div>
          
          <h1 class="title">${t('confirmation_title')}</h1>
          <p class="order-id">${t('order_label')} #${checkoutInfo.orderId} / ${checkoutInfo.orderDate}</p>

          <table class="ticket-table" width="100%">
            <thead>
              <tr>
                <th width="60%">${t('table.header_experience')}</th>
                <th width="15%" style="text-align: center;">${t('table.header_pax')}</th>
                <th width="25%" style="text-align: right;">TOTAL</th>
              </tr>
            </thead>
            <tbody>
              ${reservations.map(res => `
                <tr>
                  <td>
                    <span class="item-title">${res.activityTitle ?? res?.activity_title}</span>
                    <span class="item-subtitle">${t('table.reservation_label')}: ${res.fecha}</span>
                  </td>
                  <td style="text-align: center;">
                    <span class="pax-count">${res.personas}</span>
                  </td>
                  <td style="text-align: right;">
                    <span class="price-text">$${Number(res.price).toLocaleString(locale === 'es' ? 'es-MX' : 'en-US')}</span>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <table class="grid-table" width="100%">
            <tr>
              <td class="grid-col">
                <span class="label">${t('billing.title')}</span>
                <div class="value-small">
                  <strong>${checkoutInfo.billingAddress.nombre}</strong><br>
                  ${checkoutInfo.billingAddress.calle}<br>
                  ${checkoutInfo.billingAddress.ciudad}, CP ${checkoutInfo.billingAddress.codigoPostal}<br>
                  TEL: ${checkoutInfo.billingAddress.telefono}<br>
                  ${checkoutInfo.billingAddress.email}
                </div>
              </td>
              <td class="grid-col right">
                <div style="margin-bottom: 25px;">
                  <span class="label">${t('summary.total_paid')}</span>
                  <span class="value-large">${checkoutInfo.subtotal} MXN</span>
                </div>
                <div>
                  <span class="label">${t('summary.payment_method')}</span>
                  <span class="value-small" style="font-weight: 800; color: #000;">${checkoutInfo.metodoPago}</span>
                </div>
              </td>
            </tr>
          </table>

          <div class="footer">
            <p class="footer-text">
              ${t('footer.thanks')}<br>
              <strong>ODYSSEY MÉXICO</strong><br>
              <span style="font-size: 8px; color: #ddd;">MEXICO CITY | WORLDWIDE</span>
            </p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error enviando ticket:", error);
    return NextResponse.json({ error: "Error interno al procesar el ticket" }, { status: 500 });
  }
}