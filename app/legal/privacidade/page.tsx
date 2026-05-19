"use client";

import { LegalPage, L, LList } from "@/components/legal-page";
import { BRAND } from "@/lib/config";

export default function PrivacidadePage() {
  return (
    <LegalPage
      title={{ pt: "Política de Privacidade", en: "Privacy Policy" }}
      intro={{
        pt: "A Stravages respeita a tua privacidade. Esta política descreve que informação recolhemos quando interages connosco e como a tratamos.",
        en: "Stravages respects your privacy. This policy describes what information we collect when you interact with us and how we handle it.",
      }}
      sections={[
        {
          heading: { pt: "1. Quem somos", en: "1. Who we are" },
          body: {
            pt: (
              <L>
                Stravages é uma marca portuguesa de streetwear premium, com sede em {BRAND.address}.
                Contacto: <a href={`mailto:${BRAND.email}`} className="text-gold underline">{BRAND.email}</a>.
              </L>
            ),
            en: (
              <L>
                Stravages is a Portuguese premium streetwear brand based in {BRAND.address}.
                Contact: <a href={`mailto:${BRAND.email}`} className="text-gold underline">{BRAND.email}</a>.
              </L>
            ),
          },
        },
        {
          heading: { pt: "2. Que dados recolhemos", en: "2. What data we collect" },
          body: {
            pt: (
              <>
                <L>Quando fazes uma encomenda via WhatsApp ou email, podemos recolher:</L>
                <LList
                  items={[
                    "Nome e contacto (telemóvel, email)",
                    "Morada de entrega",
                    "Detalhes do pedido (produtos, tamanhos, cores)",
                    "Histórico de comunicação connosco",
                  ]}
                />
                <L>
                  Não recolhemos dados de pagamento no site — todas as transacções são acordadas e processadas via canais externos (WhatsApp, transferência bancária ou pagamento em mão).
                </L>
              </>
            ),
            en: (
              <>
                <L>When you place an order via WhatsApp or email, we may collect:</L>
                <LList
                  items={[
                    "Name and contact (phone, email)",
                    "Delivery address",
                    "Order details (products, sizes, colors)",
                    "Communication history with us",
                  ]}
                />
                <L>
                  We do not collect payment data on this site — all transactions are agreed and processed via external channels (WhatsApp, bank transfer or cash on delivery).
                </L>
              </>
            ),
          },
        },
        {
          heading: { pt: "3. Como usamos os dados", en: "3. How we use the data" },
          body: {
            pt: (
              <LList
                items={[
                  "Processar e entregar a tua encomenda",
                  "Comunicar contigo sobre o estado do pedido",
                  "Responder a dúvidas e pedidos de apoio",
                  "Cumprir obrigações legais e contabilísticas",
                ]}
              />
            ),
            en: (
              <LList
                items={[
                  "Process and deliver your order",
                  "Communicate about order status",
                  "Reply to questions and support requests",
                  "Comply with legal and accounting obligations",
                ]}
              />
            ),
          },
        },
        {
          heading: { pt: "4. Cookies", en: "4. Cookies" },
          body: {
            pt: (
              <L>
                Este site utiliza apenas armazenamento local técnico (idioma, tema e carrinho).
                Não usamos cookies de publicidade nem de rastreio de terceiros.
              </L>
            ),
            en: (
              <L>
                This site only uses technical local storage (language, theme and cart).
                We do not use advertising or third-party tracking cookies.
              </L>
            ),
          },
        },
        {
          heading: { pt: "5. Partilha de dados", en: "5. Data sharing" },
          body: {
            pt: (
              <L>
                Os teus dados não são vendidos. Podem ser partilhados apenas com transportadoras
                para efeitos de entrega, ou com autoridades quando exigido por lei.
              </L>
            ),
            en: (
              <L>
                Your data is never sold. It may only be shared with courier partners for
                delivery purposes, or with authorities when required by law.
              </L>
            ),
          },
        },
        {
          heading: { pt: "6. Os teus direitos", en: "6. Your rights" },
          body: {
            pt: (
              <L>
                Podes pedir, a qualquer momento, acesso, correcção ou eliminação dos dados que
                temos sobre ti. Escreve para <a href={`mailto:${BRAND.email}`} className="text-gold underline">{BRAND.email}</a>.
              </L>
            ),
            en: (
              <L>
                You may request access to, correction of, or deletion of your data at any time.
                Write to <a href={`mailto:${BRAND.email}`} className="text-gold underline">{BRAND.email}</a>.
              </L>
            ),
          },
        },
      ]}
    />
  );
}
