import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gradient-background">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-white mb-8">Welcome to OpsMastery</h1>
        <div className="space-x-4">
          <Link href="/auth/signin">
            <Button variant="default">Sign In</Button>
          </Link>
          <Link href="/auth/signup">
            <Button variant="outline">Sign Up</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}