import { defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Produto",
  type: "document",
  groups: [
    { name: "essentials", title: "✏️ Essenciais", default: true },
    { name: "details", title: "Detalhes" },
    { name: "advanced", title: "Avançado" },
  ],
  fields: [
    // ===================== ESSENTIALS (default tab) =====================

    defineField({
      name: "images",
      title: "📸 Fotos do produto",
      description: "Arrasta e larga as fotos. A primeira é a foto principal.",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "alt", title: "Descrição da foto", type: "string" },
          ],
        },
      ],
      group: "essentials",
      validation: (r) => r.min(1).error("Adiciona pelo menos 1 foto"),
    }),

    defineField({
      name: "namePT",
      title: "Nome do produto",
      description: "Ex: Toca Bee — Preta",
      type: "string",
      group: "essentials",
      validation: (r) => r.required(),
    }),

    defineField({
      name: "price",
      title: "Preço (€)",
      description: "Apenas o número, ex: 34.90",
      type: "number",
      group: "essentials",
      validation: (r) => r.required().positive(),
    }),

    defineField({
      name: "oldPrice",
      title: "Preço anterior (€) — para mostrar promoção",
      description: "Deixa vazio se não estiver em promoção",
      type: "number",
      group: "essentials",
    }),

    defineField({
      name: "descriptionPT",
      title: "Descrição",
      description: "O texto que aparece na página do produto",
      type: "text",
      rows: 5,
      group: "essentials",
    }),

    defineField({
      name: "stock",
      title: "Quantidade em stock",
      description: "0 = esgotado",
      type: "number",
      group: "essentials",
      initialValue: 10,
      validation: (r) => r.min(0),
    }),

    // ===================== DETAILS =====================

    defineField({
      name: "category",
      title: "Categoria",
      type: "string",
      group: "details",
      options: {
        list: [
          { title: "Tocas", value: "tocas" },
          { title: "Balaclavas", value: "balaclavas" },
          { title: "Carteiras", value: "carteiras" },
          { title: "Joalharia", value: "joalharia" },
        ],
      },
      initialValue: "tocas",
      validation: (r) => r.required(),
    }),

    defineField({
      name: "sizes",
      title: "Tamanhos disponíveis",
      description: 'Ex: "S", "M", "L", "XL" ou "Único"',
      type: "array",
      of: [{ type: "string" }],
      group: "details",
      options: { layout: "tags" },
    }),

    defineField({
      name: "colors",
      title: "Cores disponíveis",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Nome da cor", type: "string" },
            {
              name: "hex",
              title: "Código da cor (hex)",
              type: "string",
              description: "Ex: #0a0a0a (preto), #ffffff (branco)",
            },
          ],
          preview: { select: { title: "name", subtitle: "hex" } },
        },
      ],
      group: "details",
    }),

    defineField({
      name: "featuresPT",
      title: "Características (em pontos)",
      description: "Uma característica por linha — aparecem como lista no site",
      type: "array",
      of: [{ type: "string" }],
      group: "details",
    }),

    // ===================== ADVANCED =====================

    defineField({
      name: "nameEN",
      title: "Nome em inglês",
      description: "Opcional. Se vazio, usa o português também na versão EN.",
      type: "string",
      group: "advanced",
    }),
    defineField({
      name: "descriptionEN",
      title: "Descrição em inglês",
      description: "Opcional",
      type: "text",
      rows: 4,
      group: "advanced",
    }),
    defineField({
      name: "featuresEN",
      title: "Características em inglês",
      description: "Opcional",
      type: "array",
      of: [{ type: "string" }],
      group: "advanced",
    }),
    defineField({
      name: "badgePT",
      title: "Etiqueta (PT)",
      description: 'Ex: "Novo", "Mais vendido", "Promoção"',
      type: "string",
      group: "advanced",
    }),
    defineField({
      name: "badgeEN",
      title: "Etiqueta (EN)",
      type: "string",
      group: "advanced",
    }),
    defineField({
      name: "bestseller",
      title: "Mais vendido (aparece em destaque)",
      type: "boolean",
      group: "advanced",
      initialValue: false,
    }),
    defineField({
      name: "slug",
      title: "URL do produto",
      description: "Gerado automaticamente do nome — só mexer se necessário",
      type: "slug",
      group: "advanced",
      options: {
        source: "namePT",
        maxLength: 64,
        slugify: (s) =>
          s
            .toLowerCase()
            .normalize("NFD")
            .replace(/[̀-ͯ]/g, "")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, ""),
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "order",
      title: "Ordem na loja",
      description: "Menor número aparece primeiro",
      type: "number",
      group: "advanced",
      initialValue: 100,
    }),
    defineField({
      name: "related",
      title: "Produtos relacionados (sugeridos na PDP)",
      type: "array",
      of: [{ type: "reference", to: [{ type: "product" }] }],
      group: "advanced",
    }),
  ],
  preview: {
    select: {
      title: "namePT",
      subtitle: "category",
      price: "price",
      stock: "stock",
      media: "images.0",
    },
    prepare({ title, subtitle, price, stock, media }) {
      const stockBadge =
        stock === 0 ? " · esgotado" : stock <= 5 ? ` · ${stock} restantes` : "";
      return {
        title: title || "Sem nome",
        subtitle: `${subtitle ?? "—"} · €${price?.toFixed(2) ?? "?"}${stockBadge}`,
        media,
      };
    },
  },
  orderings: [
    {
      title: "Ordem (ascendente)",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Preço (alto → baixo)",
      name: "priceDesc",
      by: [{ field: "price", direction: "desc" }],
    },
    {
      title: "Stock (baixo → alto)",
      name: "stockAsc",
      by: [{ field: "stock", direction: "asc" }],
    },
  ],
});
