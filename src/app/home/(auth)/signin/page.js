import SignInForm from "@/app/components/auth/SignIn";

export const metadata = {
  title: "Sign In"
};

export default function SignIn() {
  return (
    <div className="flex h-[calc(100vh-96px)] w-full">
      <SignInForm/>
    </div>
  )
}