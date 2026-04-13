import Card from "../Card";
import OrderCard from "../OrderCard";

export default function OrdersMember({ orders = [], products = [], userData }) {

    if (!userData) {
        return <p>Loading orders...</p>;
    }

    const userOrders = orders.filter(
        order =>
            order.user_id === userData?.userInfo?.id ||
            order.user_id === userData?.id
    );

    const hasOrder = userOrders.length > 0;

    // function debug() {
    //     console.log(orders, products, userData);
    // }

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
            {/* <button onClick={debug} className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition">Debug</button> */}
        </div>
    );
}