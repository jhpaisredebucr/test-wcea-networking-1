import SignInForm from "@/app/cmpnts/auth/sign_in_form";
import Navbar from "@/app/cmpnts/layout/navbar";
import Sidebar from "@/app/cmpnts/layout/sidebar";

export const metadata = {
  title: "Sign In"
};

export default function SignIn() {
  return (
    <div className="flex h-[calc(100vh-56px)] w-full">
      <SignInForm/>
    </div>
  )
}