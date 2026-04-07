function Button({children, onClick}) {
    return (
        <button onClick={onClick} className="w-full cursor-pointer mb-2 mt-10 p-2 bg-blue-500 rounded-4xl text-white font-bold">
            {children}
        </button>
    )
}

export default Button

export {}