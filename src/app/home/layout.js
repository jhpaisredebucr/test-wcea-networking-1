import "../globals.css";
import Navbar from "@/app/cmpnts/layout/navbar";
import TopBar from "../cmpnts/layout/top-bar";

export const metadata = {
  title: "WCEA Home",
  description: "Dashboard for users to view their health and wellness data, track progress, and access personalized recommendations.",
};

export default function RootLayout({ children }) {
  return (
    <div className="overflow-x-hidden">
      <TopBar/>
      <Navbar/>
      {children}
    </div>
  );
}
