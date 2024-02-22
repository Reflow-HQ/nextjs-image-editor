import { NextResponse } from "next/server";

import getAuth from "@/auth";
import prisma from "@/db";

export async function POST(request: Request) {
  const auth = getAuth();

  if (!(await auth.isSignedIn())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await auth.user();
  const userId = String(user?.id || "");

  const sub = await auth.subscription();

  const editCount = sub ? await prisma.edit.count({ where: { userId } }) : 0;
  const canEditImages = sub?.plan.parameters.edits > editCount;

  if (!canEditImages) {
    return NextResponse.json(
      { error: "Edit quota exceeded." },
      { status: 429 }
    );
  }

  const apiKey = process.env.OPENAI_KEY;
  const formData = await request.formData();

  const res = await fetch("https://api.openai.com/v1/images/edits", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
    body: formData,
  });

  const data = await res.json();
  return Response.json(data);
}
