export default function OrderCard({orders}) {
    return (
        <div>
            <div className="h-65 p-5 rounded-lg bg-white">
                <p className="font-bold my-5">{orders?.product_name}</p>
                <p>{orders?.user_id}</p>
                <p>{orders?.product_id}</p>
            </div>
        </div>
    )
}