"use client";

import { createSubscription } from "@reflowhq/auth-next/client";
import { FaCircleCheck } from "react-icons/fa6";

type Plan = {
  name: string;
  features: [];
  price: string;
  billingPeriod: string;
  subscriptionID: number;
};

export default function Plan({
  name,
  features,
  price,
  billingPeriod,
  subscriptionID,
}: Plan) {
  return (
    <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8">
      <h5 className="mb-4 text-xl font-medium text-gray-500">{name}</h5>
      <div className="flex items-baseline text-gray-900">
        <span className="text-4xl font-extrabold tracking-tight">{price}</span>
        <span className="ms-1 text-xl font-normal text-gray-500">
          /{billingPeriod}
        </span>
      </div>
      <ul role="list" className="space-y-5 my-7">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <FaCircleCheck size={20} color="#2563eb" />
            <span className="text-base font-normal leading-tight text-gray-500 ms-3">
              {feature}
            </span>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
        onClick={() => {
          createSubscription({
            priceID: subscriptionID,
            onSuccess: () => location.reload(),
          });
        }}
      >
        Subscribe
      </button>
    </div>
  );
}
