"use client";

import { LegalPage, L, LList } from "@/components/legal-page";
import { BRAND } from "@/lib/config";

export default function DevolucoesPage() {
  return (
    <LegalPage
      title={{ pt: "Política de Devoluções", en: "Return Policy" }}
      intro={{
        pt: "Queremos que ames a tua peça. Se algo correr mal, resolvemos.",
        en: "We want you to love your piece. If something's off, we'll make it right.",
      }}
      sections={[
        {
          heading: { pt: "1. Prazo", en: "1. Window" },
          body: {
            pt: <L>Tens 7 dias, contados a partir da recepção, para pedir troca ou devolução.</L>,
            en: <L>You have 7 days from delivery to request an exchange or return.</L>,
          },
        },
        {
          heading: { pt: "2. Condições", en: "2. Conditions" },
          body: {
            pt: (
              <>
                <L>Para que a devolução seja aceite, a peça deve:</L>
                <LList
                  items={[
                    "Estar por usar, com etiquetas originais",
                    "Vir na embalagem original sempre que possível",
                    "Não apresentar sinais de uso, lavagem ou perfume",
                  ]}
                />
              </>
            ),
            en: (
              <>
                <L>To qualify for a return, the piece must:</L>
                <LList
                  items={[
                    "Be unworn, with original tags attached",
                    "Be returned in the original packaging where possible",
                    "Show no signs of wear, washing or perfume",
                  ]}
                />
              </>
            ),
          },
        },
        {
          heading: { pt: "3. Trocas", en: "3. Exchanges" },
          body: {
            pt: <L>Trocas de tamanho ou cor são gratuitas (mediante disponibilidade de stock). Os custos de envio para devolver a peça original ficam a cargo do cliente, salvo quando a peça veio com defeito.</L>,
            en: <L>Size or color exchanges are free, subject to stock. Return shipping for the original piece is the customer's cost, except when the piece arrived defective.</L>,
          },
        },
        {
          heading: { pt: "4. Reembolsos", en: "4. Refunds" },
          body: {
            pt: <L>Após recebermos e verificarmos a peça, o reembolso é processado em até 7 dias úteis, pelo mesmo meio do pagamento original.</L>,
            en: <L>Once we receive and verify the piece, refunds are processed within 7 business days, by the same payment method as the original purchase.</L>,
          },
        },
        {
          heading: { pt: "5. Peças não elegíveis", en: "5. Non-returnable" },
          body: {
            pt: (
              <LList
                items={[
                  "Peças personalizadas",
                  "Peças em promoção final",
                  "Peças com sinais visíveis de uso",
                ]}
              />
            ),
            en: (
              <LList
                items={[
                  "Personalized pieces",
                  "Final-sale items",
                  "Pieces with visible signs of use",
                ]}
              />
            ),
          },
        },
        {
          heading: { pt: "6. Como pedir", en: "6. How to request" },
          body: {
            pt: <L>Envia uma mensagem via WhatsApp ou email para <a href={`mailto:${BRAND.email}`} className="text-gold underline">{BRAND.email}</a> com a referência da encomenda e a razão. Damos seguimento no mesmo dia.</L>,
            en: <L>Send us a WhatsApp message or an email to <a href={`mailto:${BRAND.email}`} className="text-gold underline">{BRAND.email}</a> with your order reference and the reason. We'll follow up the same day.</L>,
          },
        },
      ]}
    />
  );
}
