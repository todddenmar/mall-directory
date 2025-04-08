import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="h-[800px] w-full flex flex-col items-center justify-center">
      <SignUp path="/sign-up" />
    </div>
  );
}
