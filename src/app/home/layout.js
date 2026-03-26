import "../globals.css";
import Navbar from "@/app/cmpnts/layout/navbar";
import TopBar from "../cmpnts/layout/top-bar";

export default function RootLayout({ children }) {
  return (
    <div>
      <TopBar/>
      <Navbar/>
      {children}
    </div>
  );
}
