export default function Card({ title, value, valueSize="2xl", bold="font-bold", info, colSpan = 1, rowSpan = 1, children}) {
    return (
        <div className={`bg-white rounded-2xl shadow-sm p-5 flex flex-col justify-between col-span-${colSpan} row-span-${rowSpan}`}>
            <p className="text-gray-400 text-sm">{title}</p>
            <p className={`text-${valueSize} ${bold}`}>{value}</p>
            <p className="text-green-500 text-sm mt-2">{info}</p>
            {children}
        </div>
    )
}