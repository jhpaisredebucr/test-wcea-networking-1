export default function BuyModal({ setBuying } ) {
    function Close() {
        setBuying(false);
    }
    return (
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold">BUYERZ</h2>
                <p className="mt-2">BYERZ BYERZ.</p>

                <div className="space-x-3">
                    <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"> Buy</button>
                    <button onClick={Close} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"> Close</button>
                </div>
            </div>
        </div>
    )
}