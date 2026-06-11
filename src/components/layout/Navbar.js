"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Heart,
  ChevronDown,
  User,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { NAV_ACADEMY, NAV_ESPACE, NAV_SOUTENIR } from "@/constants";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [megaMenu, setMegaMenu] = useState(null); // "academy" | "espace" | "soutenir"
  const [scrolled, setScrolled] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  const ref = useRef(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMegaMenu(null);
  }, [pathname]);

  useEffect(() => {
    const fn = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setMegaMenu(null);
        setUserMenu(false);
      }
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const isActive = (href) => pathname.startsWith(href);

  const MEGA_MENUS = {
    academy: {
      title: "Fitma Academy",
      desc: "Formation · Incubation · Accélération",
      links: NAV_ACADEMY,
    },
    espace: {
      title: "Fitma Espace",
      desc: "Coworking · Bureaux · Salles",
      links: NAV_ESPACE,
    },
    soutenir: {
      title: "Soutenir",
      desc: "Dons · Partenariats · Mécénat",
      links: NAV_SOUTENIR,
    },
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(255,255,255,.97)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        boxShadow: scrolled ? "var(--sh-sm)" : "none",
        borderBottom: scrolled ? "1px solid #F5F0E8" : "none",
      }}
    >
      <div className="container-fitma" ref={ref}>
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="relative w-10 h-10">
              <Image
                src="/logo/fitma-logo.svg"
                alt="Fondation Fitma"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <span
                className="block font-d text-base font-black leading-tight"
                style={{ color: "var(--savane-d)" }}
              >
                Fondation Fitma
              </span>
              <span
                className="block text-[10px] tracking-widest uppercase"
                style={{ color: "var(--cauri-d)" }}
              >
                fondationfitma.org
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            <Link
              href="/"
              className="px-3 py-2 text-sm font-semibold transition-colors rounded-lg"
              style={{
                color: pathname === "/" ? "var(--savane)" : "var(--ardoise)",
                fontFamily: "var(--font-d)",
              }}
            >
              Accueil
            </Link>
            <Link
              href="/a-propos"
              className="px-3 py-2 text-sm font-semibold transition-colors rounded-lg"
              style={{
                color: isActive("/a-propos")
                  ? "var(--savane)"
                  : "var(--ardoise)",
                fontFamily: "var(--font-d)",
              }}
            >
              À Propos
            </Link>

            {/* Mega menus */}
            {Object.entries(MEGA_MENUS).map(([key, menu]) => (
              <div key={key} className="relative">
                <button
                  onMouseEnter={() => setMegaMenu(key)}
                  onClick={() => setMegaMenu(megaMenu === key ? null : key)}
                  className="flex items-center gap-1 px-3 py-2 text-sm font-semibold transition-colors rounded-lg"
                  style={{
                    color: isActive(`/${key}`)
                      ? "var(--savane)"
                      : "var(--ardoise)",
                    fontFamily: "var(--font-d)",
                  }}
                >
                  {menu.title}
                  <ChevronDown
                    size={14}
                    className="transition-transform"
                    style={{
                      transform:
                        megaMenu === key ? "rotate(180deg)" : "rotate(0)",
                    }}
                  />
                </button>

                <AnimatePresence>
                  {megaMenu === key && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      onMouseLeave={() => setMegaMenu(null)}
                      className="absolute top-full left-0 mt-2 w-64 rounded-2xl overflow-hidden z-50"
                      style={{
                        background: "white",
                        boxShadow: "var(--sh-lg)",
                        border: "1px solid #F5F0E8",
                      }}
                    >
                      <div
                        className="p-4 border-b"
                        style={{
                          borderColor: "#F5F0E8",
                          background: "var(--savane-pale)",
                        }}
                      >
                        <p
                          className="font-d font-bold text-sm"
                          style={{ color: "var(--savane-d)" }}
                        >
                          {menu.title}
                        </p>
                        <p
                          className="text-xs mt-0.5"
                          style={{ color: "var(--ardoise)" }}
                        >
                          {menu.desc}
                        </p>
                      </div>
                      <div className="p-2">
                        {menu.links.map((l) => (
                          <Link
                            key={l.href}
                            href={l.href}
                            className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm transition-all"
                            style={{
                              color: "var(--ardoise)",
                              fontFamily: "var(--font-d)",
                              fontWeight: 500,
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background =
                                "var(--savane-pale)";
                              e.currentTarget.style.color = "var(--savane-d)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "transparent";
                              e.currentTarget.style.color = "var(--ardoise)";
                            }}
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full shrink-0"
                              style={{ background: "var(--savane)" }}
                            />
                            {l.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            <Link
              href="/actualites"
              className="px-3 py-2 text-sm font-semibold transition-colors rounded-lg"
              style={{
                color: isActive("/actualites")
                  ? "var(--savane)"
                  : "var(--ardoise)",
                fontFamily: "var(--font-d)",
              }}
            >
              Actualités
            </Link>
          </div>

          {/* Actions droite */}
          <div className="flex items-center gap-2">
            {/* Espace membre */}
            {session ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenu(!userMenu)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-colors"
                  style={{
                    background: "var(--savane-pale)",
                    color: "var(--savane-d)",
                    fontFamily: "var(--font-d)",
                  }}
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{ background: "var(--savane)" }}
                  >
                    {session.user?.name?.[0] || "M"}
                  </div>
                  <span className="hidden sm:block">
                    {session.user?.name?.split(" ")[0]}
                  </span>
                </button>
                <AnimatePresence>
                  {userMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute top-full right-0 mt-2 w-52 rounded-2xl overflow-hidden z-50"
                      style={{
                        background: "white",
                        boxShadow: "var(--sh-lg)",
                        border: "1px solid #F5F0E8",
                      }}
                    >
                      <div
                        className="p-3 border-b"
                        style={{ borderColor: "#F5F0E8" }}
                      >
                        <p
                          className="font-semibold text-sm"
                          style={{ color: "var(--encre)" }}
                        >
                          {session.user?.name}
                        </p>
                        <p
                          className="text-xs"
                          style={{ color: "var(--brume)" }}
                        >
                          {session.user?.email}
                        </p>
                      </div>
                      <div className="p-2">
                        {session.user?.role === "ADMIN" ? (
                          <Link
                            href="/admin/dashboard"
                            className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-colors"
                            style={{ color: "var(--ardoise)" }}
                          >
                            <LayoutDashboard size={15} />
                            Admin
                          </Link>
                        ) : (
                          <Link
                            href="/membre/dashboard"
                            className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-colors"
                            style={{ color: "var(--ardoise)" }}
                          >
                            <LayoutDashboard size={15} />
                            Mon espace
                          </Link>
                        )}
                        <button
                          onClick={() => signOut({ callbackUrl: "/" })}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-colors text-left"
                          style={{ color: "var(--error)" }}
                        >
                          <LogOut size={15} />
                          Déconnexion
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold"
                style={{
                  background: "var(--savane-pale)",
                  color: "var(--savane-d)",
                  fontFamily: "var(--font-d)",
                }}
              >
                <User size={15} />
                Connexion
              </Link>
            )}

            {/* Don CTA */}
            <Link
              href="/soutenir/dons"
              className="btn btn-cauri btn-sm animate-pulse-g hidden sm:inline-flex"
            >
              <Heart size={14} />
              Faire un don
            </Link>

            {/* Burger */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl transition-colors"
              style={{
                background: open ? "var(--savane)" : "var(--sable)",
                color: open ? "white" : "var(--ardoise)",
              }}
            >
              <motion.div
                animate={{ rotate: open ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {open ? <X size={20} /> : <Menu size={20} />}
              </motion.div>
            </button>
          </div>
        </nav>
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden"
            style={{
              background: "rgba(255,255,255,.98)",
              backdropFilter: "blur(16px)",
              borderTop: "1px solid #F5F0E8",
            }}
          >
            <div className="container-fitma py-4 flex flex-col gap-1 max-h-[75vh] overflow-y-auto">
              {[
                { label: "Accueil", href: "/" },
                { label: "À Propos", href: "/a-propos" },
                { label: "— Academy", href: "/academy/formations", sub: true },
                { label: "Formations", href: "/academy/formations", sub: true },
                { label: "Incubation", href: "/academy/incubation", sub: true },
                {
                  label: "Accélération",
                  href: "/academy/acceleration",
                  sub: true,
                },
                { label: "Lauréats", href: "/academy/laureats", sub: true },
                { label: "— Espace", href: "/espace", sub: true },
                { label: "Coworking", href: "/espace/coworking", sub: true },
                { label: "Bureaux", href: "/espace/bureaux", sub: true },
                { label: "Salles", href: "/espace/salles", sub: true },
                { label: "— Soutenir", href: "/soutenir/dons", sub: true },
                { label: "Faire un don", href: "/soutenir/dons", sub: true },
                {
                  label: "Partenaire",
                  href: "/soutenir/partenaire",
                  sub: true,
                },
                { label: "Actualités", href: "/actualites" },
                { label: "Contact", href: "/contact" },
              ].map((l, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.02 }}
                >
                  <Link
                    href={l.href}
                    className="flex items-center px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
                    style={{
                      background:
                        pathname === l.href
                          ? "var(--savane-pale)"
                          : "transparent",
                      color: l.label.startsWith("—")
                        ? "var(--brume)"
                        : pathname === l.href
                          ? "var(--savane-d)"
                          : "var(--ardoise)",
                      paddingLeft: l.sub ? "1.75rem" : "1rem",
                      fontFamily: "var(--font-d)",
                      fontSize: l.label.startsWith("—") ? "11px" : "14px",
                      letterSpacing: l.label.startsWith("—") ? "0.05em" : "0",
                      textTransform: l.label.startsWith("—")
                        ? "uppercase"
                        : "none",
                    }}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <div
                className="mt-3 pt-3 flex flex-col gap-2"
                style={{ borderTop: "1px solid #F5F0E8" }}
              >
                {!session && (
                  <Link
                    href="/login"
                    className="btn btn-outline-savane w-full justify-center"
                  >
                    <User size={15} />
                    Connexion
                  </Link>
                )}
                <Link
                  href="/soutenir/dons"
                  className="btn btn-cauri w-full justify-center"
                >
                  <Heart size={15} />
                  Faire un don
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
