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
import { IGameData } from "@/lib/types";

export const columns: ColumnDef<IGameData>[] = [
  {
    accessorKey: "thumb",
    cell: ({ row }) => {
      const game = row.original;

      return (
        <img
          className="w-24"
          src={game.thumb}
          alt={`${game.title} thumbnail`}
        />
      );
    },
    header: "",
  },
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

      return formatted !== "$0.00" ? (
        <div className="text-center">{formatted}</div>
      ) : (
        <div className="font-medium text-center text-blue-500">Free</div>
      );
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

      return <div className="text-center line-through">{formatted}</div>;
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

      return <div className="text-center">{`${Math.round(savings)}%`}</div>;
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
    accessorKey: "storeData",
    cell: ({ row }) => {
      const game = row.original;
      const url = game.storeData.storeUrl;

      return (
        <a
          className="text-center"
          target="_blank"
          href={
            url ? url : `http://store.steampowered.com/app/${game.steamAppID}/`
          }
        >
          <span className="sr-only">View in Store</span>
          <img
            className="w-24"
            src={`https://www.cheapshark.com${game.storeData.images.logo}`}
            alt={game.storeData.storeName}
          />
        </a>
      );
    },
    header: "",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const game = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="p-1">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="w-8 h-8" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {game.steamRatingPercent !== "0" ? (
              <>
                <DropdownMenuLabel>
                  Steam Rating: {game.steamRatingPercent}%
                </DropdownMenuLabel>
                <DropdownMenuItem>
                  <a
                    target="_blank"
                    href={`http://store.steampowered.com/app/${game.steamAppID}/`}
                  >
                    View on Steam
                  </a>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </>
            ) : null}
            {game.metacriticScore !== "0" ? (
              <>
                <DropdownMenuLabel>
                  Metacritic Score: {game.metacriticScore}
                </DropdownMenuLabel>
                <DropdownMenuItem>
                  <a
                    target="_blank"
                    href={`https://metacritic.com/${game.metacriticLink}`}
                  >
                    View on Metacritic
                  </a>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </>
            ) : null}
            <DropdownMenuItem>
              <a
                target="_blank"
                href={`https://www.cheapshark.com/redirect?dealID=${game.dealID}`}
              >
                View on CheapShark
              </a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
