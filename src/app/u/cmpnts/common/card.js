export default function Card({ title, value, valueSize="text-2xl", bold="font-bold", info, colSpan="col-span-1", rowSpan="row-span-1", children}) {
    return (
        <div className={`bg-white rounded-2xl shadow-sm p-5 flex flex-col justify-between ${colSpan} ${rowSpan}`}>
            <p className="text-gray-400 text-sm">{title}</p>
            <p className={`${valueSize} ${bold}`}>{value}</p>
            <p className="text-green-500 text-sm mt-2">{info}</p>
            {children}
        </div>
    )
}