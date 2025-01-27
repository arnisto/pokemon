/**
 * Component that displays Pokemon statistics in a bar chart format
 * @param {Object} props - Component properties
 * @param {Array<{stat: {name: string}, base_stat: number}>} props.stats - Array of Pokemon stats
 * @param {string} props.backgroundColor - CSS class for the stat bar background color
 * @returns {JSX.Element} Pokemon statistics component
 */
const PokemonStatistics = (props: {
  stats: Array<{
    stat: {
      name: string;
    };
    base_stat: number;
  }>;
  backgroundColor: string;
}) => {
  const { stats } = props;
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Stats</h2>
      <div className="space-y-2">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center">
            <span className="w-32 font-semibold capitalize">
              {stat.stat.name}
            </span>
            <div className="flex-1 bg-gray-200 rounded-full h-4">
              <div
                className={`${props.backgroundColor} h-4 rounded-full`}
                style={{
                  width: `${(stat.base_stat / 255) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonStatistics;
