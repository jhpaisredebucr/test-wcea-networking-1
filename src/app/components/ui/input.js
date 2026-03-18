export default function Input({ label, type = "text", value, onChange }) {
    return (
        <div className="mb-4">
            <p className="text-sm text-gray-500">{label}</p>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={label} // placeholder shows the label text
                className="w-full border border-gray-300 rounded-md p-2 mb-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
        </div>
    );
}