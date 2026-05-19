import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mailer";
import { customerEmail, ownerEmail } from "@/lib/email-templates";
import {
  generateOrderRef,
  calcSubtotal,
  type OrderInput,
} from "@/lib/order";
import { isSanityConfigured, sanityWriteClient } from "@/lib/sanity";

export const runtime = "nodejs";

function badRequest(msg: string) {
  return NextResponse.json({ ok: false, error: msg }, { status: 400 });
}

export async function POST(req: Request) {
  let payload: OrderInput;
  try {
    payload = await req.json();
  } catch {
    return badRequest("Invalid JSON");
  }

  if (!payload?.customer || !payload?.lines?.length) {
    return badRequest("Missing customer or lines");
  }

  const { customer, lines } = payload;
  if (!customer.name || !customer.email || !customer.phone || !customer.address) {
    return badRequest("Missing required customer fields");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) {
    return badRequest("Invalid email");
  }
  if (lines.some((l) => !l.name || !l.price || !l.qty || l.qty < 1)) {
    return badRequest("Invalid order line");
  }

  const subtotal = calcSubtotal(lines);
  const shipping = Math.max(0, Number(payload.shipping) || 0);
  const total = subtotal + shipping;
  const ref = generateOrderRef();

  const owner = process.env.EMAIL_OWNER;
  const iban = process.env.BANK_IBAN ?? "";
  const beneficiary = process.env.BANK_BENEFICIARY ?? "Stravages";
  const bic = process.env.BANK_BIC || undefined;

  if (!owner || !iban) {
    return NextResponse.json(
      { ok: false, error: "Server not configured" },
      { status: 500 },
    );
  }

  const params = { ref, order: payload, subtotal, total, iban, beneficiary, bic };

  // Persist order in Sanity if configured (non-blocking — email is the source of truth)
  if (isSanityConfigured && process.env.SANITY_API_WRITE_TOKEN) {
    try {
      await sanityWriteClient().create({
        _type: "order",
        ref,
        status: "pending",
        createdAt: new Date().toISOString(),
        lang: payload.lang,
        customer,
        lines,
        subtotal,
        shipping,
        total,
      });
    } catch (err) {
      console.error("[order] sanity write failed (non-fatal)", err);
    }
  }

  try {
    // Customer confirmation
    await sendMail({
      to: customer.email,
      subject:
        payload.lang === "pt"
          ? `Encomenda recebida · ${ref}`
          : `Order received · ${ref}`,
      html: customerEmail(params),
      replyTo: owner,
    });

    // Owner notification
    await sendMail({
      to: owner,
      subject: `🔔 Nova encomenda ${ref} — ${customer.name}`,
      html: ownerEmail(params),
      replyTo: customer.email,
    });
  } catch (err) {
    console.error("[order] mail failed", err);
    return NextResponse.json(
      { ok: false, error: "Email send failed" },
      { status: 500 },
    );
  }

  return NextResponse.json({
    ok: true,
    ref,
    total,
    iban,
    beneficiary,
    bic: bic ?? null,
  });
}
