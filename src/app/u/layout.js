import "@/app/globals.css"
import TopBar from "../components/layout/TopBar";

export default function RootLayout({ children }) {
  return (
    <div>
      {children}
    </div>
  );
}
