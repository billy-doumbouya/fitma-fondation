// src/app/(auth)/login/page.js
"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import { LogIn } from "lucide-react";
import { Input, Button } from "@/components/ui";
import { loginSchema } from "@/schemas";

/* Motif géométrique inline (Adinkra) — currentColor only */
function MotifAdinkra({ className, color = "#fff" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 240 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="adinkraLogin"
          width="60"
          height="60"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M0 30 L30 0 L60 30 L30 60 Z"
            stroke={color}
            strokeWidth="1.5"
            fill="none"
          />
          <circle cx="30" cy="30" r="3.5" fill={color} />
          <path d="M0 0 L8 0 L0 8 Z" fill={color} />
          <path d="M60 60 L52 60 L60 52 Z" fill={color} />
        </pattern>
      </defs>
      <rect width="240" height="240" fill="url(#adinkraLogin)" />
    </svg>
  );
}

const normalizeRedirect = (value) => {
  if (!value || typeof value !== "string") return "/";
  if (!value.startsWith("/")) return "/";
  if (value === "/member") return "/membre";
  if (value.startsWith("/member/"))
    return value.replace(/^\/member/, "/membre");
  return value;
};

export default function LoginPage() {
  const [googleLoading, setGoogleLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = normalizeRedirect(searchParams.get("redirect")) || "/";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const onSubmit = async (data) => {
    const res = await signIn("credentials", {
      email: data.email,
      motDePasse: data.motDePasse,
      redirect: false,
    });
    if (res?.ok) {
      toast.success("Connexion réussie !");
      router.push(redirect);
    } else toast.error("Email ou mot de passe incorrect.");
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    await signIn("google", { callbackUrl: redirect });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-16 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg,var(--savane-pale),var(--cauri-pale))",
      }}
    >
      {/* ---------------- FORMES ORGANIQUES ANIMÉES ---------------- */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          top: "-15%",
          left: "-10%",
          width: 420,
          height: 420,
          borderRadius: "42% 58% 60% 40% / 50% 45% 55% 50%",
          background: "var(--savane)",
          opacity: 0.08,
        }}
        animate={{
          scale: [1, 1.08, 1],
          rotate: [0, 8, 0],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute pointer-events-none"
        style={{
          bottom: "-18%",
          right: "-12%",
          width: 480,
          height: 480,
          borderRadius: "55% 45% 40% 60% / 48% 52% 48% 52%",
          background: "var(--cauri-l)",
          opacity: 0.1,
        }}
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, -10, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <MotifAdinkra
        className="absolute top-8 right-8 w-40 h-40 opacity-[0.06] pointer-events-none"
        color="var(--savane)"
      />
      <MotifAdinkra
        className="absolute bottom-8 left-8 w-32 h-32 opacity-[0.05] pointer-events-none rotate-45"
        color="var(--cauri-d)"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: 0.1,
                duration: 0.5,
                type: "spring",
                bounce: 0.35,
              }}
            >
              <Image
                src="/logo/fitma-logo.svg"
                alt="Fitma"
                width={500}
                height={500}
                className="mx-auto mb-4"
                priority
              />
            </motion.div>
          </Link>
          <h1
            className="font-d font-black text-2xl"
            style={{ color: "var(--encre)" }}
          >
            Connexion
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--ardoise)" }}>
            Accédez à votre espace Fitma
          </p>
        </div>

        <div className="card p-6 sm:p-8">
          {/* Google */}
          <Button
            onClick={handleGoogle}
            loading={googleLoading}
            variant="ghost"
            fullWidth
            className="border mb-4"
            style={{ borderColor: "#E0E0E0" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continuer avec Google
          </Button>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px" style={{ background: "#E0E0E0" }} />
            <span className="text-xs" style={{ color: "var(--brume)" }}>
              ou
            </span>
            <div className="flex-1 h-px" style={{ background: "#E0E0E0" }} />
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
            noValidate
          >
            <Input
              label="Email"
              type="email"
              placeholder="mamadou@email.com"
              required
              error={errors.email?.message}
              {...register("email")}
            />
            <Input
              label="Mot de passe"
              type="password"
              placeholder="••••••••"
              required
              error={errors.motDePasse?.message}
              {...register("motDePasse")}
            />
            <div className="text-right">
              <Link
                href="/mot-de-passe-oublie"
                className="text-xs"
                style={{ color: "var(--savane)" }}
              >
                Mot de passe oublié ?
              </Link>
            </div>
            <Button
              type="submit"
              loading={isSubmitting}
              variant="savane"
              fullWidth
              size="lg"
            >
              <span className="inline-flex items-center justify-center gap-2">
                <LogIn size={18} />
                Se connecter
              </span>
            </Button>
          </form>

          <p
            className="text-center text-sm mt-5"
            style={{ color: "var(--ardoise)" }}
          >
            Pas encore de compte ?{" "}
            <Link
              href="/inscription"
              className="font-semibold"
              style={{ color: "var(--savane)" }}
            >
              S'inscrire
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
