"use client";

import { useEffect, useState } from "react";

import axios from "axios";

// Hardcoded release dates for generations
const generationReleaseDates = {
  "generation-1": "1996-02-27", // Red and Green (Japan)
  "generation-2": "1999-11-21", // Gold and Silver
  "generation-3": "2002-11-21", // Ruby and Sapphire
  "generation-4": "2006-09-28", // Diamond and Pearl
  "generation-5": "2010-09-18", // Black and White
  "generation-6": "2013-10-12", // X and Y
  "generation-7": "2016-11-18", // Sun and Moon
  "generation-8": "2019-11-15", // Sword and Shield
  "generation-9": "2022-11-18", // Scarlet and Violet
};

// Fetch Pokémon species for a specific generation (limit to 5 Pokémon)
async function fetchPokemonSpeciesByGeneration(generationId) {
  try {
    const res = await axios.get(
      `https://pokeapi.co/api/v2/generation/${generationId}`
    );
    return res.data.pokemon_species.slice(0, 5); // Limit to first 5 Pokémon
  } catch (error) {
    console.error(`Error fetching generation ${generationId}:`, error.message);
    return []; // Return an empty array if the generation is not found
  }
}

export default function EventTracker() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const eventsData = [];

      // Fetch data for specific generations (e.g., Gen 1 and Gen 2)
      const generations = [1, 2]; // Use numeric IDs

      for (const generationId of generations) {
        const speciesList = await fetchPokemonSpeciesByGeneration(generationId);
        const generationName = `Generation ${generationId}`;
        const generationReleaseDate =
          generationReleaseDates[`generation-${generationId}`];

        // Add generation release event
        eventsData.push({
          type: "generation",
          title: `${generationName} Released`,
          description: `Introduced ${speciesList.length} new Pokémon species.`,
          date: generationReleaseDate,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            speciesList[0].url.split("/").slice(-2, -1)[0]
          }.png`,
          link: `https://pokeapi.co/api/v2/generation/${generationId}`,
        });

        // Add Pokémon debut events
        for (const species of speciesList) {
          const pokemonId = species.url.split("/").slice(-2, -1)[0];
          eventsData.push({
            type: "pokemon",
            title: `${species.name} Introduced`,
            description: `Part of ${generationName}.`,
            date: generationReleaseDate,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`,
            link: species.url,
          });
        }
      }

      setEvents(eventsData);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Pokémon Event Tracker
        </h1>
        {loading ? (
          <p className="text-gray-600">Loading events...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {event.image && (
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {event.title}
                  </h2>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  <div className="text-sm text-gray-500 mb-4">
                    <span className="font-semibold">Date:</span> {event.date}
                  </div>
                  <a
                    href={event.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
