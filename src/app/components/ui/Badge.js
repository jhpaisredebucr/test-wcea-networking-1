export default function Badge({children, }) {
    return (
        <div className="
            inline-flex items-center 
            px-3 py-1 
            border border-yellow-500
            bg-yellow-50 bg-opacity-50 backdrop-blur-sm 
            rounded-full 
            text-sm font-medium text-yellow-500
        "> 
           {children} 
        </div>
    )
}