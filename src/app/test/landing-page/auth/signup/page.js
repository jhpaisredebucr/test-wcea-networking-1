import Sidebar from "@/app/components/layout/sidebar";
import SignUpForm from "@/app/components/auth/sign_up_form";

export const metadata = {
  title: "Sign Up"
};

export default function SignUp() {
  return (
    <div className="flex h-[calc(100vh-56px)] w-full">
      <Sidebar/>
      <SignUpForm/>
    </div>
  )
}