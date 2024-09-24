export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="max-w-6xl mx-auto py-14">{children}</main>;
}
