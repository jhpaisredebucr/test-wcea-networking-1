export default function Input({label, type="text", value, onChange}) {
    return (
        <div>
            <p className="text-sm">{label}</p>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full  border border-gray-300 mb-2 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
        </div>
    )
}