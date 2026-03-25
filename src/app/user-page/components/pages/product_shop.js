import ProductCard from "../product_card";

export default function ProductsMember({ products }) {
    if (!products) {
        return <p>Loading products...</p>;
    }
    1
    return (
        <div className="grid grid-cols-4">
            <div className="space-y-4">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        products={product}
                    />
                ))}
            </div>
        </div>
    )
}