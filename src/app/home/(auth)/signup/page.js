import SignUpForm from "@/app/components/auth/SignUpForm";
import Image from "next/image";

export const metadata = {
  title: "Sign Up"
};

export default async function SignUp({ searchParams }) {
  const params = await searchParams;
  const ref = params?.ref ?? null;

  return (
    <div className="grid grid-cols-1 md:grid-cols gap-4 md:gap-8 w-full   
      items-center justify-center p-4 md:p-8">
        
      {/* Sign Up Form */}
      <div className="flex flex-col justify-center px-20">
        <SignUpForm refCode={ref} />
      </div>
    </div>
  );
}