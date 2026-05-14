import type { OrderInput, OrderLine } from "./order";

const fmt = new Intl.NumberFormat("pt-PT", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
});

function row(label: string, value: string) {
  return `<tr><td style="padding:8px 0;color:#999;font-size:13px;width:130px">${label}</td><td style="padding:8px 0;color:#fff;font-size:14px">${value}</td></tr>`;
}

function linesTable(lines: OrderLine[]) {
  const head = `<tr style="background:#0a0a0a">
    <th style="padding:12px;text-align:left;color:#D4AF37;font-size:12px;letter-spacing:1px;text-transform:uppercase">Produto</th>
    <th style="padding:12px;text-align:center;color:#D4AF37;font-size:12px;letter-spacing:1px;text-transform:uppercase">Qtd</th>
    <th style="padding:12px;text-align:right;color:#D4AF37;font-size:12px;letter-spacing:1px;text-transform:uppercase">Total</th>
  </tr>`;
  const body = lines
    .map(
      (l) => `<tr style="border-top:1px solid #1f1f1f">
      <td style="padding:14px 12px;color:#fff;font-size:14px">
        <strong>${escape(l.name)}</strong>
        ${l.size || l.color ? `<br><span style="color:#999;font-size:12px">${[l.size, l.color].filter(Boolean).join(" · ")}</span>` : ""}
      </td>
      <td style="padding:14px 12px;text-align:center;color:#fff;font-size:14px">${l.qty}</td>
      <td style="padding:14px 12px;text-align:right;color:#fff;font-size:14px">${fmt.format(l.price * l.qty)}</td>
    </tr>`,
    )
    .join("");
  return `<table cellspacing="0" cellpadding="0" style="width:100%;border-collapse:collapse;background:#141414;border:1px solid #1f1f1f">${head}${body}</table>`;
}

function escape(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[c]!);
}

