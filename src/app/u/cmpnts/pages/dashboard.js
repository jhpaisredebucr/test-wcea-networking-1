import Card from "../common/card"

export default function DashboardMember() {
    return (
        <div className="grid grid-cols-4 auto-rows-[130px] gap-5 w-full">
            <Card title="" value="" info=""/>
            <Card title="" value="" info=""/>
            <Card title="" value="" info="" rowSpan={2}/>
            <Card title="" value="" info="" rowSpan={2}/>
            <Card title="" value="" info=""/>
            <Card title="" value="" info=""/>
            <Card title="" value="" info="" colSpan={2} rowSpan={2}/>
            <Card title="" value="" info=""/>
            <Card title="" value="" info=""/>
            <Card title="" value="" info=""/>
            <Card title="" value="" info=""/>
        </div>
    )
}