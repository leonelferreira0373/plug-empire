import nodemailer from "nodemailer";

let cachedTransporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (cachedTransporter) return cachedTransporter;

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error("Missing SMTP_HOST / SMTP_USER / SMTP_PASS env vars");
  }

  cachedTransporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  return cachedTransporter;
}

type SendArgs = {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
};

export async function sendMail({ to, subject, html, replyTo }: SendArgs) {
  const transporter = getTransporter();
  const from = process.env.EMAIL_FROM ?? "Stravages <noreply@plugempire.com>";

  const info = await transporter.sendMail({
    from,
    to,
    subject,
    html,
    replyTo,
  });

  return { messageId: info.messageId, accepted: info.accepted };
}
