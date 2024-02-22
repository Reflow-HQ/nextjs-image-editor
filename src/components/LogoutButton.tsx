"use client";

import { signOut } from "@reflowhq/auth-next/client";
import Button from "@/components/Button";

export default function LogoutButton() {
  return (
    <Button onClick={() => signOut({ onSuccess: () => location.reload() })}>
      Sign out
    </Button>
  );
}
