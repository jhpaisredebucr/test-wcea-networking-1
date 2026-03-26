import OrderCard from "../common/order_card";

export default function OrdersMember({orders}) {
    if (!orders) {
            return <p>Loading products...</p>;
        }
        
        return (
            <div className="grid grid-cols-4">
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