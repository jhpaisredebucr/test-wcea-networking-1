import SignInForm from "@/app/components/auth/sign_in_form";
import Navbar from "@/app/components/layout/navbar";
import Sidebar from "@/app/components/layout/sidebar";

export const metadata = {
  title: "Sign In"
};

export default function SignIn() {
  return (
    <div className="flex h-[calc(100vh-56px)] w-full">
      <Sidebar/>
      <SignInForm/>
    </div>
  )
}