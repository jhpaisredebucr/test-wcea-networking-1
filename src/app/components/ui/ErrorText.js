import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ErrorText({label, onRetry, showButtons = true, fullScreen = false}) {
    const router = useRouter();
    return (
        <div className={`flex flex-col items-center justify-center min-h-screen ${fullScreen ? 'p-8 text-center' : 'p-6'} bg-red-50`}>
            <div className={`${fullScreen ? 'w-full max-w-md p-8 bg-white/70 backdrop-blur-md rounded-2xl shadow-2xl border border-red-200' : 'bg-red-50 border border-red-200 rounded-lg'}`}>

                <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg">
                    <Image
                        src="/images/brands/wcea-acsr.png"
                        alt="WCEA Logo"
                        height={200}
                        width={200}
                        className="object-contain"
                    />
                </div>

                <p className={`text-red-600 font-medium mb-6 text-center max-w-md ${fullScreen ? 'text-2xl' : 'text-lg'}`}>{label}</p>
                {showButtons && (
                    <div className="flex gap-3 justify-center flex-wrap">
                        {onRetry && (
                            <button 
                                onClick={onRetry}
                                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-medium"
                            >
                                Retry
                            </button>
                        )}
                        <button 
                            onClick={() => router.push('/')}
                            className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition font-medium"
                        >
                            Go Home
                        </button>
                        <button 
                            onClick={() => window.location.reload()}
                            className="px-6 py-3 bg-(--primary) text-white rounded-lg hover:bg-(--primary)] transition font-medium"
                        >
                            Reload Page
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
