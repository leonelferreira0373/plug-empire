import { defineField, defineType } from "sanity";

export const home = defineType({
  name: "home",
  title: "Página Inicial",
  type: "document",
  fields: [
    defineField({
      name: "heroEyebrowPT",
      title: "Hero — sub-título pequeno (PT)",
      type: "string",
      initialValue: "Stravages",
    }),
    defineField({
      name: "heroEyebrowEN",
      title: "Hero — small label (EN)",
      type: "string",
      initialValue: "Stravages",
    }),
    defineField({
      name: "heroTitlePT",
      title: "Hero — título principal (PT)",
      type: "string",
      description: 'Ex: "Nascido no risco. Movido pela visão."',
    }),
    defineField({
      name: "heroTitleEN",
      title: "Hero — main title (EN)",
      type: "string",
    }),
    defineField({
      name: "heroSubtitlePT",
      title: "Hero — subtítulo (PT)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "heroSubtitleEN",
      title: "Hero — subtitle (EN)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "heroImage",
      title: "Imagem de fundo do hero",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "storyQuotePT",
      title: "Banda da história — frase (PT)",
      type: "string",
    }),
    defineField({
      name: "storyQuoteEN",
      title: "Story band — quote (EN)",
      type: "string",
    }),
    defineField({
      name: "storyBodyPT",
      title: "Banda da história — texto (PT)",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "storyBodyEN",
      title: "Story band — text (EN)",
      type: "text",
      rows: 5,
    }),
  ],
  preview: {
    prepare() {
      return { title: "Página Inicial" };
    },
  },
});
