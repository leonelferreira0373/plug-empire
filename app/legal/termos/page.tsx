"use client";

import { LegalPage, L, LList } from "@/components/legal-page";
import { BRAND } from "@/lib/config";

export default function TermosPage() {
  return (
    <LegalPage
      title={{ pt: "Termos & Condições", en: "Terms & Conditions" }}
      intro={{
        pt: "Estes termos regulam a utilização do site da Plug Empire e a compra dos produtos apresentados. Ao usar o site, aceitas estes termos.",
        en: "These terms govern the use of the Plug Empire site and the purchase of the products shown. By using the site, you agree to these terms.",
      }}
      sections={[
        {
          heading: { pt: "1. A marca", en: "1. The brand" },
          body: {
            pt: <L>Plug Empire é uma marca de streetwear premium, com operação principal em {BRAND.address}. Email: {BRAND.email}.</L>,
            en: <L>Plug Empire is a premium streetwear brand operating primarily out of {BRAND.address}. Email: {BRAND.email}.</L>,
          },
        },
        {
          heading: { pt: "2. Encomendas", en: "2. Orders" },
          body: {
            pt: (
              <>
                <L>
                  As encomendas são confirmadas via WhatsApp ou email após verificação de stock,
                  tamanho/cor pretendidos e morada de entrega. Reservamo-nos o direito de recusar
                  ou cancelar encomendas em caso de:
                </L>
                <LList
                  items={[
                    "Stock esgotado",
                    "Erro de preço ou descrição evidente",
                    "Suspeita de fraude",
                    "Impossibilidade de entrega na morada indicada",
                  ]}
                />
              </>
            ),
            en: (
              <>
                <L>
                  Orders are confirmed via WhatsApp or email after stock, size/color and delivery
                  address are verified. We reserve the right to refuse or cancel orders in case of:
                </L>
                <LList
                  items={[
                    "Sold-out stock",
                    "Obvious price or description error",
                    "Suspected fraud",
                    "Inability to deliver to the given address",
                  ]}
                />
              </>
            ),
          },
        },
        {
          heading: { pt: "3. Preços e pagamento", en: "3. Prices and payment" },
          body: {
            pt: (
              <L>
                Todos os preços estão em Kwanzas (AOA), salvo indicação em contrário. O pagamento
                pode ser feito por transferência bancária, multicaixa ou em mão na entrega,
                conforme acordado em conversa.
              </L>
            ),
            en: (
              <L>
                All prices are in Kwanzas (AOA) unless stated otherwise. Payment can be made via
                bank transfer, multicaixa, or cash on delivery — as agreed in conversation.
              </L>
            ),
          },
        },
        {
          heading: { pt: "4. Propriedade intelectual", en: "4. Intellectual property" },
          body: {
            pt: <L>O logotipo, fotografias, textos e identidade visual da Plug Empire e da linha Stravages são propriedade da casa. Qualquer uso comercial não autorizado é proibido.</L>,
            en: <L>The Plug Empire and Stravages logos, photography, copy and visual identity are property of the house. Any unauthorized commercial use is prohibited.</L>,
          },
        },
        {
          heading: { pt: "5. Limitação de responsabilidade", en: "5. Limitation of liability" },
          body: {
            pt: <L>A Plug Empire não é responsável por danos indirectos resultantes do uso do site ou dos produtos para além do uso normal previsto. Em caso de defeito comprovado, aplica-se a política de devoluções.</L>,
            en: <L>Plug Empire is not liable for indirect damages arising from use of the site or the products beyond their intended normal use. In case of proven defect, the returns policy applies.</L>,
          },
        },
        {
          heading: { pt: "6. Lei aplicável", en: "6. Governing law" },
          body: {
            pt: <L>Estes termos são regidos pela lei angolana. Qualquer litígio será resolvido pelos tribunais competentes de Luanda.</L>,
            en: <L>These terms are governed by Angolan law. Any dispute shall be resolved by the competent courts of Luanda.</L>,
          },
        },
      ]}
    />
  );
}
