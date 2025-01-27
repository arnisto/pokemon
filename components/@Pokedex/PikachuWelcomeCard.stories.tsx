import type { Meta, StoryObj } from "@storybook/react";
import PikachuWelcomeCard from "./PikachuWelcomeCard";

const meta = {
  title: "Pokedex/PikachuWelcomeCard",
  component: PikachuWelcomeCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PikachuWelcomeCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <div>Default Welcome Message</div>,
  },
};

export const WithCustomMessage: Story = {
  args: {
    children: (
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to the Pokédex!</h1>
        <p className="text-lg">
          Explore the world of Pokémon and discover new creatures.
        </p>
      </div>
    ),
    // message: "Welcome to the world of Pokemon!",
  },
};
