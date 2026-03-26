import "./globals.css";

export const metadata = {
  title: "WCEA Home",
  description: "Dashboard for users to view their health and wellness data, track progress, and access personalized recommendations.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
