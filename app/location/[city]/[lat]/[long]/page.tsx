import { getClient } from "@/apollo-client";
import fetchWeatherQuery from "@/graphql/queries/fetchWeatherQueries";
import CalloutCard from "@/components/CalloutCard";
import StatCard from "@/components/StatCard";
import InformationPanel from "@/components/InformationPanel";
import RainChart from "@/components/RainChart";
import TempChart from "@/components/TempChart";
import HumidityChart from "@/components/HumidityChart";
import getBasePath from "@/app/lib/getBasePath";
import cleanData from "@/app/lib/cleanData";

export const revalidate = 60; // 1 minute

type Props = {
  params: {
    city: string;
    lat: string;
    long: string;
  };
};

async function WeatherPage({ params: { city, lat, long } }: Props) {
  const client = getClient();

  const { data } = await client.query({
    query: fetchWeatherQuery,
    variables: {
      current_weather: "true",
      longitude: long,
      latitude: lat,
      timezone: "GMT",
    },
  });

  const results: Root = data.myQuery;

  const dataToSend = cleanData(results, city);

  const res = await fetch(`${getBasePath()}/api/getWeatherSummary`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      weatherData: dataToSend,
    }),
  });

  const GPTdata = await res.json();
  const { content } = GPTdata;

  return (
    <div className="flex flex-col min-h-screen md:flex-row">
      {/*Information Pannel */}
      <InformationPanel city={city} long={long} lat={lat} results={results} />

      <div className="flex-1 p-5 lg:p-10">
        <div className="pb-5">
          <div className="pb-5">
            <h2 className="text-xl font-bold">Todays Overview</h2>
            <p className="text-sm text-gray-400">
              Last Update at:{""}
              {new Date(results.current_weather.time).toLocaleString()}(
              {results.timezone})
            </p>
          </div>

          {/*Callout Card - It's the GPT Summary */}
          <div className="m-2 mb-10">
            <CalloutCard message={content} />
          </div>

          <div className="m-2 mb-10">
            <CalloutCard message="This is where GPT Summary will go" />C
          </div>

          {/*Temperature Stats */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 m-2 ">
            <StatCard
              title="Maximum Temperature"
              metric={`${parseFloat(
                results.daily.temperature_2m_max[0]
              ).toFixed(1)}°C`}
              color="yellow"
            />

            <StatCard
              title="Minimum Temperature"
              metric={`${parseFloat(
                results.daily.temperature_2m_min[0]
              ).toFixed(1)}°C`}
              color="green"
            />
          </div>

          {/*UV Stats */}
          <div>
            <StatCard
              title="UV Index"
              metric={`${parseFloat(results.daily.uv_index_max[0]).toFixed(1)}`}
              color="rose"
            />
            {parseFloat(results.daily.uv_index_max[0]) > 5 && (
              <CalloutCard
                message={"The UV is high today, so be sure to wear SPF!"}
                warning
              />
            )}
          </div>

          {/*Wind Stats */}
          <div className="flex space-x-3">
            <StatCard
              title="Wind Speed"
              metric={`${results.current_weather.windspeed.toFixed(1)} m/s`}
              color="cyan"
            />
            <StatCard
              title="Wind Direction"
              metric={`${results.current_weather.winddirection.toFixed(1)}°`}
              color="violet"
            />
          </div>
        </div>
      </div>
      <hr className="mb-5" />
      <div className="space-y-3">
        {/*TEmperature Chart */}
        <TempChart results={results} />

        {/*Rain Chart */}
        <RainChart results={results} />

        {/*Humidity Chart */}
        <HumidityChart results={results} />
      </div>
    </div>
  );
}

export default WeatherPage;
