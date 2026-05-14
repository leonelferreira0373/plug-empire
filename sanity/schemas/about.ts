import { defineField, defineType } from "sanity";

export const about = defineType({
  name: "about",
  title: "Página Sobre",
  type: "document",
  fields: [
    defineField({
      name: "headlinePT",
      title: "Título principal (PT)",
      type: "string",
      initialValue: "A nossa história",
    }),
    defineField({
      name: "headlineEN",
      title: "Headline (EN)",
      type: "string",
      initialValue: "Our story",
    }),
    defineField({
      name: "introPT",
      title: "Intro (PT)",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "introEN",
      title: "Intro (EN)",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "manifestoPT",
      title: "Texto do manifesto (PT)",
      type: "text",
      rows: 6,
    }),
    defineField({
      name: "manifestoEN",
      title: "Manifesto body (EN)",
      type: "text",
      rows: 6,
    }),
    defineField({
      name: "pillars",
      title: "Pilares (3 blocos)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "titlePT", title: "Título (PT)", type: "string" },
            { name: "titleEN", title: "Title (EN)", type: "string" },
            { name: "bodyPT", title: "Texto (PT)", type: "text", rows: 3 },
            { name: "bodyEN", title: "Body (EN)", type: "text", rows: 3 },
          ],
          preview: {
            select: { title: "titlePT", subtitle: "bodyPT" },
          },
        },
      ],
      validation: (r) => r.max(3),
    }),
    defineField({
      name: "heroImage",
      title: "Imagem de fundo",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    prepare() {
      return { title: "Página Sobre" };
    },
  },
});
