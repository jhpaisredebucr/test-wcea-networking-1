import Image from "next/image"

export default function Title({ children, title, icon }) {
    return (
        <div className="flex items-center gap-2">
            <Image src={icon} alt="icon" width={20} height={20}/>
            <h2 className="text-lg font-semibold">{title}</h2>
        </div>
    )
}