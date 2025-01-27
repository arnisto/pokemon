import type { Meta, StoryObj } from "@storybook/react";
import GoBack from "./GoBack";

const meta = {
  title: "Pokedex/GoBack",
  component: GoBack,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof GoBack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
