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
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #333333; line-height: 1.6; margin: 0; padding: 0; background-color: #f4f7f7; -webkit-font-smoothing: antialiased; }
        .wrapper { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
        
        /* Tarjeta Principal */
        .main-card { background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e0e7e7; }
        
        /* Header con Marca */
        .header { background-color: #008080; padding: 40px; text-align: center; }
        .logo { font-size: 18px; font-weight: 900; letter-spacing: 10px; margin: 0; text-transform: uppercase; color: #ffffff; }
        
        /* Hero Sección */
        .hero { padding: 40px; text-align: center; border-bottom: 1px solid #f0f0f0; }
        .hero h2 { font-size: 22px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 10px 0; color: #008080; }
        .order-tag { display: inline-block; background-color: #D1127C; color: #ffffff; font-size: 10px; font-weight: 900; padding: 6px 12px; border-radius: 6px; text-transform: uppercase; letter-spacing: 2px; }
        
        /* Tabla de Contenido */
        .content-area { padding: 0 40px; }
        .ticket-table { width: 100%; border-collapse: collapse; }
        .ticket-table th { text-align: left; font-size: 10px; text-transform: uppercase; color: #999; padding: 20px 0 10px 0; border-bottom: 2px solid #f0f0f0; letter-spacing: 1px; }
        .ticket-table td { padding: 20px 0; border-bottom: 1px solid #f9f9f9; vertical-align: top; }
        
        .item-title { font-size: 14px; font-weight: 800; text-transform: uppercase; color: #000; display: block; margin-bottom: 4px; }
        .item-subtitle { font-size: 10px; color: #008080; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
        .price-col { text-align: right; font-weight: 800; font-size: 14px; color: #000; }
        
        /* Desglose Final */
        .summary-box { background-color: #f9fdfd; margin: 30px 40px; padding: 30px; border-radius: 12px; border: 1px solid #e6f0f0; }
        .summary-row { width: 100%; border-collapse: collapse; }
        .summary-label { font-size: 10px; text-transform: uppercase; color: #666; font-weight: 800; letter-spacing: 1px; }
        .summary-total { font-size: 24px; font-weight: 900; color: #D1127C; text-align: right; }

        /* Información de Facturación (2 Columnas) */
        .billing-section { padding: 0 40px 40px 40px; }
        .billing-card { width: 100%; border-collapse: collapse; }
        .billing-title { font-size: 10px; font-weight: 900; text-transform: uppercase; color: #008080; letter-spacing: 2px; margin-bottom: 15px; display: block; }
        .billing-text { font-size: 12px; color: #555; line-height: 1.8; text-transform: uppercase; }

        .footer { text-align: center; padding: 40px 20px; }
        .footer-text { font-size: 10px; color: #99abb0; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 10px; }
        .footer-brand { font-size: 12px; font-weight: 900; color: #008080; letter-spacing: 4px; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="main-card">
          <div class="header">
            <p class="logo">Odyssey México</p>
          </div>
          
          <div class="hero">
            <h2>${t('confirmation_title')}</h2>
            <div class="order-tag">${t('order_label')} #${checkoutInfo.orderId}</div>
            <p style="font-size: 11px; color: #999; margin-top: 15px; text-transform: uppercase; letter-spacing: 1px;">${checkoutInfo.orderDate}</p>
          </div>

          <div class="content-area">
            <table class="ticket-table">
              <thead>
                <tr>
                  <th width="70%">${t('table.header_experience')}</th>
                  <th width="30%" style="text-align: right;">${t('table.header_pax')} / Total</th>
                </tr>
              </thead>
              <tbody>
                ${reservations.map(res => `
                  <tr>
                    <td>
                      <span class="item-title">${res.activityTitle ?? res?.activity_title}</span>
                      <span class="item-subtitle">${t('table.reservation_label')}: ${res.fecha}</span>
                    </td>
                    <td class="price-col">
                      <span style="font-size: 11px; color: #999; display: block; margin-bottom: 4px;">${res.personas} PAX</span>
                      $${Number(res.price).toLocaleString(locale === 'es' ? 'es-MX' : 'en-US')}
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <div class="summary-box">
            <table class="summary-row">
              <tr>
                <td class="summary-label">
                  ${t('summary.total_paid')}<br>
                  <span style="color: #008080; font-size: 9px;">${checkoutInfo.metodoPago}</span>
                </td>
                <td class="summary-total">${checkoutInfo.subtotal} MXN</td>
              </tr>
            </table>
          </div>

          <div class="billing-section">
            <table class="billing-card" width="100%">
              <tr>
                <td style="background-color: #ffffff; border: 2px solid #f0f0f0; border-radius: 12px; padding: 25px;">
                  <span class="billing-title">${t('billing.title')}</span>
                  <div class="billing-text">
                    <strong style="color: #000;">${checkoutInfo.billingAddress.nombre}</strong><br>
                    ${checkoutInfo.billingAddress.calle}<br>
                    ${checkoutInfo.billingAddress.ciudad}, CP ${checkoutInfo.billingAddress.codigoPostal}<br>
                    ${t('billing.phone')}: ${checkoutInfo.billingAddress.telefono}<br>
                    <span style="color: #008080; font-weight: 700;">${checkoutInfo.billingAddress.email}</span>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>

        <div class="footer">
          <p class="footer-text">${t('footer.thanks')}</p>
          <p class="footer-brand">ODYSSEY MÉXICO</p>
          <p style="font-size: 8px; color: #bdc8c9; margin-top: 20px; text-transform: uppercase; letter-spacing: 1px;">Luxury & Concierge Services | CDMX</p>
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