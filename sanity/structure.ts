import type { StructureBuilder } from "sanity/structure";

// Custom Studio structure: singletons grouped, then collections.
export const structure = (S: StructureBuilder) =>
  S.list()
    .title("Stravages")
    .items([
      // Singletons — one document each, no "create new"
      S.listItem()
        .title("🏠 Página Inicial")
        .child(S.document().schemaType("home").documentId("home")),
      S.listItem()
        .title("📖 Sobre")
        .child(S.document().schemaType("about").documentId("about")),
      S.listItem()
        .title("📞 Contacto")
        .child(S.document().schemaType("contact").documentId("contact")),

      S.divider(),

      // Products & orders
      S.listItem()
        .title("🛍 Produtos")
        .schemaType("product")
        .child(
          S.documentTypeList("product")
            .title("Produtos")
            .defaultOrdering([{ field: "order", direction: "asc" }]),
        ),
      S.listItem()
        .title("📦 Encomendas")
        .schemaType("order")
        .child(
          S.documentTypeList("order")
            .title("Encomendas")
            .defaultOrdering([{ field: "createdAt", direction: "desc" }]),
        ),
    ]);
