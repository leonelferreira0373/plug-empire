import { getContact } from "@/lib/site-content";
import { ContactoClient } from "./contacto-client";

export const revalidate = 60;

export default async function ContactoPage() {
  const content = await getContact();
  return <ContactoClient content={content} />;
}
