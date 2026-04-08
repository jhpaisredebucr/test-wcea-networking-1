import OrderCard from "../ui/OrderCard";

export default function OrdersMember({orders, products, userData}) {
    if (!orders) {
        return <p>Loading orders...</p>;
    }
    
    const userOrders = orders.filter(order => order.user_id === userData?.userInfo?.id);
        
    return (
        <div >
            <div className="space-y-4">
s
                
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