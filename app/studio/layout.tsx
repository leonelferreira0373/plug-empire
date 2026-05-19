export const metadata = {
  title: "Stravages · Studio",
  robots: { index: false, follow: false },
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div style={{ minHeight: "100vh" }}>{children}</div>;
}
