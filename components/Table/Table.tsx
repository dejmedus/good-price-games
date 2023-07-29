import NodeCache from "node-cache";
import { IGame, IStore } from "@/lib/types";
import { columns } from "./Columns";
import { DataTable } from "./Data-Table";

const cache = new NodeCache({ stdTTL: 600 }); // Cache data for 10 minutes (600 seconds)

async function getData(): Promise<IGame[]> {
  try {
    // check for cached data
    const cachedData = cache.get<IGame[]>("gameData");
    if (cachedData) {
      console.log("Data retrieved from cache");
      return cachedData;
    }

    const res = await fetch(
      "https://www.cheapshark.com/api/1.0/deals?onSale=1&pageSize=240",
      {
        method: "GET",
        redirect: "follow",
      }
    );
    const data: IGame[] = await res.json();

    // only show the lowest salePrice copy of each game
    const uniqueGames = Object.values(
      data.reduce((accumulator: { [title: string]: IGame }, currentGame) => {
        if (
          !accumulator[currentGame.title] ||
          parseFloat(currentGame.salePrice) <
            parseFloat(accumulator[currentGame.title].salePrice)
        ) {
          accumulator[currentGame.title] = currentGame;
        }
        return accumulator;
      }, {})
    );

    // cache data
    cache.set("gameData", uniqueGames);

    return uniqueGames;
  } catch (err) {
    console.error("Could not fetch games", err);
    return [];
  }
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container py-10 mx-auto">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
