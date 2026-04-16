import SignUpForm from "@/app/components/auth/SignUpForm";
import Image from "next/image";

export const metadata = {
  title: "Sign Up"
};

export default async function SignUp({ searchParams }) {
  const params = await searchParams;
  const ref = params?.ref ?? null;

  return (
    <div className="max-w-md sm:max-w-2xl lg:max-w-4xl mx-auto px-4 sm:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center justify-center">
        {/* Sign Up Form */}
        <div className="flex flex-col justify-center">
          <SignUpForm refCode={ref} />
        </div>
      </div>
    </div>
  );
}
