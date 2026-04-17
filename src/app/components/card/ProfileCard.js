export default function ProfileCard({ label, children }) {
    return (
        <div className="flex flex-col items-start">
            <p className="text-sm">{label}</p>
            <div className="border border-gray-300 rounded-lg p-2 text-start w-full">
                {children}
            </div>
        </div>
    )
}