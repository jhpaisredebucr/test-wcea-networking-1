import "../globals.css";
import Navbar from "@/app/components/layout/navbar";

export default function RootLayout({ children }) {
  return (
    <div>
      <Navbar/>
      {children}
    </div>
  );
}
