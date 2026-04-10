"use client"

import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function FormPdf() {
  const [name, setName] = useState("");
  const formRef = useRef();

  const generatePDF = async () => {
    if (!formRef.current) return;

    // Take a snapshot of the component
    const canvas = await html2canvas(formRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    // Create PDF
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [canvas.width, canvas.height]
    });

    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save("output.pdf");
  };

  return (
    <div className="p-8">
      {/* Input */}
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 mb-4 w-full"
      />

      {/* Preview / Template */}
      <div
        ref={formRef}
        className="relative w-150 h-100 border"
        // style={{ backgroundImage: "url('/template.png')", backgroundSize: "cover" }}
      >
        {/* Place text exactly where you want */}
        <div
          style={{
            position: "absolute",
            top: "200px",
            left: "150px",
            fontSize: "24px",
            color: "black",
            fontFamily: "Arial, sans-serif"
          }}
        >
          {name}
        </div>
      </div>

      {/* Generate PDF Button */}
      <button
        onClick={generatePDF}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Generate PDF
      </button>
    </div>
  );
}