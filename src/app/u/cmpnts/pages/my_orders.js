import OrderCard from "../order_card";

export default function OrdersMember({orders}) {
    if (!orders) {
            return <p>Loading products...</p>;
        }
        
        return (
            <div >
                <div className="space-y-4">
                    {orders.map((order) => (
                        <OrderCard 
                            key={order.id}
                            orders={order}
                        />
                    ))}
                </div>
            </div>
        )
}