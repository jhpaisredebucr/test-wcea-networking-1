import SignUpForm from "@/app/components/auth/SignUpForm";

export const metadata = {
  title: "Sign Up"
};

export default async function SignUp({ searchParams }) {
  const params = await searchParams;
  const ref = params?.ref ?? null;

  return (
    <div className="flex h-[calc(100vh-96px)] w-full">
      <SignUpForm refCode={ref} />
    </div>
  );
}