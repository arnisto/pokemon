import type { Meta, StoryObj } from "@storybook/react";
import WhiteCard from "./WhiteCard";

const meta = {
  title: "Pokedex/WhiteCard",
  component: WhiteCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof WhiteCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Content goes here",
  },
};

export const WithCustomClass: Story = {
  args: {
    children: "Custom styled content",
  },
};

export const WithNestedContent: Story = {
  args: {
    children: (
      <div className="space-y-4">
        <h3 className="text-xl font-bold">Title</h3>
        <p>This is a paragraph inside the white card</p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Action
        </button>
      </div>
    ),
  },
};
