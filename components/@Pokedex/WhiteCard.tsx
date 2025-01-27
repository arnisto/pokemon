import { JSX } from "react";

/**
 * A white card component that renders children within a styled container
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child elements to render inside the card
 * @returns {JSX.Element} A styled white card container
 */
const WhiteCard = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => (
  <div
    className="bg-white p-8 rounded-lg shadow-2xl text-center w-96 relative z-10"
    style={{ zIndex: 2 }}
  >
    {children}
  </div>
);

export default WhiteCard;
