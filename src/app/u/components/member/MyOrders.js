import OrderCard from "../ui/OrderCard";

export default function OrdersMember({orders, products, userInfo}) {
    if (!orders) {
        return <p>Loading orders...</p>;
    }
    
    const userOrders = orders.filter(order => order.user_id === userInfo?.id);

    function debug() {
        console.log(orders);
        console.log(userOrders);
    }
        
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