"use client";

import { LegalPage, L, LList } from "@/components/legal-page";

export default function EnviosPage() {
  return (
    <LegalPage
      title={{ pt: "Política de Envio", en: "Shipping Policy" }}
      intro={{
        pt: "Entregamos em todo o Continente, Açores, Madeira e União Europeia. Confirma-se sempre prazo e valor antes do pagamento.",
        en: "We deliver across mainland Portugal, Azores, Madeira and the European Union. Shipping cost and time are confirmed before payment.",
      }}
      sections={[
        {
          heading: { pt: "1. Lisboa & Porto", en: "1. Lisbon & Porto" },
          body: {
            pt: <L>Entrega em mão ou via courier no próprio dia ou dia seguinte, para pedidos confirmados até às 16h. Envio gratuito para encomendas acima de €60.</L>,
            en: <L>Same-day or next-day hand or courier delivery for orders confirmed by 4 PM. Free shipping on orders over €60.</L>,
          },
        },
        {
          heading: { pt: "2. Resto de Portugal", en: "2. Rest of Portugal" },
          body: {
            pt: (
              <>
                <L>Entrega via CTT Expresso ou DPD (2 a 4 dias úteis). Açores e Madeira: 3 a 6 dias úteis. Preço calculado conforme:</L>
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
                <L>Delivered via CTT Expresso or DPD (2 to 4 business days). Azores and Madeira: 3 to 6 business days. Pricing depends on:</L>
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
          heading: { pt: "3. União Europeia & resto do mundo", en: "3. EU & worldwide" },
          body: {
            pt: <L>União Europeia: 3 a 7 dias úteis, IVA português incluído. Para destinos fora da UE: aceitamos pedidos sob consulta. As taxas alfandegárias do país de destino são da responsabilidade do destinatário.</L>,
            en: <L>European Union: 3 to 7 business days, Portuguese VAT included. For destinations outside the EU: orders accepted on request. Destination customs duties are the recipient's responsibility.</L>,
          },
        },
        {
          heading: { pt: "4. Como acompanhar", en: "4. Tracking" },
          body: {
            pt: <L>Recebes atualizações pelo WhatsApp: confirmação, expedição e entrega. Não dependes de um portal de tracking — falamos contigo diretamente.</L>,
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
