/**
 * A welcome card component featuring a Pikachu background
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child elements to be rendered inside the card
 * @returns {JSX.Element} A styled div with background image containing children elements
 */

import { JSX } from "react";

const PikachuWelcomeCard = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => (
  <div
    className="min-h-screen flex items-center justify-center relative overflow-hidden"
    style={{
      backgroundImage: "url('/img1.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    {children}
  </div>
);

export default PikachuWelcomeCard;
