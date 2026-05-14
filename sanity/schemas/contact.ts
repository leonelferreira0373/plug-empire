import { defineField, defineType } from "sanity";

export const contact = defineType({
  name: "contact",
  title: "Página Contacto",
  type: "document",
  fields: [
    defineField({
      name: "headlinePT",
      title: "Título (PT)",
      type: "string",
      initialValue: "Fala connosco",
    }),
    defineField({
      name: "headlineEN",
      title: "Headline (EN)",
      type: "string",
      initialValue: "Get in touch",
    }),
    defineField({
      name: "introPT",
      title: "Intro (PT)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "introEN",
      title: "Intro (EN)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "email",
      title: "Email público",
      type: "string",
      validation: (r) => r.email(),
    }),
    defineField({
      name: "whatsapp",
      title: "WhatsApp (formato internacional sem +)",
      type: "string",
      description: "Ex: 351912345678",
    }),
    defineField({
      name: "instagramMain",
      title: "Instagram Plug Empire (handle, sem @)",
      type: "string",
    }),
    defineField({
      name: "instagramBrand",
      title: "Instagram Stravages (handle, sem @)",
      type: "string",
    }),
    defineField({
      name: "linktree",
      title: "Linktree (URL completo)",
      type: "url",
    }),
    defineField({
      name: "address",
      title: "Morada / Cidade",
      type: "string",
    }),
    defineField({
      name: "hoursPT",
      title: "Horário (PT)",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "hoursEN",
      title: "Hours (EN)",
      type: "text",
      rows: 2,
    }),
  ],
  preview: {
    prepare() {
      return { title: "Página Contacto" };
    },
  },
});
