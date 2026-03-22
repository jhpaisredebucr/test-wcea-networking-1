
export default function TestUI(){

    return (
        <>
            <p className="z-100 text-red-600 justify-center flex items-center mt-10 hover:animate-spin transition duration-10 select-none">This is a test UI page</p>
            <div className="flex h-screen w-full items-center justify-center">

                <div className="flex mt-4 mx-4 w-full h-full">

                    <div className="mx-2 hover:shadow-xl w-1/2 h-1/2 transform hover:scale-101 bg-gray-200 rounded-lg flex items-center opacity-50 duration-200 quad-in hover:opacity-100 justify-center border-1 hover:cursor-pointer hover:bg-blue-200 border-gray-400 border-transparent hover:border-gray-400">
                        <p className="text-gray-600">This is </p>
                    </div>
                    
                    <div className="mx-2 hover:shadow-xl w-1/2 h-1/2 transform hover:scale-101 bg-gray-200 rounded-lg flex items-center opacity-50 duration-200 quad-in hover:opacity-100 justify-center border-1 hover:cursor-pointer hover:bg-blue-200 border-gray-400 border-transparent hover:border-gray-400">
                        <p className="text-gray-600">This is </p>
                    </div>
                
                    <div className="mx-2  hover:shadow-xl w-1/2 h-1/2 transform hover:scale-101 bg-gray-200 rounded-lg flex items-center opacity-50 duration-200 quad-in hover:opacity-100 justify-center border-1 hover:cursor-pointer hover:bg-blue-200 border-gray-400 border-transparent hover:border-gray-400">
                        <p className="text-gray-600">This is </p>
                    </div>
                
                </div>

            </div>
        </>        
        
    )
}