import { useState } from "react";

function Input({ label, type = "text", value, onChange, require, className = "" }) {

    // !! [[OPTIONAL]] IMPLEMENTATION FOR REQUIRED FIELDS !!//

    // const [touched, setTouched] = useState(false);

    // const isInvalid = require && touched && !value;
    // {isInvalid && (
    //     <p className="text-xs text-red-500">This field is required</p>
    // )}

    // !! PUT THIS INSIDE CLASS NAME IF IMPLEMENTED //

    // ${isInvalid 
    //     ? "border-red-500 focus:ring-2 focus:ring-red-400" 
    //     : "border-gray-300 focus:ring-1 focus:ring-blue-400"}
    // ${className}

    return (
        
        <div className="mb-4">
            <p className="text-sm text-gray-500">{label}</p>
            <input
                required={require}
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                // onBlur={() => setTouched(true)}
                className={`
                    border-gray-400 
                    w-full border rounded-md p-2 mb-2
                    text-gray-800 placeholder-gray-400
                    focus:outline-none transition duration-200
                    focus:ring-1 focus:ring-blue-400 focus:border-blue-200
                `}
            />
        </div>
    );
}

export default Input;