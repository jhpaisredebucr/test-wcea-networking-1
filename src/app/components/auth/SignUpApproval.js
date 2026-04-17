"use client"

import Card from "../card/Card"

export default function SignUpApproval() {
    return (
        <div className="flex w-full flex-col items-center justify-center p-4 sm:p-6 lg:p-12">
            <div className="flex flex-col justify-center items-center">
                <Card bold="font-bold text-3xl sm:text-4xl lg:text-5xl text-center px-8 py-12">
                    THANK YOU!
                    <br />
                    <span className="text-xl sm:text-2xl mt-4 block">WAITING FOR APPROVAL</span>
                </Card>
              
            </div>
        </div>
    )
}