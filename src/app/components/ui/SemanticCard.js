export default function SemanticCard({children, semantic}) {
    const semanticType = {  
        default: "border-(--neutral-color)/80 bg-(--neutral-color)/10 text-(--neutral-color)",
        success: "border-(--success-color)/80 bg-(--success-color)/10 text-(--success-color)",
        warn: "border-(--warn-color)/80 bg-(--warn-color)/10 text-(--warn-color)",
        error: "border-(--error-color)/80 bg-(--error-color)/10 text-(--error-color)",
    }

    return (
        <div className={`
            items-center w-full
            px-4 py-2 rounded-xl
            border 
            bg-opacity-50 backdrop-blur-md 
            text-sm font-medium
            ${ semanticType[semantic] || semanticType.default }
        `}> 
           {children} 
        </div>
    )
}