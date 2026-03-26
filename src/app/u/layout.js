import "@/app/globals.css"
import TopBar from "../cmpnts/layout/top-bar";

export default function RootLayout({ children }) {
  return (
    <div>
      {children}
    </div>
  );
}
