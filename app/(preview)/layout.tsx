// Separate root layout: the sandboxed preview frame gets none of the host app's CSS or fonts.
export const metadata = { title: "Preview", robots: { index: false } };

export default function PreviewLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
