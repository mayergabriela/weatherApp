import React from "react";
import weatherCodeToString from "@/lib/WeatherCodeToString";
import { MoonIcon, SunIcon } from "@heroicons/react/solid";
import Image from "next/image";
import CityPicker from "@/components/CityPicker";

type Props = {
  city: string;
  results: Root;
  lat: string;
  long: string;
};

function InformationPanel({ city, lat, long, results }: Props) {
  return (
    <div>
      <div className="bg-gradient-to-br from-[#394F68] to-[#183B7B] border-card text-white p-10">
        <h1 className="text-6xl font-bold">{decodeURI(city)}</h1>
        <p className="text-xs text-gray-400">
          Longitude/ Latitude: {long}, {lat}
        </p>
      </div>

      <CityPicker />

      <hr className="my-10" />

      <div className="mt-5 flex items-center justify-between space-x-10 mb-5">
        <div>
          <p className="text-xl">
            {new Date().toLocaleDateString("en-GB", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <p className="font-extralight">
            Timezone:{Intl.DateTimeFormat().resolvedOptions().timeZone}
          </p>
        </div>
        <p>
          {new Date().toLocaleTimeString("en-GB", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
        </p>

        <hr className="mt-10 mb-5" />

        <div>
          <div>
            {/* IMAGE */}
            <div>
              <p>{results.current_weather.temperature.toFixed(1)}°C</p>

              <p>
                {/* Weather Code */}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InformationPanel;
