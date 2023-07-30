import Table from "@/components/Table/Table";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen pt-12 pb-4">
      <h2 className="text-2xl font-semibold">Good Price Games</h2>
      <p className="text-neutral-600 dark:text-neutral-400">
        Find the best sales on the best games
      </p>
      <Table />
    </main>
  );
}
