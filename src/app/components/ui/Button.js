function Button({children, onClick, icon}) {
    return (
        <button 
            onClick={onClick} 
            
            className="
            w-full cursor-pointer 
            p-2 bg-(--primary) 
            rounded-2xl text-white 
            font-bold flex gap-4 justify-center">
            {icon && (<img className="inline " 
            src={icon} alt="icon"></img>)}
            {children}
        </button>
    )
}

function NavBarButton({children, onClick}) {
    return (
        <button onClick={onClick} className="     
            flex-1              
            active:scale-95 active:bg-gray-200
            mx-1 p-2 h-10
            border-b-4 border-transparent 
            hover:border-(--primary) hover:text-(--primary)
            transition duration-200
            cursor-pointer
            "
        >
            {children}
        </button>
    )
}


export default Button;
export { NavBarButton };