function layout(body: string) {
  return `<!doctype html>
<html><body style="margin:0;padding:0;background:#000;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#fff">
  <table cellpadding="0" cellspacing="0" style="width:100%;background:#000">
    <tr><td align="center" style="padding:32px 16px">
      <table cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#0a0a0a;border:1px solid #1f1f1f">
        <tr><td style="padding:32px 28px 16px;border-bottom:1px solid #1f1f1f">
          <div style="font-size:11px;letter-spacing:4px;color:#D4AF37;font-weight:700">PLUG EMPIRE</div>
          <div style="font-size:11px;color:#666;letter-spacing:2px;margin-top:4px">PORTUGAL · EST. 2022</div>
        </td></tr>
        <tr><td style="padding:32px 28px">${body}</td></tr>
        <tr><td style="padding:24px 28px;border-top:1px solid #1f1f1f;text-align:center">
          <div style="font-size:11px;color:#666;letter-spacing:1px">© Plug Empire · Todos os direitos reservados</div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

type Params = {
  ref: string;
  order: OrderInput;
  subtotal: number;
  total: number;
  iban: string;
  beneficiary: string;
  bic?: string;
};

export function customerEmail({ ref, order, subtotal, total, iban, beneficiary, bic }: Params) {
  const pt = order.lang === "pt";
  const lines = linesTable(order.lines);
  const body = `
    <h1 style="font-size:28px;margin:0 0 8px;color:#fff;font-weight:700;letter-spacing:-0.5px">
      ${pt ? "Encomenda recebida" : "Order received"}
    </h1>
    <p style="font-size:15px;color:#a1a1a1;line-height:1.6;margin:0 0 24px">
      ${pt ? `Olá <strong style="color:#fff">${escape(order.customer.name.split(" ")[0])}</strong>, recebemos a tua encomenda. Para concluir, faz a transferência abaixo. Assim que recebermos, preparamos o envio.` : `Hi <strong style="color:#fff">${escape(order.customer.name.split(" ")[0])}</strong>, we've received your order. To complete it, please transfer to the account below. Once it lands, we'll prepare your shipment.`}
    </p>

    <div style="margin:24px 0 16px;padding:20px;background:#141414;border-left:3px solid #D4AF37">
      <div style="font-size:11px;letter-spacing:2px;color:#D4AF37;font-weight:700;text-transform:uppercase;margin-bottom:6px">
        ${pt ? "Referência" : "Reference"}
      </div>
      <div style="font-size:22px;color:#fff;font-family:'Courier New',monospace;letter-spacing:1px">${ref}</div>
      <div style="font-size:12px;color:#999;margin-top:8px">
        ${pt ? "Inclui esta referência na transferência" : "Include this reference in your transfer"}
      </div>
    </div>

    <h2 style="font-size:14px;letter-spacing:2px;color:#D4AF37;text-transform:uppercase;margin:32px 0 12px;font-weight:700">
      ${pt ? "Dados para transferência" : "Bank details"}
    </h2>
    <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse">
      ${row(pt ? "Beneficiário" : "Beneficiary", escape(beneficiary))}
      ${row("IBAN", `<span style="font-family:'Courier New',monospace">${escape(iban)}</span>`)}
      ${bic ? row("BIC / SWIFT", `<span style="font-family:'Courier New',monospace">${escape(bic)}</span>`) : ""}
      ${row(pt ? "Montante" : "Amount", `<strong style="color:#D4AF37">${fmt.format(total)}</strong>`)}
      ${row(pt ? "Referência" : "Reference", `<strong>${ref}</strong>`)}
    </table>

    <h2 style="font-size:14px;letter-spacing:2px;color:#D4AF37;text-transform:uppercase;margin:32px 0 12px;font-weight:700">
      ${pt ? "Resumo da encomenda" : "Order summary"}
    </h2>
    ${lines}

    <table cellpadding="0" cellspacing="0" style="width:100%;margin-top:16px">
      <tr><td style="padding:6px 0;color:#999;font-size:13px">${pt ? "Subtotal" : "Subtotal"}</td><td style="padding:6px 0;text-align:right;color:#fff;font-size:14px">${fmt.format(subtotal)}</td></tr>
      <tr><td style="padding:6px 0;color:#999;font-size:13px">${pt ? "Envio" : "Shipping"}</td><td style="padding:6px 0;text-align:right;color:#fff;font-size:14px">${order.shipping === 0 ? (pt ? "Grátis" : "Free") : fmt.format(order.shipping)}</td></tr>
      <tr style="border-top:1px solid #1f1f1f"><td style="padding:14px 0 6px;color:#fff;font-size:13px;letter-spacing:2px;text-transform:uppercase;font-weight:700">Total</td><td style="padding:14px 0 6px;text-align:right;color:#D4AF37;font-size:22px;font-weight:700">${fmt.format(total)}</td></tr>
    </table>

    <h2 style="font-size:14px;letter-spacing:2px;color:#D4AF37;text-transform:uppercase;margin:32px 0 12px;font-weight:700">
      ${pt ? "Entrega" : "Delivery"}
    </h2>
    <p style="font-size:14px;color:#fff;line-height:1.7;margin:0">
      ${escape(order.customer.name)}<br>
      ${escape(order.customer.address)}<br>
      ${escape(order.customer.postcode)} ${escape(order.customer.city)}<br>
      ${escape(order.customer.country)}<br>
      <span style="color:#999;font-size:13px">${escape(order.customer.phone)}</span>
    </p>

    <div style="margin-top:32px;padding:20px;background:#0f0f0f;border:1px solid #1f1f1f">
      <p style="font-size:13px;color:#999;line-height:1.7;margin:0">
        ${pt ? "Dúvidas? Responde a este email — vai cair direto para nós." : "Questions? Just reply to this email — it goes straight to us."}
      </p>
    </div>
  `;
  return layout(body);
}

export function ownerEmail({ ref, order, subtotal, total }: Params) {
  const lines = linesTable(order.lines);
  const body = `
    <h1 style="font-size:28px;margin:0 0 8px;color:#fff;font-weight:700">🔔 Nova encomenda</h1>
    <div style="font-size:22px;color:#D4AF37;font-family:'Courier New',monospace;margin:0 0 24px;letter-spacing:1px">${ref}</div>

    <h2 style="font-size:14px;letter-spacing:2px;color:#D4AF37;text-transform:uppercase;margin:24px 0 12px;font-weight:700">Cliente</h2>
    <table cellpadding="0" cellspacing="0" style="width:100%">
      ${row("Nome", escape(order.customer.name))}
      ${row("Email", `<a href="mailto:${escape(order.customer.email)}" style="color:#D4AF37">${escape(order.customer.email)}</a>`)}
      ${row("Telefone", `<a href="tel:${escape(order.customer.phone)}" style="color:#D4AF37">${escape(order.customer.phone)}</a>`)}
      ${row("Morada", escape(order.customer.address))}
      ${row("Cidade", `${escape(order.customer.postcode)} ${escape(order.customer.city)}`)}
      ${row("País", escape(order.customer.country))}
      ${order.customer.notes ? row("Notas", escape(order.customer.notes)) : ""}
    </table>

    <h2 style="font-size:14px;letter-spacing:2px;color:#D4AF37;text-transform:uppercase;margin:24px 0 12px;font-weight:700">Pedido</h2>
    ${lines}

    <table cellpadding="0" cellspacing="0" style="width:100%;margin-top:16px">
      <tr><td style="padding:6px 0;color:#999;font-size:13px">Subtotal</td><td style="padding:6px 0;text-align:right;color:#fff">${fmt.format(subtotal)}</td></tr>
      <tr><td style="padding:6px 0;color:#999;font-size:13px">Envio</td><td style="padding:6px 0;text-align:right;color:#fff">${order.shipping === 0 ? "Grátis" : fmt.format(order.shipping)}</td></tr>
      <tr style="border-top:1px solid #1f1f1f"><td style="padding:14px 0 6px;color:#fff;letter-spacing:2px;text-transform:uppercase;font-weight:700">Total a receber</td><td style="padding:14px 0 6px;text-align:right;color:#D4AF37;font-size:22px;font-weight:700">${fmt.format(total)}</td></tr>
    </table>

    <p style="font-size:12px;color:#666;margin-top:24px">
      O cliente recebeu IBAN e referência. Aguarda transferência com ref <strong style="color:#D4AF37">${ref}</strong>.
    </p>
  `;
  return layout(body);
}
