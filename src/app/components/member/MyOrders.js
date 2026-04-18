//CLIENT COMPONENT

"use client"

import Card from "../card/Card";
import OrderCard from "../card/OrderCard";

export default function OrdersMember({ orders = [], products = [], userData }) {

    if (!userData) {
        return <p>Loading orders...</p>;
    }

    const hasOrder = orders.length > 0;


    return (
        <div>
            <div className="space-y-4">
                {!hasOrder && (
                    <p className="text-gray-500 text-center py-10">
                        No orders yet.
                    </p>
                )}

                {orders.map((order) => (
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