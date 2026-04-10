import SignInForm from "@/app/components/auth/SignIn";
import Image from "next/image";

export const metadata = {
  title: "Sign In"
};

export default function SignIn() {
  return (
    <div className="
      grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8
      w-full min-h-screen items-center justify-center p-4 md:p-8">

      {/* Sign In Form */}
      <div className="flex flex-col justify-center">
        <SignInForm />
      </div>

      <div className="hidden md:flex items-center justify-center">
        <Image 
          src="/images/test-splash.jpg" 
          alt="Sign in visual" 
          width={350} 
          height={350} 
          className="rounded-2xl object-cover shadow-lg"
          priority
        />
      </div>
    </div>
  )
}