import "../globals.css";
import Navbar from "@/app/cmpnts/layout/navbar";

export default function RootLayout({ children }) {
  return (
    <div>
      <Navbar/>
      {children}
    </div>
  );
}
