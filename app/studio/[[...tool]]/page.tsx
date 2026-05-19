"use client";

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";

export const dynamic = "force-static";

export default function StudioPage() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

  if (!projectId) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#000",
          color: "#fff",
          padding: "48px 24px",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <div
            style={{
              fontSize: 11,
              letterSpacing: 4,
              color: "#D4AF37",
              fontWeight: 700,
              marginBottom: 12,
            }}
          >
            STRAVAGES · STUDIO
          </div>
          <h1 style={{ fontSize: 32, margin: "0 0 16px", lineHeight: 1.2 }}>
            Configuração pendente
          </h1>
          <p style={{ color: "#a1a1a1", lineHeight: 1.6, margin: 0 }}>
            O admin panel ainda não está ligado a uma conta Sanity. Para
            ativar:
          </p>
          <ol
            style={{
              color: "#a1a1a1",
              lineHeight: 1.9,
              paddingLeft: 24,
              marginTop: 16,
            }}
          >
            <li>
              Criar projeto em{" "}
              <a
                href="https://www.sanity.io/manage"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#D4AF37" }}
              >
                sanity.io/manage
              </a>
            </li>
            <li>
              Copiar o <code style={{ color: "#fff" }}>Project ID</code> e gerar
              um <code style={{ color: "#fff" }}>API Token</code> com permissões
              de Editor
            </li>
            <li>
              Adicionar 3 variáveis de ambiente no Vercel:
              <pre
                style={{
                  background: "#0a0a0a",
                  border: "1px solid #1f1f1f",
                  padding: 16,
                  borderRadius: 8,
                  marginTop: 8,
                  fontSize: 13,
                  overflow: "auto",
                }}
              >
{`NEXT_PUBLIC_SANITY_PROJECT_ID = <project-id>
NEXT_PUBLIC_SANITY_DATASET    = production
SANITY_API_WRITE_TOKEN        = <token>`}
              </pre>
            </li>
            <li>Redeploy</li>
          </ol>
          <p style={{ color: "#666", marginTop: 32, fontSize: 13 }}>
            O resto do site funciona normalmente (catálogo, checkout, emails)
            mesmo sem a Sanity. A Sanity só é necessária para edição visual.
          </p>
        </div>
      </div>
    );
  }

  return <NextStudio config={config} />;
}
