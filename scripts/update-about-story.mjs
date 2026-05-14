// One-shot: replaces the "about" page content with the founder's real story.

import { createClient } from "@sanity/client";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { config } from "dotenv";

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: join(__dirname, "..", ".env.local") });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2025-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

const introPT = `A Plug Empire não nasceu numa sala de reuniões. Nasceu no bairro. Foi ali, a ver as ruas, que percebi que tudo o que move o nosso mundo já tinha sido escrito antes — na natureza, na forma como as abelhas trabalham.`;

const introEN = `Plug Empire wasn't born in a boardroom. It was born in the hood. It was right there, watching the streets, that I realised everything that moves our world had already been written — in nature, in the way bees work.`;

const manifestoPT = `Cresci a ver gente da minha gente fazer de tudo para sair, e ainda mais para voltar com alguma coisa. Saiam de manhã sem garantia nenhuma de chegar a casa à noite. Alguns voltavam carregados. Outros, simplesmente não voltavam. É essa imagem que carrego comigo todos os dias.

Foi a olhar para essa realidade que encontrei a abelha. A abelha sai da colmeia, vai longe, vai buscar o que precisa às plantas e leva tudo de volta para a rainha. Não pergunta. Não negoceia. Faz o que tem de ser feito — para que os outros sobrevivam. É o trabalho mais honesto que conheço, e é a mesma vida que se vive no bairro: arriscar, sair, trazer.

A Plug Empire é isso. Gente que sai da colmeia todos os dias, que arrisca, e que volta para entregar. Cada peça desta marca carrega esse peso. Não é moda. Não é tendência passageira. É identidade. É bandeira. É o nome que escolhemos vestir.

A marca existe há quatro, cinco anos como movimento, como ideia, como forma de estar. Só agora é que começámos a vestir as pessoas — porque demorou a chegar o momento certo, demorou a chegar o produto à altura. Quando uma peça sai daqui, sai pronta. Sem atalhos. Sem desculpas.

Daqui a dois anos vamos estar ao nível da Trapstar. Não é hipótese, é destino. É o que está escrito para nós.

Para todos os que saem da colmeia todos os dias e correm o risco — esta marca é vossa.`;

const manifestoEN = `I grew up watching my people do everything to leave, and even more to come back with something. They'd walk out in the morning with no guarantee of making it home by night. Some came back loaded. Others just didn't come back. That image stays with me every single day.

It was looking at that reality that I found the bee. The bee leaves the hive, goes far, gathers what it needs from the plants and brings everything back to the queen. It doesn't ask. It doesn't negotiate. It does what has to be done — so the others survive. It's the most honest work I know, and it's the same life that gets lived in the hood: risk, leave, bring back.

Plug Empire is that. People who leave the hive every day, who risk it, and who come back to deliver. Every piece of this brand carries that weight. It's not fashion. It's not a passing trend. It's identity. It's a flag. It's the name we choose to wear.

The brand has existed for four, five years as a movement, as an idea, as a way of being. Only now did we start dressing people — because it took time for the right moment, for the product to be ready. When a piece leaves here, it leaves finished. No shortcuts. No excuses.

In two years we'll be at Trapstar's level. It's not a hope, it's destiny. It's what's written for us.

For everyone who leaves the hive every day and takes the risk — this brand is yours.`;

await client
  .patch("about")
  .set({
    headlinePT: "A nossa história",
    headlineEN: "Our story",
    introPT,
    introEN,
    manifestoPT,
    manifestoEN,
    pillars: [
      {
        _key: "p1",
        titlePT: "Colmeia",
        titleEN: "Hive",
        bodyPT:
          "Marca nascida no bairro, há 4-5 anos como movimento. Vestimos quem todos os dias sai e arrisca para voltar com alguma coisa.",
        bodyEN:
          "Brand born in the hood, 4-5 years as a movement. We dress those who leave every day and risk it all to come back with something.",
      },
      {
        _key: "p2",
        titlePT: "Trabalho",
        titleEN: "Work",
        bodyPT:
          "Cada peça é inspeccionada antes de sair daqui. Sem atalhos, sem desculpas. Como a abelha que volta sempre à colmeia com o que prometeu.",
        bodyEN:
          "Every piece is inspected before it leaves us. No shortcuts, no excuses. Like the bee that always returns to the hive with what it promised.",
      },
      {
        _key: "p3",
        titlePT: "Destino",
        titleEN: "Destiny",
        bodyPT:
          "Daqui a 2 anos estamos ao nível da Trapstar. Não é hipótese — é o que está escrito para nós.",
        bodyEN:
          "In 2 years we'll be at Trapstar's level. It's not a hope — it's what's written for us.",
      },
    ],
  })
  .commit();

console.log("✅ About page updated with founder's story.");
