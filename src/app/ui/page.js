'use client'

import { useRouter, useSearchParams } from "next/navigation"
import Input from "@/app/cmpnts/ui/input"
import { useState } from "react";
import { useEffect } from "react";

export default function TestUI(){
    const router = useRouter();
    const [inputValue, setInputValue] = useState("");
    const searchParams = useSearchParams();

    const [theme, setTheme] = useState("");

    // Initialize based on system preference
    useEffect(() => {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setTheme("theme-dark");
        } else {
        setTheme(""); // default light
        }
    }, []);

    // Apply theme to <html>
    useEffect(() => {
        document.documentElement.className = theme;
    }, [theme]);


    return (
        <>
            <div className="p-5 space-x-2">
                <button onClick={() => setTheme("")}>Light</button>
                <button onClick={() => setTheme("theme-dark")}>Dark</button>
                <button onClick={() => setTheme("theme-soft")}>Soft</button>
            </div>
            <div>

            </div>
            <p className="z-100 text-red-600 justify-center flex items-center mt-10 hover:animate-spin transition duration-10 select-none">This is a test UI page</p>
            <div className="flex h-100 w-full items-center justify-center">

                <div className="flex mt-4 mx-4 w-300  h-200">
                    <div onClick={(e)=>{
                        e.preventDefault();
                        router.push("/test/ui/side-nav");
                    }} className="bg-gradient-to-t from-gray-500 to-gray-200 mx-2 hover:shadow-xl w-1/2 h-1/2 transform hover:scale-101 bg-gray-200 rounded-lg flex items-center opacity-50 duration-200 quad-in hover:opacity-100 justify-center hover:cursor-pointer hover:bg-blue-200 border-gray-400 border-transparent hover:border-gray-400">
                        <div className="border-1 rounded-full animate-ping w-8 h-8"></div>
                        <p className="text-gray-600">Side nav</p>
                    </div>
                    
                    <div className="mx-2 hover:shadow-xl w-1/2 h-1/2 transform hover:scale-101 bg-gray-200 rounded-lg flex items-center opacity-50 duration-200 quad-in hover:opacity-100 justify-center border-1 hover:cursor-pointer hover:bg-blue-200 border-gray-400 border-transparent hover:border-gray-400">
                        <p className="text-gray-600">This is </p>
                    </div>
                
                    <div className="mx-2  hover:shadow-xl w-1/2 h-1/2 transform hover:scale-101 bg-gray-200 rounded-lg flex items-center opacity-50 duration-200 quad-in hover:opacity-100 justify-center border-1 hover:cursor-pointer hover:bg-blue-200 border-gray-400 border-transparent hover:border-gray-400">
                        <p className="text-gray-600">This is </p>
                    </div>
                </div>
                
            </div>
            <Input label="Test Input" type="text" value={inputValue} onChange={setInputValue} />
    
        </>        
    )
}