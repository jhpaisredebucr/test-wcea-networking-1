import { useState } from "react";

function Input({
    label,
    type,
    value,
    required,
    onChange,
    onKeyDown,

    error,
    success,
    disabled = false,

    size = "md",       // sm | md | lg
    variant = "default", // default | error | success

    leftIcon,
    rightIcon,

    className = ""
}) {
    if (error) variant = "error";
    else if (success) variant = "success";

    const variants = {
        default: "border-gray-300 focus:ring-blue-400 focus:border-blue-400",
        error: "border-red-500 focus:ring-red-400 focus:border-red-500",
        success: "border-green-500 focus:ring-green-400 focus:border-green-500",
    };

    const sizes = {
        sm: "text-sm p-1.5",
        md: "text-base p-2",
        lg: "text-lg p-3",
    };

    return (
        <div className="mt-2 w-full">

            {label && (
                <p className="text-sm mb-1 text-gray-600">{label}
                {required && (<span className="m-1 text-(--error-color)" title="required">*</span>)}
                </p>
            )}
            
            <div className="relative flex items-center">
                
                {/* Left Icon */}
                {leftIcon && (
                    <div className="absolute left-3 text-gray-400">
                        {leftIcon}
                    </div>
                )}

                <input
                    type={type}
                    value={value}
                    disabled={disabled}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={onKeyDown}
                    className={`
                        w-full rounded-md border
                        transition duration-200 outline-none

                        ${sizes[size]}
                        ${variants[variant]}

                        ${leftIcon ? "pl-10" : ""}
                        ${rightIcon ? "pr-10" : ""}

                        ${disabled ? "bg-gray-100 cursor-not-allowed opacity-70" : ""}

                        focus:ring-1

                        ${className}
                    `}
                />

                {/* Right Icon */}
                {rightIcon && (
                    <div className="absolute right-3 text-gray-400">
                        {rightIcon}
                    </div>
                )}
            </div>

            {/* Messages */}
            {error && (
                <p className="text-xs text-(--error-color) mt-1">{error}</p>
            )}

            {!error && success && (
                <p className="text-xs text-(--success-color) mt-1">{success}</p>
            )}
        </div>
    );
}

export default Input;