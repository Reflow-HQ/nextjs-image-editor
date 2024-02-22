import getAuth from "@/auth";

export async function POST(request: Request) {
  const auth = getAuth();
  return await auth.handleRequest(request);
}
