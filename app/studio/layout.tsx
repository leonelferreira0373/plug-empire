export const metadata = {
  title: "Plug Empire · Studio",
  robots: { index: false, follow: false },
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div style={{ minHeight: "100vh" }}>{children}</div>;
}
