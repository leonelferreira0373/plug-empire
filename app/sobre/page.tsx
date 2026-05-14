import { getAbout } from "@/lib/site-content";
import { SobreClient } from "./sobre-client";

export const revalidate = 60;

export default async function SobrePage() {
  const content = await getAbout();
  return <SobreClient content={content} />;
}
