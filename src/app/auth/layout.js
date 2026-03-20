import "../globals.css";

export default function RootLayout({ children }) {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-50">
      <div className="w-full max-w-sm">
      {children}
      </div>
    </div>
  );
}
