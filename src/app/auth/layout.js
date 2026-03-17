import "../globals.css";

export default function RootLayout({ children }) {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-full max-w-md p-10 bg-[#ffffff] shadow-xl rounded-xl">
      {children}
      </div>
    </div>
  );
}
