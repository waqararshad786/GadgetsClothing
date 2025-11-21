import { SignIn } from "@clerk/clerk-react";

export default function LoginPage() {
  return (
    <div className="w-full flex justify-center items-center mt-10">
      <SignIn />
    </div>
  );
}
