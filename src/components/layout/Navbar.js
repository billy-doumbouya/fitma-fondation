"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Heart,
  ChevronDown,
  User,
  LogOut,
  LayoutDashboard,
  GraduationCap,
  Building2,
  HandHeart,
  Newspaper,
  ArrowRight,
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { NAV_ACADEMY, NAV_ESPACE, NAV_SOUTENIR } from "@/constants";

// Icônes contextuelles par menu — renforcent l'identité visuelle de chaque section
const MENU_ICONS = {
  academy: GraduationCap,
  espace: Building2,
  soutenir: HandHeart,
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [megaMenu, setMegaMenu] = useState(null); // "academy" | "espace" | "soutenir"
  const [scrolled, setScrolled] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const [mobileSection, setMobileSection] = useState(null);
  const pathname = usePathname();
  const { data: session } = useSession();
  const ref = useRef(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMegaMenu(null);
    setMobileSection(null);
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

  // Empêche le scroll du body quand le menu mobile est ouvert
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

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

  const NAV_ROUTES = [
    "/",
    "/a-propos",
    "/academy",
    "/espace",
    "/soutenir",
    "/actualites",
  ];

  const MOBILE_SECTIONS = [
    {
      key: "academy",
      label: "Academy",
      icon: GraduationCap,
      href: "/academy/formations",
      links: NAV_ACADEMY,
    },
    {
      key: "espace",
      label: "Espace",
      icon: Building2,
      href: "/espace",
      links: NAV_ESPACE,
    },
    {
      key: "soutenir",
      label: "Soutenir",
      icon: HandHeart,
      href: "/soutenir/dons",
      links: NAV_SOUTENIR,
    },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(255,255,255,.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
        boxShadow: scrolled
          ? "0 1px 0 rgba(245,240,232,1), 0 8px 24px -12px rgba(120,80,30,0.12)"
          : "none",
      }}
    >
      <div className="container-fitma" ref={ref}>
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <motion.div
              className="relative w-10 h-10"
              whileHover={{ rotate: -8, scale: 1.06 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"
                style={{ background: "var(--savane)" }}
              />
              <Image
                src="/logo/fitma-logo.svg"
                alt="Fondation Fitma"
                fill
                className="object-contain relative z-10"
                priority
              />
            </motion.div>
            <div className="hidden sm:block">
              <span
                className="block font-d text-base font-black leading-tight tracking-tight"
                style={{ color: "var(--savane-d)" }}
              >
                Fondation Fitma
              </span>
              <span
                className="block text-[10px] font-semibold tracking-[0.2em] uppercase"
                style={{ color: "var(--cauri-d)" }}
              >
                fondationfitma.org
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1 relative">
            <NavLink href="/" active={pathname === "/"}>
              Accueil
            </NavLink>
            <NavLink href="/a-propos" active={isActive("/a-propos")}>
              À Propos
            </NavLink>

            {/* Mega menus */}
            {Object.entries(MEGA_MENUS).map(([key, menu]) => {
              const Icon = MENU_ICONS[key];
              return (
                <div key={key} className="relative">
                  <button
                    onMouseEnter={() => setMegaMenu(key)}
                    onClick={() => setMegaMenu(megaMenu === key ? null : key)}
                    className="relative flex items-center gap-1 px-3 py-2 text-sm font-semibold transition-colors rounded-lg"
                    style={{
                      color:
                        isActive(`/${key}`) || megaMenu === key
                          ? "var(--savane-d)"
                          : "var(--ardoise)",
                      fontFamily: "var(--font-d)",
                    }}
                  >
                    {menu.title}
                    <ChevronDown
                      size={14}
                      className="transition-transform duration-300"
                      style={{
                        transform:
                          megaMenu === key ? "rotate(180deg)" : "rotate(0)",
                      }}
                    />
                    {(isActive(`/${key}`) || megaMenu === key) && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute left-3 right-3 -bottom-0.5 h-[2px] rounded-full"
                        style={{ background: "var(--savane)" }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                  </button>

                  <AnimatePresence>
                    {megaMenu === key && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                        onMouseLeave={() => setMegaMenu(null)}
                        className="absolute top-full left-0 mt-3 w-72 rounded-2xl overflow-hidden z-50"
                        style={{
                          background: "white",
                          boxShadow:
                            "0 20px 40px -12px rgba(120,80,30,0.18), 0 4px 12px -4px rgba(0,0,0,0.05)",
                          border: "1px solid #F5F0E8",
                        }}
                      >
                        <div
                          className="relative p-4 overflow-hidden"
                          style={{
                            background:
                              "linear-gradient(135deg, var(--savane-pale) 0%, #FFFDFA 100%)",
                            borderBottom: "1px solid #F5F0E8",
                          }}
                        >
                          {/* Motif décoratif subtil */}
                          <svg
                            className="absolute -right-4 -top-4 opacity-[0.06]"
                            width="100"
                            height="100"
                            viewBox="0 0 100 100"
                          >
                            <path
                              d="M50 5 L95 50 L50 95 L5 50 Z"
                              fill="var(--savane)"
                            />
                          </svg>
                          <div className="relative flex items-center gap-3">
                            <div
                              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                              style={{
                                background: "var(--savane)",
                                color: "white",
                              }}
                            >
                              <Icon size={18} strokeWidth={2.2} />
                            </div>
                            <div>
                              <p
                                className="font-d font-bold text-sm leading-tight"
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
                          </div>
                        </div>
                        <div className="p-2">
                          {menu.links.map((l, idx) => (
                            <motion.div
                              key={l.href}
                              initial={{ opacity: 0, x: -6 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.03 }}
                            >
                              <Link
                                href={l.href}
                                className="group flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-sm transition-all duration-200"
                                style={{
                                  color: "var(--ardoise)",
                                  fontFamily: "var(--font-d)",
                                  fontWeight: 500,
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background =
                                    "var(--savane-pale)";
                                  e.currentTarget.style.color =
                                    "var(--savane-d)";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background =
                                    "transparent";
                                  e.currentTarget.style.color =
                                    "var(--ardoise)";
                                }}
                              >
                                <span className="flex items-center gap-2">
                                  <span
                                    className="w-1.5 h-1.5 rounded-full shrink-0"
                                    style={{ background: "var(--savane)" }}
                                  />
                                  {l.label}
                                </span>
                                <ArrowRight
                                  size={13}
                                  className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                                />
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            <NavLink href="/actualites" active={isActive("/actualites")}>
              Actualités
            </NavLink>
          </div>

          {/* Actions droite */}
          <div className="flex items-center gap-2">
            {/* Espace membre */}
            {session ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenu(!userMenu)}
                  className="flex items-center gap-2 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl text-sm font-semibold transition-all duration-200"
                  style={{
                    background: userMenu
                      ? "var(--savane)"
                      : "var(--savane-pale)",
                    color: userMenu ? "white" : "var(--savane-d)",
                    fontFamily: "var(--font-d)",
                  }}
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                    style={{
                      background: userMenu
                        ? "rgba(255,255,255,0.25)"
                        : "var(--savane)",
                    }}
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
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute top-full right-0 mt-2 w-56 rounded-2xl overflow-hidden z-50"
                      style={{
                        background: "white",
                        boxShadow:
                          "0 20px 40px -12px rgba(120,80,30,0.18), 0 4px 12px -4px rgba(0,0,0,0.05)",
                        border: "1px solid #F5F0E8",
                      }}
                    >
                      <div
                        className="p-3.5 flex items-center gap-3"
                        style={{
                          background: "var(--savane-pale)",
                          borderBottom: "1px solid #F5F0E8",
                        }}
                      >
                        <div
                          className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                          style={{ background: "var(--savane)" }}
                        >
                          {session.user?.name?.[0] || "M"}
                        </div>
                        <div className="overflow-hidden">
                          <p
                            className="font-semibold text-sm truncate"
                            style={{ color: "var(--encre)" }}
                          >
                            {session.user?.name}
                          </p>
                          <p
                            className="text-xs truncate"
                            style={{ color: "var(--brume)" }}
                          >
                            {session.user?.email}
                          </p>
                        </div>
                      </div>
                      <div className="p-2">
                        {session.user?.role === "ADMIN" ? (
                          <Link
                            href="/admin/dashboard"
                            className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors"
                            style={{
                              color: "var(--ardoise)",
                              fontFamily: "var(--font-d)",
                            }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.background =
                                "var(--savane-pale)")
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.background = "transparent")
                            }
                          >
                            <LayoutDashboard size={15} />
                            Admin
                          </Link>
                        ) : (
                          <Link
                            href="/membre/dashboard"
                            className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors"
                            style={{
                              color: "var(--ardoise)",
                              fontFamily: "var(--font-d)",
                            }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.background =
                                "var(--savane-pale)")
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.background = "transparent")
                            }
                          >
                            <LayoutDashboard size={15} />
                            Mon espace
                          </Link>
                        )}
                        <button
                          onClick={() => signOut({ callbackUrl: "/" })}
                          className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors text-left"
                          style={{
                            color: "var(--error)",
                            fontFamily: "var(--font-d)",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.background = "#FEF2F2")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.background = "transparent")
                          }
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
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-colors duration-200"
                style={{
                  background: "var(--savane-pale)",
                  color: "var(--savane-d)",
                  fontFamily: "var(--font-d)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#F0E4D4")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "var(--savane-pale)")
                }
              >
                <User size={15} />
                Connexion
              </Link>
            )}

            {/* Don CTA */}
            <Link
              href="/soutenir/dons"
              className="btn btn-cauri btn-sm hidden sm:inline-flex relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <Heart
                  size={14}
                  className="group-hover:scale-110 transition-transform"
                />
                Faire un don
              </span>
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.35) 50%, transparent 70%)",
                }}
              />
            </Link>

            {/* Burger */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl transition-colors duration-200"
              style={{
                background: open ? "var(--savane)" : "var(--sable)",
                color: open ? "white" : "var(--ardoise)",
              }}
              aria-label="Menu"
            >
              <motion.div
                animate={{ rotate: open ? 90 : 0 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
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
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden overflow-hidden"
            style={{
              background: "rgba(255,255,255,.98)",
              backdropFilter: "blur(20px)",
              borderTop: "1px solid #F5F0E8",
            }}
          >
            <div className="container-fitma py-4 flex flex-col gap-1 max-h-[80vh] overflow-y-auto">
              {/* Liens simples */}
              {[
                { label: "Accueil", href: "/" },
                { label: "À Propos", href: "/a-propos" },
              ].map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <Link
                    href={l.href}
                    className="flex items-center px-4 py-3 rounded-xl text-[15px] font-semibold transition-all"
                    style={{
                      background:
                        isActive(l.href) && (l.href !== "/" || pathname === "/")
                          ? "var(--savane-pale)"
                          : "transparent",
                      color:
                        isActive(l.href) && (l.href !== "/" || pathname === "/")
                          ? "var(--savane-d)"
                          : "var(--ardoise)",
                      fontFamily: "var(--font-d)",
                    }}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}

              {/* Sections accordéon */}
              {MOBILE_SECTIONS.map((section, i) => {
                const Icon = section.icon;
                const isOpenSection = mobileSection === section.key;
                return (
                  <motion.div
                    key={section.key}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (i + 2) * 0.03 }}
                    className="rounded-xl overflow-hidden"
                    style={{
                      background: isOpenSection
                        ? "var(--savane-pale)"
                        : "transparent",
                    }}
                  >
                    <button
                      onClick={() =>
                        setMobileSection(isOpenSection ? null : section.key)
                      }
                      className="w-full flex items-center justify-between px-4 py-3 text-[15px] font-semibold"
                      style={{
                        color:
                          isOpenSection || isActive(`/${section.key}`)
                            ? "var(--savane-d)"
                            : "var(--ardoise)",
                        fontFamily: "var(--font-d)",
                      }}
                    >
                      <span className="flex items-center gap-2.5">
                        <Icon size={17} strokeWidth={2.2} />
                        {section.label}
                      </span>
                      <ChevronDown
                        size={16}
                        className="transition-transform duration-300"
                        style={{
                          transform: isOpenSection
                            ? "rotate(180deg)"
                            : "rotate(0)",
                        }}
                      />
                    </button>
                    <AnimatePresence>
                      {isOpenSection && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="pb-2 px-2 flex flex-col gap-0.5">
                            {section.links.map((l) => (
                              <Link
                                key={l.href}
                                href={l.href}
                                className="flex items-center gap-2 pl-7 pr-3 py-2.5 rounded-lg text-sm transition-colors"
                                style={{
                                  color: "var(--ardoise)",
                                  fontFamily: "var(--font-d)",
                                  fontWeight: 500,
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
                  </motion.div>
                );
              })}

              {/* Actualités */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 5 * 0.03 }}
              >
                <Link
                  href="/actualites"
                  className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-[15px] font-semibold transition-all"
                  style={{
                    background: isActive("/actualites")
                      ? "var(--savane-pale)"
                      : "transparent",
                    color: isActive("/actualites")
                      ? "var(--savane-d)"
                      : "var(--ardoise)",
                    fontFamily: "var(--font-d)",
                  }}
                >
                  <Newspaper size={17} strokeWidth={2.2} />
                  Actualités
                </Link>
              </motion.div>

              {/* Espace connexion / membre + CTA */}
              <div
                className="mt-3 pt-4 flex flex-col gap-2.5"
                style={{ borderTop: "1px solid #F5F0E8" }}
              >
                {session ? (
                  <>
                    <div
                      className="flex items-center gap-3 px-4 py-3 rounded-xl"
                      style={{ background: "var(--savane-pale)" }}
                    >
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                        style={{ background: "var(--savane)" }}
                      >
                        {session.user?.name?.[0] || "M"}
                      </div>
                      <div className="overflow-hidden">
                        <p
                          className="font-semibold text-sm truncate"
                          style={{ color: "var(--encre)" }}
                        >
                          {session.user?.name}
                        </p>
                        <p
                          className="text-xs truncate"
                          style={{ color: "var(--brume)" }}
                        >
                          {session.user?.email}
                        </p>
                      </div>
                    </div>
                    <Link
                      href={
                        session.user?.role === "ADMIN"
                          ? "/admin/dashboard"
                          : "/membre/dashboard"
                      }
                      className="btn btn-outline-savane w-full justify-center"
                    >
                      <LayoutDashboard size={15} />
                      {session.user?.role === "ADMIN" ? "Admin" : "Mon espace"}
                    </Link>
                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold"
                      style={{
                        color: "var(--error)",
                        fontFamily: "var(--font-d)",
                      }}
                    >
                      <LogOut size={15} />
                      Déconnexion
                    </button>
                  </>
                ) : (
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

/* Lien de navigation desktop avec indicateur actif animé (layoutId partagé) */
function NavLink({ href, active, children }) {
  return (
    <Link
      href={href}
      className="relative px-3 py-2 text-sm font-semibold transition-colors rounded-lg"
      style={{
        color: active ? "var(--savane-d)" : "var(--ardoise)",
        fontFamily: "var(--font-d)",
      }}
    >
      {children}
      {active && (
        <motion.span
          layoutId="nav-underline"
          className="absolute left-3 right-3 -bottom-0.5 h-[2px] rounded-full"
          style={{ background: "var(--savane)" }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
    </Link>
  );
}
