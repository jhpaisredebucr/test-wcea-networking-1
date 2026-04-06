import Card from "../../ui/Card"
import FormPdf from "./FormPdf";

export default function DashboardMember({dashboardData, userData}) {
    const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

    return (
        <div className="grid grid-cols-4 auto-rows-[130px] gap-5 w-full">
            <Card title="Available Balance" value={`₱${dashboardData?.userBalance}`} valueSize="text-4xl" clas info="" rowSpan="row-span-2" colSpan="col-span-2"><button className="p-2 bg-blue-500 rounded-lg"><p className="text-white">Withdraw</p></button></Card>
            <Card title="Commissions" value={dashboardData?.totalReferredMembers} info="" colSpan="col-span-2"/>
            <Card title="Total Referred" value={dashboardData?.totalReferredMembers} info="" colSpan="col-span-2"/>
            <Card title="Referral Link" value={
                <a
                    href={`${API_HOST}/home/signup?ref=${userData?.userInfo?.referral_code}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline hover:text-blue-700"
                >
                    {`${API_HOST}/home/signup?ref=${userData?.userInfo?.referral_code}`}
                </a> } valueSize="lg" bold="" info="" colSpan="col-span-4"/>
            <Card title="" value="" info=""/>
            <Card title="" value="" info=""/>
            <Card title="" value="" info=""/>
            <Card title="" value="" info=""/>
            <Card title="" value="" info=""/>
            <Card title="" value="" info=""/>
            <Card title="" value="" info=""/>
            <Card title="" value="" info=""/>
            <FormPdf/>  
        </div>
    )
}