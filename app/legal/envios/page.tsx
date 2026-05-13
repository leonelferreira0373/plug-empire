"use client";

import { LegalPage, L, LList } from "@/components/legal-page";

export default function EnviosPage() {
  return (
    <LegalPage
      title={{ pt: "Política de Envio", en: "Shipping Policy" }}
      intro={{
        pt: "Entregamos em toda Angola. Confirma-se sempre prazo e valor antes do pagamento.",
        en: "We deliver across Angola. Shipping cost and time are confirmed before payment.",
      }}
      sections={[
        {
          heading: { pt: "1. Luanda", en: "1. Luanda" },
          body: {
            pt: <L>Entrega em mão no mesmo dia ou no dia seguinte para pedidos confirmados até às 16h. Encomendas até 5.000 AOA têm taxa fixa de entrega; acima desse valor o envio é gratuito.</L>,
            en: <L>Same-day or next-day hand delivery for orders confirmed by 4 PM. Orders under 5,000 AOA carry a flat delivery fee; above that, shipping is free.</L>,
          },
        },
        {
          heading: { pt: "2. Outras províncias", en: "2. Other provinces" },
          body: {
            pt: (
              <>
                <L>Entrega via parceiros de transporte (2 a 5 dias úteis). Preço calculado conforme:</L>
                <LList
                  items={[
                    "Destino",
                    "Peso e volume",
                    "Valor declarado para seguro",
                  ]}
                />
              </>
            ),
            en: (
              <>
                <L>Delivered via courier partners (2 to 5 business days). Pricing depends on:</L>
                <LList
                  items={[
                    "Destination",
                    "Weight and volume",
                    "Declared value for insurance",
                  ]}
                />
              </>
            ),
          },
        },
        {
          heading: { pt: "3. Envios internacionais", en: "3. International" },
          body: {
            pt: <L>Aceitamos pedidos internacionais sob consulta. Prazo e custo são confirmados caso a caso. As taxas alfandegárias do país de destino são da responsabilidade do destinatário.</L>,
            en: <L>International orders are accepted on request. Time and cost are confirmed case by case. Destination customs duties are the recipient's responsibility.</L>,
          },
        },
        {
          heading: { pt: "4. Como acompanhar", en: "4. Tracking" },
          body: {
            pt: <L>Recebes actualizações pelo WhatsApp: confirmação, expedição e entrega. Não dependes de um portal de tracking — falamos contigo directamente.</L>,
            en: <L>You'll receive updates via WhatsApp: confirmation, dispatch and delivery. No tracking portal needed — we talk to you directly.</L>,
          },
        },
        {
          heading: { pt: "5. Atrasos", en: "5. Delays" },
          body: {
            pt: <L>Se houver atraso, avisamos antes do prazo expirar e ajustamos o que for preciso. Em caso de extravio confirmado, fazemos reposição da peça (mediante stock) ou reembolso integral.</L>,
            en: <L>If a delay occurs, we let you know before the deadline passes and adjust as needed. In the event of confirmed loss, we replace the piece (subject to stock) or issue a full refund.</L>,
          },
        },
      ]}
    />
  );
}
