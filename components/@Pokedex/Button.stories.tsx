import Button from "@/components/@Pokedex/Button";

export default {
  title: "Components/Button",
  component: Button,
};

export const Primary = () => (
  <Button onClick={() => alert("Button clicked!")}>Click Me</Button>
);

export const Secondary = () => (
  <Button onClick={() => alert("Button clicked!")}>Secondary Button</Button>
);
