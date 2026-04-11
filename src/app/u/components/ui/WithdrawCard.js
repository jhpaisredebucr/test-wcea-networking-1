import Image from "next/image";

export default function WithdrawCard({ children , title}) {
    return (
        <div className="
            p-4 bg-white border-0 border-(--primary)
            flex-col m-2 gap-2
            transition duration-300 hover:shadow-lg
            grid-cols-1 rounded-2xl
            shadow-md flex justify-center
        ">
            <h1 className="font-semibold">{title}</h1>
            {children}
        </div>
    )
}