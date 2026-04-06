import "../globals.css";
import Navbar from "@/app/components/layout/navbar";
import TopBar from "../components/layout/top-bar";

export const metadata = {
  title: "WCEA Home",
  description: "Dashboard for users to view their health and wellness data, track progress, and access personalized recommendations.",
};

export default function RootLayout({ children }) {
  return (
    <div className="overflow-hidden">
      <TopBar/>
      <Navbar/>
      {children}
    </div>
  );
}
