import Image from "next/image";

export default function Card({ className, textColor, title, color, value, valueSize, bold, info, colSpan="col-span-1", rowSpan="row-span-1", src, children}) {
    return (
        <div className={`bg-white rounded-2xl shadow-[0_0_4px_rgba(0,0,0,0.15)] p-5 flex flex-col justify-between ${colSpan} ${rowSpan}`}>
            <div className="flex gap-x-2 items-center">
                {src && <div className={`${color} rounded-xl p-3`}><Image src={src} alt="icon" width={20} height={20}></Image></div>}
                <p className="text-gray-400 text-sm">{title}</p>

            </div>
            <p className={`${valueSize} ${textColor} text-lg font-bold`}>{value}</p>
            {info && <p className="text-green-500 text-sm mt-2">{info}</p>}
            {children}
        </div>
    )
}