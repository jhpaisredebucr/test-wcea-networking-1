import { useRouter } from "next/navigation";
import Button from "../Button";
import Card from "../Card"
import FormPdf from "./FormPdf";
import { useState } from "react";
    export default function DashboardMember({dashboardData, userData}) {
    const router = useRouter();
    const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
    const referralLink = `${API_HOST}/home/signup?ref=${userData?.userInfo?.referral_code}`;

    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(referralLink);
        setCopied(true);
        
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    return (
        <div className="grid grid-cols-4 auto-rows-[130px] gap-5 w-full">
            <Card 
            title="Available Balance" 
            src="/icons/wallet.svg" 
            bold="font-bold"
            color="bg-blue-200" 
            value={`₱${dashboardData?.userBalance}`} 
            valueSize="text-4xl" 
            info="" 
            rowSpan="row-span-2" 
            colSpan="col-span-2">
                
                <Button onClick={() => router.push('/u/withdraw')}>
                    Withdraw
                </Button>
            </Card>

            <Card title="Total Commissions"
            src="/icons/money.svg" 
            color="bg-orange-200" 
            value={`${dashboardData?.totalCommissionValue} CREDITS`} 
            info="" 
            bold="font-bold"
            colSpan="col-span-2"/>

            <Card title="Total Referred" 
            src="/icons/referrals.svg" 
            color="bg-red-300" 
            bold="font-bold"
            value={dashboardData?.totalReferredMembers} 
            info="" 
            colSpan="col-span-2"/>
            
            <Card title="Referral Link" 
            value="" 
            valueSize="lg" 
            bold="" 
            info=" " 
            colSpan="col-span-4">                
                <div className="flex gap-4 justify-between items-center border-2 border-gray-200 border-dotted p-2 rounded-xl">
                    <div className="flex-6">
                        <p className="font-bold class flex-7">
                            {referralLink}
                        </p>
                    </div>
                    
                    <div className="flex-4">
                        <Button
                            onClick={handleCopy}
                            className={`flex bg-(--primary) p-3 rounded-xl text-white
                            ${copied? `bg-(--secondary)` : "bg-(--primary)" }`}
                            icon="/icons/copy-white.svg" >
                            
                            {copied ? "Copied" : "Copy Link"}
                        </Button>
                    </div>
                </div>
            </Card>
            {/* <Card title="" value="" info=""/>
            <Card title="" value="" info=""/>
            <Card title="" value="" info=""/>
            <Card title="" value="" info=""/>
            <Card title="" value="" info=""/>
            <Card title="" value="" info=""/>
            <Card title="" value="" info=""/>
            <Card title="" value="" info=""/> */}
            {/* <FormPdf/>   */}
        </div>
    )
}