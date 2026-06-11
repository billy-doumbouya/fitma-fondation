import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export const authOptions = {
  providers: [
    // Google OAuth
    GoogleProvider({
      clientId:     process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    // Email + Password
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email:      { label: "Email",        type: "email"    },
        motDePasse: { label: "Mot de passe", type: "password" },
        isAdmin:    { label: "Admin",        type: "text"     },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.motDePasse) return null

        // Connexion admin
        if (credentials.isAdmin === "true") {
          const admin = await prisma.admin.findUnique({ where: { email: credentials.email } })
          if (!admin) return null
          const ok = await bcrypt.compare(credentials.motDePasse, admin.password)
          if (!ok) return null
          return { id: admin.id, email: admin.email, name: "Admin", role: "ADMIN" }
        }

        // Connexion membre
        const user = await prisma.utilisateur.findUnique({ where: { email: credentials.email } })
        if (!user || !user.password) return null
        if (!user.actif) throw new Error("Compte désactivé")
        const ok = await bcrypt.compare(credentials.motDePasse, user.password)
        if (!ok) return null
        return { id: user.id, email: user.email, name: `${user.prenom} ${user.nom}`, role: user.role, avatar: user.avatar }
      },
    }),
  ],

  session: { strategy: "jwt" },
  pages: { signIn: "/login", error: "/login" },

  callbacks: {
    async signIn({ user, account }) {
      // Connexion Google — créer/récupérer le membre
      if (account?.provider === "google") {
        const existing = await prisma.utilisateur.findFirst({
          where: { OR: [{ email: user.email }, { googleId: user.id }] },
        })
        if (!existing) {
          const parts = (user.name || "").split(" ")
          await prisma.utilisateur.create({
            data: {
              email:    user.email,
              prenom:   parts[0] || "",
              nom:      parts.slice(1).join(" ") || "",
              avatar:   user.image,
              googleId: user.id,
              role:     "MEMBRE",
            },
          })
        } else if (!existing.googleId) {
          await prisma.utilisateur.update({ where: { id: existing.id }, data: { googleId: user.id, avatar: user.image } })
        }
      }
      return true
    },

    async jwt({ token, user }) {
      if (user) {
        token.id   = user.id
        token.role = user.role || "MEMBRE"
      }
      return token
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id   = token.id
        session.user.role = token.role
      }
      return session
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
}
