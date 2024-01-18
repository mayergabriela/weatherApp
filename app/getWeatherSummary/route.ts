import OpenAI from "@/openai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // Weatherdata in the body of the POST request
  const { weatherdata } = await request.json();

  const response = await OpenAI.createChatCompletion({
    model: "gpt-3.5-turbo",
    temperature: 0.8,
    n: 1,
    stream: false,
    messages: [
      {
        role: "system",
        content:
          "Pretend you are a weather presenter presenting a LIVE on television. Introduce yourself as AI Weather App and say that you are streamming LIVE from the net.State the city you are providing a summary of it. Then give a Summary of todays weather. Make it easy for the viewer to understand and know what to prepare for in those weather conditions such as wear SPF if the UV is high etc. Use the uv_index provided to give advice. Provide a joke regarding the weather. Assume the data came from your team at the news office and not the userAgent.",
      },
      {
        role: "user",
        content: `Hi there! Can I get a summary of todays weather, use the following information to get the weather,data: ${JSON.stringify(
          weatherdata
        )}`,
      },
    ],
  });

  const { data } = response;
}
