import type { Meta, StoryObj } from "@storybook/react";
import React, { useEffect, useState } from "react";
import {
  SourceSelectionCard,
  SourceSelectionValue,
} from "../components";

const createDefaultValue = (): SourceSelectionValue => ({
  platform: "",
  url: "",
  tags: [],
});

const meta: Meta<typeof SourceSelectionCard> = {
  title: "Components/SourceSelectionCard",
  component: SourceSelectionCard,
  args: {
    value: createDefaultValue(),
    platformOptions: [
      { label: "YouTube", value: "youtube" },
      { label: "Twitter", value: "twitter" },
      { label: "TikTok", value: "tiktok" },
    ],
  },
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof SourceSelectionCard>;

export const Basic: Story = {
  render: (args) => {
    const [value, setValue] = useState<SourceSelectionValue>(
      args.value ?? createDefaultValue()
    );

    useEffect(() => {
      setValue(args.value ?? createDefaultValue());
    }, [args.value]);

    return (
      <div style={{ padding: 24, backgroundColor: "#f8fafc" }}>
        <SourceSelectionCard
          {...args}
          value={value}
          onChange={(nextValue) => {
            setValue(nextValue);
            if (typeof args.onChange === "function") {
              args.onChange(nextValue);
            }
          }}
        />
        <div style={{ marginTop: 24, fontSize: 12, color: "#475569" }}>
          <strong>当前值:</strong>
          <pre style={{ background: "#0f172a", color: "#e2e8f0", padding: 16, borderRadius: 8 }}>
            {JSON.stringify(value, null, 2)}
          </pre>
        </div>
      </div>
    );
  },
};
