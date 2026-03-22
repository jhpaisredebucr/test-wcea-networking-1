import SignUpForm from "@/app/components/auth/sign_test_form"
import Sidebar from "@/app/components/layout/sidebar";

export const metadata = {
  title: "Sign In"
};

export default function SignIn() {
  return (
      <div className="flex h-[calc(100vh-56px)] w-full">
        <Sidebar/>
        <SignUpForm/>
      </div>
  )
}