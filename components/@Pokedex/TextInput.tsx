interface TextInputProps {
  /** The current value of the input */
  value: string;
  /** Callback function triggered when input value changes */
  onChange: (value: string) => void;
  /** Placeholder text to display when input is empty */
  placeholder?: string;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Error message to display */
  error?: string;
}

/**
 * A reusable text input component styled for the Pokedex application
 * @param props - The component props
 * @returns A styled text input element
 */
const TextInput: React.FC<TextInputProps> = ({
  value,
  onChange,
  placeholder = "Enter Pokémon name or ID...",
  disabled = false,
  error,
}) => {
  return (
    <div className="w-full">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`w-full p-2 border rounded-lg mb-1 focus:outline-none focus:ring-2 focus:ring-red-500 ${
          error ? "border-red-500" : "border-gray-300"
        } ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}`}
      />
      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
    </div>
  );
};

export default TextInput;
