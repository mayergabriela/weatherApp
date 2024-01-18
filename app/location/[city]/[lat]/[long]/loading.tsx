import { SunIcon } from "@heroicons/react/solid";

function Loading() {
  return (
    <div className="bg-gradient-to-br from-[#394f68] to-[#183b7e] min-h-screen flex flex-col items-center justify-center text-slate-500">
      <SunIcon
        className="w-24  h-24 animate-bounce text-yellow-500"
        color="yellow"
      />
      <h1 className="text-6xl font-bold text-center mb-10 animate-pulse">
        {" "}
        LOADING CITY WEATHER INFORMATION
      </h1>
      <h2 className="text-xl font-bold text-center mb-10 animate-pulse">
        We are running the numbers & generating an AI Weather Summary for you.
      </h2>
    </div>
  );
}

export default Loading;
