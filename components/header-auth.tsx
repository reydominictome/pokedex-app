'use client';

import Link from "next/link";
import { Button } from "./ui/button";
import { ThemeSwitcher } from "./theme-switcher";
import { useAuthActions } from "@/hooks/use-auth-actions";
import { useUserStore } from "@/providers/user-provider";

export default function HeaderAuth() {
  const { signOut } = useAuthActions();
  const user = useUserStore((store) => store.user);
  const { email } = user || {};

  const name = email?.split('@')?.[0] || 'Pokemon Master';

  return user ? (
    <div className="flex items-center gap-4">
      <ThemeSwitcher />
      Hey, {name}!
      <form action={signOut}>
        <Button type="submit" variant={"outline"}>
          Sign out
        </Button>
      </form>
    </div>
  ) : (
    <div className="flex gap-2">
      <ThemeSwitcher />
      <Button asChild size="sm" variant={"outline"}>
        <Link href="/sign-in">Sign in</Link>
      </Button>
      <Button asChild size="sm" variant={"default"}>
        <Link href="/sign-up">Sign up</Link>
      </Button>
    </div>
  );
}
