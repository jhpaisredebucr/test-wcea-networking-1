import Card from "../Card"
import FormPdf from "./FormPdf";
import { useState } from "react";
export default function DashboardMember({dashboardData, userData}) {
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
            <Card title="Available Balance" src="/icons/money.svg" color="bg-blue-200" value={`₱${dashboardData?.userBalance}`} valueSize="text-4xl" clas info="" rowSpan="row-span-2" colSpan="col-span-2"><button className="p-2 bg-(--primary)    rounded-lg"><p className="text-white">Withdraw</p></button></Card>
            <Card title="Total Commissions" src="/icons/money.svg" color="bg-orange-200" value={`₱${dashboardData?.totalCommissionValue}`} info="" colSpan="col-span-2"/>
            <Card title="Total Referred" src="/icons/referrals.svg" color="bg-red-300" value={dashboardData?.totalReferredMembers} info="" colSpan="col-span-2"/>
            <Card title="Referral Link" value="" valueSize="lg" bold="" info=" " colSpan="col-span-4">
                <div className="flex justify-between items-center border-2 border-gray-200 border-dotted p-2 rounded-xl">
                    <p className="font-bold">
                        {referralLink}
                    </p>
                
                    <button
                        onClick={handleCopy}
                        className="flex gap-x-2 bg-(--primary) p-3 rounded-xl text-white">
                        <img src="/icons/copy-white.svg" alt="icon"></img>
                        {copied ? "Copied" : "Copy Link"}
                    </button>
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