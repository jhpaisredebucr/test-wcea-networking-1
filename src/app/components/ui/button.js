export default function Button({children, onClick}) {
    return (
        <button onClick={onClick} className="w-full mb-2 mt-10 p-2 bg-blue-500 rounded-4xl font-bold">
            {children}
        </button>
    )
}