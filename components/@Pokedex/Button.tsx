/**
 * Button component with different variants
 * @param {Object} props - The component props
 * @param {'primary' | 'secondary' | 'default'} [props.variant='default'] - The button variant
 * @param {React.ReactNode} props.children - The button content
 * @param {(event: React.MouseEvent<HTMLButtonElement>) => void} props.onClick - Click handler
 */
const Button = ({
  children,
  onClick,
  variant = "default",
}: {
  children: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: "primary" | "secondary" | "default";
}) => {
  const variants = {
    primary: "bg-red-500 hover:bg-red-600 text-white",
    secondary: "bg-black hover:bg-gray-800 text-white",
    default: "bg-blue-500 hover:bg-blue-600 text-white",
  };

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg ${variants[variant]}`}
    >
      {children}
    </button>
  );
};

export default Button;
