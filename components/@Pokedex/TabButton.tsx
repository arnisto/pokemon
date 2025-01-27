/**
 * A button component for tabs in the Pokedex
 * @param {Object} props - The component props
 * @param {string} props.tabName - The name of the tab
 * @param {string} props.activeTab - The currently active tab name
 * @param {(tabName: "stats" | "evolutions" | "moves") => void} props.setActiveTab - Function to set the active tab
 * @param {string} props.backgroundColor - The background color class for the active tab
 * @returns {JSX.Element} A button element for the tab
 */
const TabButton = (props: {
  tabName: "stats" | "evolutions" | "moves";
  activeTab: "stats" | "evolutions" | "moves";
  setActiveTab: (tabName: "stats" | "evolutions" | "moves") => void;
  backgroundColor: string;
}) => {
  const { tabName, activeTab, setActiveTab, backgroundColor } = props;
  return (
    <button
      onClick={() => setActiveTab(tabName || "stats")}
      className={`px-4 py-2 rounded-2xl ${
        activeTab === tabName ? `${backgroundColor} text-white` : "bg-gray-200"
      }`}
    >
      {tabName.charAt(0).toUpperCase() + tabName.slice(1)}
    </button>
  );
};

export default TabButton;
