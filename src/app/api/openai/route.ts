import { openai } from "@/lib/openai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const req = await request.json();

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    temperature: 1,
    messages: [
      {
        role: "system",
        content: "You are only to speak in JSON format.",
      },
      {
        role: "system",
        content:
          "From a user message, build a JSON object of what the user requests that can be used as test data during the development of the user's project.",
      },
      {
        role: "user",
        content: `The user's request for a JSON object is the following: ${req.prompt}`,
      },
    ],
  });

  const answer = response.choices[0].message.content;
  return NextResponse.json({ answer }, { status: 200 });
}
