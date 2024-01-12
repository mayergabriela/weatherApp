"use client";
import { Card, Divider, Subtitle, Text } from "@tremor/react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 to-blue-200">
      <Card>
        <Text className="text-6xl font-bold text-center mb-10">
          Weather IA App
        </Text>
        <Subtitle className="text-xl text-center text-slate-500">
          Powered by OpenAI, Next.Js, Tailwind CSS, Tremor 2.0, Stepten and
          more!
        </Subtitle>
        <Divider className="my-10" />
        <Card className="bg-gradient-to-br from-blue-950 to-blue-200">
          {/* City Picker Component*/}
        </Card>
      </Card>
    </div>
  );
}
