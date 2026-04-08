function Button({children, onClick}) {
    return (
        <button onClick={onClick} className="w-full cursor-pointer mb-2 mt-10 p-2 bg-blue-500 rounded-4xl text-white font-bold">
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
            border-b-2 border-transparent 
            hover:border-(--primary) hover:text-(--primary)
            transition duration-200
            cursor-pointer
            "
        >
            {children}
        </button>
    )
}


export {NavBarButton}