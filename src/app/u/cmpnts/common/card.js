export default function Card({ title, value, info, colSpan = 1, rowSpan = 1}) {
    return (
        <div className={`bg-white rounded-2xl shadow-sm p-5 flex flex-col justify-between col-span-${colSpan} row-span-${rowSpan}`}>
            <p className="text-gray-400 text-sm">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-green-500 text-sm mt-2">{info}</p>
        </div>
    )
}