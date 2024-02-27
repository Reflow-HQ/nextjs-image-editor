import { revalidatePath } from "next/cache";

import getAuth from "@/auth";
import prisma from "@/db";

import LoginButton from "@/components/LoginButton";
import LogoutButton from "@/components/LogoutButton";
import ModifySubscriptionButton from "@/components/ModifySubscriptionButton";
import ImageEditor from "@/components/ImageEditor";
import PlanList from "@/components/PlanList";

export default async function Home() {
  const auth = getAuth();
  const user = await auth.user();
  const userId = String(user?.id || "");

  async function getPlans() {
    "use server";
    const res = await fetch(`${auth.apiBase}/stores/${auth.storeID}/plans/`);
    return res.json();
  }

  async function createEdit(prompt: string) {
    "use server";

    await prisma.edit.create({ data: { prompt, userId } });
    revalidatePath("/");
  }

  if (await auth.isSignedIn()) {
    const sub = await auth.subscription();
    const plans = await getPlans();

    const editCount = sub ? await prisma.edit.count({ where: { userId } }) : 0;
    const canEditImages = sub?.plan.parameters.edits > editCount;

    return (
      <div className="w-full max-w-[900px]">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <h1 className="text-xl font-semibold mb-2">Hello, {user?.name}</h1>
          <div className="flex gap-2">
            {sub && <ModifySubscriptionButton />}
            <LogoutButton />
          </div>
        </div>

        {sub ? (
          <ImageEditor
            canGenerateEdits={canEditImages}
            createEdit={createEdit}
          />
        ) : (
          <div className="max-w-[600px]">
            <PlanList plans={plans.data} />
            <div className="w-full md:max-w-[600px] bg-blue-100 text-blue-600 mt-12 p-5 px-7 rounded-lg">
              <h4 className="text-blue-800 mb-3 font-semibold text-lg">
                Testing Subscriptions
              </h4>
              <p className="mb-5">
                This store is in test mode. You can test the subscriptions by
                using one of the test cards that Stripe provides.
              </p>

              <a
                href="https://docs.stripe.com/testing?locale=en-GB#use-test-cards"
                target="_blank"
                className="inline-block bg-blue-700 hover:bg-blue-800 text-white p-2 px-4 mb-2 rounded-lg"
              >
                Learn More
              </a>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl font-semibold mb-4">
        Image editor example with Reflow
      </h1>
      <p className="text-slate-500 mb-10">
        To begin, click the Sign in button.
      </p>
      <LoginButton />
    </div>
  );
}
