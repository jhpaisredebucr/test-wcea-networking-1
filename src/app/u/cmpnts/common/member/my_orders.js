import OrderCard from "../order_card";

export default function OrdersMember({orders, products, userInfo}) {
    if (!orders) {
        return <p>Loading products...</p>;
    }
    
    const userOrders = orders.filter(order => order.user_id === userInfo?.id);
        
    return (
        <div >
            <div className="space-y-4">
                {userOrders.map((order) => (
                    <OrderCard 
                        key={order.id}
                        orders={order}
                        products={products}
                    />
                ))}
            </div>
        </div>
    )
}