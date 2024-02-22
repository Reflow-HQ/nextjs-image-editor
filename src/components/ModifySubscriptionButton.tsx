"use client";

import { modifySubscription } from "@reflowhq/auth-next/client";
import Button from "@/components/Button";

export default function ModifySubscriptionButton() {
  return (
    <Button
      onClick={() =>
        modifySubscription({
          onSuccess: () => {
            location.reload();
          },
        })
      }
    >
      Modify Subscription
    </Button>
  );
}
