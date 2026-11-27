"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const liens = [
  { href: "/", label: "Tableau de bord" },
  { href: "/synthese", label: "Synthèse IA" },
  { href: "/projets", label: "Projets et lots" },
  { href: "/ventes", label: "Ventes et clients" },
  { href: "/couts", label: "Coûts et investissement" },
  { href: "/pointage", label: "Pointage RH" },
  { href: "/chantier", label: "App chantier (mobile)" },
  { href: "/import", label: "Import Google Sheets" },
];

export function Nav() {
  const path = usePathname();
  const [ouvert, setOuvert] = useState(false);
  const actif = (h: string) => (h === "/" ? path === "/" : path.startsWith(h));
  return (
    <>
      <header className="lg:hidden sticky top-0 z-20 flex items-center justify-between bg-bordeaux px-4 py-3 text-sable-50">
        <Logo />
        <button className="text-sm underline" onClick={() => setOuvert(!ouvert)} aria-expanded={ouvert}>
          {ouvert ? "Fermer" : "Menu"}
        </button>
      </header>
      <aside
        className={`${ouvert ? "block" : "hidden"} lg:block lg:fixed lg:inset-y-0 lg:left-0 lg:w-64 bg-bordeaux text-sable-50 lg:overflow-y-auto z-10`}
      >
        <div className="hidden lg:block px-6 pt-7 pb-6">
          <Logo />
        </div>
        <nav className="flex flex-col px-3 pb-6 gap-0.5">
          {liens.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOuvert(false)}
              className={`rounded px-3 py-2 text-sm ${actif(l.href) ? "bg-sable text-bordeaux-900 font-semibold" : "hover:bg-bordeaux-700"}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="px-6 pb-6 text-xs text-sable-300">
          Prototype · données d'exemple
          <br />
          Connecté : Direction générale
        </div>
      </aside>
    </>
  );
}

function Logo() {
  return (
    <div className="leading-tight">
      <div className="font-titre text-2xl tracking-wide">Linaz Living</div>
      <div className="text-[10px] uppercase tracking-[0.2em] text-sable">ERP · Pilotage</div>
    </div>
  );
}
