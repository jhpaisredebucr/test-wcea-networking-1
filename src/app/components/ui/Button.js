function Button({ children, onClick, icon }) {
    return (
        <button
            onClick={onClick}
            className="
                w-full cursor-pointer 
                p-2 bg-(--primary) 
                rounded-2xl text-white 
                font-bold flex gap-4 justify-center
            "
        >
            {icon && (
                <img className="inline" src={icon} alt="icon" />
            )}
            {children}
        </button>
    )
}


function NavBarButton({ children, onClick }) {
    return (
        <button
            onClick={onClick}
            className="
                relative
                flex-1
                mx-1 p-2 h-10
                cursor-pointer
                transition duration-300
                active:scale-95

                text-gray-700
                hover:text-(--primary)

                after:content-['']
                after:absolute
                after:left-0
                after:-bottom-1
                after:h-[2px]
                after:w-full
                after:bg-(--primary)

                after:origin-left
                after:scale-x-0
                after:transition-transform
                after:duration-300

                hover:after:scale-x-100
            "
        >
            {children}
        </button>
    )
}

export default Button;
export { NavBarButton };