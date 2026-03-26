import ProductCard from "../common/product_card";

export default function ProductsMember({ products, userInfo }) {
    if (!products) {
        return <p>Loading products...</p>;
    }
    
    return (
        <div className="grid grid-cols-4">
            <div className="space-y-4">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        products={product}
                        userInfo={userInfo}
                    />
                ))}
            </div>
        </div>
    )
}