"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface IGame {
  internalName: string;
  title: string;
  metacriticLink: string;
  dealID: string;
  storeID: string;
  gameID: string;
  salePrice: string;
  normalPrice: string;
  isOnSale: string;
  savings: string;
  metacriticScore: string;
  steamRatingText: string;
  steamRatingPercent: string;
  steamRatingCount: string;
  steamAppID: string;
  releaseDate: number;
  lastChange: number;
  dealRating: string;
  thumb: string;
}

export const columns: ColumnDef<IGame>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "salePrice",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("salePrice"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);

      return <div>{formatted !== "$0.00" ? formatted : "Free"}</div>;
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: "normalPrice",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("normalPrice"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);

      return <div className="line-through">{formatted}</div>;
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Regular
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: "savings",
    cell: ({ row }) => {
      const savings = parseFloat(row.getValue("savings"));

      return <div>{`${Math.round(savings)}%`}</div>;
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Savings
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const game = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-8 h-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(game.gameID)}
            >
              Copy game ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {game.steamAppID !== "" ? (
              <DropdownMenuItem>
                <a
                  target="_blank"
                  href={`http://store.steampowered.com/app/${game.steamAppID}/`}
                >
                  View on Steam
                </a>
              </DropdownMenuItem>
            ) : null}
            <DropdownMenuItem>
              <a
                target="_blank"
                href={`https://www.cheapshark.com/redirect?dealID=${game.dealID}`}
              >
                View on CheapShark
              </a>
            </DropdownMenuItem>
            {game.metacriticLink !== "" ? (
              <DropdownMenuItem>
                <a
                  target="_blank"
                  href={`https://metacritic.com/${game.metacriticLink}`}
                >
                  View on Metacritic
                </a>
              </DropdownMenuItem>
            ) : null}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  //   {
  //     accessorKey: "steamRatingPercent",
  //     cell: ({ row }) => {
  //       const rating = parseFloat(row.getValue("steamRatingPercent"));

  //       return <div>{rating === 0 ? "" : `${rating}%`}</div>;
  //     },
  //     header: "Steam Rating",
  //   },
  //   {
  //     accessorKey: "metacriticScore",
  //     cell: ({ row }) => {
  //       const rating = parseFloat(row.getValue("metacriticScore"));

  //       return <div>{rating === 0 ? "" : `${rating}/100`}</div>;
  //     },
  //     header: "Metacritic Score",
  //   },
];
