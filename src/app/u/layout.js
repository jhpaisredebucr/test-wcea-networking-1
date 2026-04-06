import "@/app/globals.css"
import TopBar from "../components/layout/top-bar";

export default function RootLayout({ children }) {
  return (
    <div>
      {children}
    </div>
  );
}
