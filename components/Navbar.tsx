import ToggleTheme from "@/components/ToggleTheme";
import { Gamepad } from "lucide-react";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-2 shadow-md bg-gradient-to-r from-rose-700 to-blue-600">
      <div className="flex items-center gap-2 px-4 text-neutral-100">
        <Gamepad />
        <h1 className="font-bold">Good Price Games</h1>
      </div>
      <ToggleTheme />
    </header>
  );
}
