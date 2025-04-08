import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="h-[800px] w-full flex flex-col items-center justify-center">
      <SignIn path="/sign-in" />
    </div>
  );
}
