import type { Meta, StoryObj } from "@storybook/react";
import TextInput from "./TextInput";

const meta = {
  title: "Pokedex/TextInput",
  component: TextInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "",
    onChange: (value: string) => {
      console.log(value);
    },
    placeholder: "Search Pokemon...",
  },
};

export const WithValue: Story = {
  args: {
    value: "Pikachu",
    placeholder: "Search Pokemon...",
    onChange: (value: string) => {
      console.log(value);
    },
  },
};

export const Disabled: Story = {
  args: {
    value: "",
    placeholder: "Search Pokemon...",
    onChange: (value: string) => {
      console.log(value);
    },
    disabled: true,
  },
};

export const WithError: Story = {
  args: {
    onChange: (value: string) => {
      console.log(value);
    },
    placeholder: "Search Pokemon...",
    value: "Error",
    error: "Invalid input",
  },
};
