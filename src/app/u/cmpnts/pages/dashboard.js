import Card from "../common/card"

export default function DashboardMember() {
    return (
        <div className="grid grid-cols-4 auto-rows-[130px] gap-5 w-full">
            <Card title="Available Balance" value="0" valueSize="text-4xl" clas info="" rowSpan="row-span-2" colSpan="col-span-2"><button className="p-2 bg-blue-400 rounded-lg">Withdraw</button></Card>
            <Card title="Commissions" value="0" info="" colSpan="col-span-2"/>
            <Card title="Total Referred" value="0" info="" colSpan="col-span-2"/>
            <Card title="Referral Link" value="http://localhost:3000/u/profile/pauloreevebuta/MEM-MTE8PA" valueSize="lg" bold="" info="" colSpan="col-span-4"/>
            <Card title="" value="" info=""/>
            <Card title="" value="" info=""/>
            <Card title="" value="" info=""/>
            <Card title="" value="" info=""/>
            <Card title="" value="" info=""/>
            <Card title="" value="" info=""/>
            <Card title="" value="" info=""/>
        </div>
    )
}