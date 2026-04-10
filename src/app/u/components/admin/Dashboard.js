import Card from "../ui/Card"

export default function DashboardAdmin({dashboardData}) {
    return (
        <div className="grid grid-cols-4 auto-rows-[130px] gap-5 w-full">
            <Card title="Total Members" value={dashboardData?.totalMembers} info=" "/>
            <Card title="Pending Requests" value={dashboardData?.totalRequest} info="0 approved today"/>
            <Card title="Top Referrers" value={dashboardData?.topReferrer?.[0]?.username} info=" " colSpan={2} rowSpan={2}/>
            <Card title="Revenue" value={`₱${dashboardData?.revenue?.admin_revenue}`} info=" "/>
            <Card title="" value="" info="" rowSpan={2}/>
            <Card title="" value="" info="" rowSpan={2}/>
            <Card title="" value="" info=""/>
            <Card title="" value="" info=""/>
            <Card title="" value="" info=""/>
            <Card title="" value="" info=""/>
            <Card title="System Alerts" value="No alerts" info=" "/>
            <Card title="Server Status" value="All Green" info="No downtime"/>
        </div>
    )
}