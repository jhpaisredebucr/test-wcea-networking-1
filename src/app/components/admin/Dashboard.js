import Card from "../card/Card"

export default function DashboardAdmin({dashboardData}) {
    return (
        <div className="grid grid-cols-4 auto-rows-[130px] gap-5 w-full">
            <Card title="Total Members" value={dashboardData?.totalMembers} info=" "/>
            <Card title="Pending Requests" value={dashboardData?.totalRequest} info=" "/>
            <Card title="Top Referrers" value={`${dashboardData?.topReferrer?.[0]?.first_name} ${dashboardData?.topReferrer?.[0]?.last_name}`} info=" " colSpan={2} rowSpan={2}/>
            <Card title="Revenue" value={`₱${dashboardData?.revenue?.admin_revenue}`} info=" "/>
            <Card title="Total Pending Orders" value={dashboardData?.totalPendingOrders} info=" " rowSpan={2}/>
            <Card title="" value="" info="" rowSpan={2}/>
            <Card title="" value="" info=""/>
            <Card title="" value="" info=""/>
            <Card title="" value="" info=""/>
            <Card title="" value="" info=""/>
            <Card title="System Alerts" value="No alerts" info=" "/>
            <Card title="Server Status" value="All Green" info=" "/>
        </div>
    )
}