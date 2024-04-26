import "server-only";
import { ReflowAuth } from "@reflowhq/auth-next";

export default function getAuth(): ReflowAuth {
  return new ReflowAuth({
    projectID: parseInt(process.env.REFLOW_PROJECT_ID || process.env.REFLOW_STORE_ID || ""),
    secret: process.env.REFLOW_SECRET || "",
    testMode: true,
  });
}
