import NodeCache from "node-cache";
import { IGame, IStore, IGameData } from "@/lib/types";
import { columns } from "./Columns";
import { DataTable } from "./Data-Table";
import storeUrls from "@/lib/stores";

const cache = new NodeCache({ stdTTL: 2400 });

async function getData(): Promise<IGameData[]> {
  try {
    // check for cached data
    const cachedData = cache.get<IGameData[]>("gameData");
    if (cachedData) {
      console.log("Data retrieved from cache");
      return cachedData;
    }

    const res = await fetch(
      "https://www.cheapshark.com/api/1.0/deals?onSale=1&pageSize=800",
      {
        method: "GET",
        redirect: "follow",
      }
    );
    const data: IGame[] = await res.json();

    const storeRes = await fetch("https://www.cheapshark.com/api/1.0/stores", {
      method: "GET",
      redirect: "follow",
    });
    const storeData: IStore[] = await storeRes.json();

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

    // create map of store data
    const storeMap: { [storeID: string]: IStore } = {};
    storeData.forEach((store) => {
      storeMap[store.storeID] = store;
    });

    // create game data objects
    const gameData: IGameData[] = [];
    uniqueGames.forEach((game) => {
      const storeData = storeMap[game.storeID];
      if (storeData) {
        const gameInfo: IGameData = {
          ...game,
          // add url to store data
          storeData: { ...storeData, storeUrl: storeUrls[storeData.storeName] },
        };
        gameData.push(gameInfo);
      }
    });

    // cache data
    cache.set("gameData", gameData);

    return gameData;
  } catch (err) {
    console.error("Could not fetch games", err);
    return [];
  }
}

export default async function DemoPage() {
  const data: IGameData[] = await getData();

  return (
    <div className="container py-10 mx-auto">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
