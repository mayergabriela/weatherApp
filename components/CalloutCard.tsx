"use client ";
import React from "react";
import { CheckCircleIcon, ExclamationIcon } from "@heroicons/react/solid";
import { Callout } from "@tremor/react";

type Props = {
  message: string;
  warning?: boolean;
};

function CalloutCard({ message, warning }: Props) {
  return (
    <Callout
      className="mt-4"
      title={message}
      icon={warning ? ExclamationIcon : CheckCircleIcon}
      color={warning ? "red" : "teal"}
    />
  );
}

export default CalloutCard;
