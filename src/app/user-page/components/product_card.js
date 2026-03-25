import Profile from "@/app/components/ui/profile"

export default function ProductCard({ products }) {
    return (
        <div>
            <div className="h-50 p-5 rounded-lg bg-white">
                <Profile first_name="Keisac" last_name="Buta"/>
                <p className="font-bold my-5">{products?.product_name}</p>
                <p>{products?.description}</p>
                <p>Price: {products?.price}</p>
            </div>
        </div>
    )
}