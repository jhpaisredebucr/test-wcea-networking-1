import Card from "../Card";
import OrderCard from "../OrderCard";

export default function OrdersMember({ orders = [], products = [], userData }) {

    if (!userData) {
        return <p>Loading orders...</p>;
    }

    const userOrders = orders.filter(
        order => order.user_id === userData?.userInfo?.id
    );

    const hasOrder = userOrders.length > 0;

    return (
        <div>
            <div className="space-y-4">
                {!hasOrder && (
                    <p className="text-gray-500 text-center py-10">
                        No orders yet.
                    </p>
                )}

                {userOrders.map((order) => (
                    <OrderCard 
                        key={order.id}
                        orders={order}
                        products={products}
                    />
                ))}
            </div>
        </div>
    );
}