import { defineField, defineType } from "sanity";

export const order = defineType({
  name: "order",
  title: "Encomenda",
  type: "document",
  // Orders are created by the API route — keep editing focused on status & notes.
  fields: [
    defineField({
      name: "ref",
      title: "Referência",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "status",
      title: "Estado",
      type: "string",
      options: {
        list: [
          { title: "🟡 Pendente (à espera de pagamento)", value: "pending" },
          { title: "🟢 Paga", value: "paid" },
          { title: "📦 Enviada", value: "shipped" },
          { title: "✅ Entregue", value: "delivered" },
          { title: "❌ Cancelada", value: "cancelled" },
        ],
        layout: "radio",
      },
      initialValue: "pending",
    }),
    defineField({
      name: "createdAt",
      title: "Recebida em",
      type: "datetime",
      readOnly: true,
    }),
    defineField({
      name: "lang",
      title: "Idioma do cliente",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "customer",
      title: "Cliente",
      type: "object",
      fields: [
        { name: "name", title: "Nome", type: "string" },
        { name: "email", title: "Email", type: "string" },
        { name: "phone", title: "Telefone", type: "string" },
        { name: "address", title: "Morada", type: "string" },
        { name: "city", title: "Cidade", type: "string" },
        { name: "postcode", title: "Código postal", type: "string" },
        { name: "country", title: "País", type: "string" },
        { name: "notes", title: "Notas do cliente", type: "text", rows: 2 },
      ],
    }),
    defineField({
      name: "lines",
      title: "Produtos",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "slug", title: "Slug", type: "string" },
            { name: "name", title: "Nome", type: "string" },
            { name: "price", title: "Preço unit.", type: "number" },
            { name: "qty", title: "Quantidade", type: "number" },
            { name: "size", title: "Tamanho", type: "string" },
            { name: "color", title: "Cor", type: "string" },
          ],
          preview: {
            select: { title: "name", subtitle: "qty", price: "price" },
            prepare({ title, subtitle, price }) {
              return {
                title,
                subtitle: `${subtitle ?? 1}× · €${(price ?? 0).toFixed(2)}`,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: "subtotal",
      title: "Subtotal (€)",
      type: "number",
    }),
    defineField({
      name: "shipping",
      title: "Envio (€)",
      type: "number",
    }),
    defineField({
      name: "total",
      title: "Total (€)",
      type: "number",
    }),
    defineField({
      name: "internalNotes",
      title: "Notas internas (não visíveis ao cliente)",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    select: {
      ref: "ref",
      status: "status",
      name: "customer.name",
      total: "total",
    },
    prepare({ ref, status, name, total }) {
      const statusEmoji: Record<string, string> = {
        pending: "🟡",
        paid: "🟢",
        shipped: "📦",
        delivered: "✅",
        cancelled: "❌",
      };
      return {
        title: `${statusEmoji[status] ?? "•"} ${ref ?? "—"}`,
        subtitle: `${name ?? "—"} · €${(total ?? 0).toFixed(2)}`,
      };
    },
  },
  orderings: [
    {
      title: "Mais recentes",
      name: "createdDesc",
      by: [{ field: "createdAt", direction: "desc" }],
    },
    {
      title: "Pendentes primeiro",
      name: "pendingFirst",
      by: [
        { field: "status", direction: "asc" },
        { field: "createdAt", direction: "desc" },
      ],
    },
  ],
});
