import Link from "next/link";
import Image from "next/image";
import { Gem } from "lucide-react";

import { cn } from "@/lib/utils";

export const Logo = () => {
  return (
    <Link href="/">
      <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex">
      <Gem size={32} color="#7f1d1d" />
        <p className={cn(
          "text-lg text-black pb-1",
        )}>
          Matrimony Mall
        </p>
      </div>
    </Link>
  );
};