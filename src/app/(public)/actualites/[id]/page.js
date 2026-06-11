// src/app/(public)/actualites/[id]/page.js
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui";
export async function generateMetadata({ params }) {
  const a = await prisma.article.findUnique({ where: { id: params.id } });
  if (!a) return {};
  return { title: `${a.titre} | Fondation Fitma`, description: a.extrait };
}
export default async function ArticleDetailPage({ params }) {
  const article = await prisma.article.findUnique({
    where: { id: params.id, publie: true },
  });
  if (!article) notFound();
  return (
    <main className="pt-20">
      <div className="relative h-64 sm:h-80 overflow-hidden">
        {article.imageUrl ? (
          <Image
            src={article.imageUrl}
            alt={article.titre}
            fill
            className="object-cover"
          />
        ) : (
          <div
            className="w-full h-full"
            style={{
              background: "linear-gradient(135deg,var(--savane-d),var(--nuit))",
            }}
          />
        )}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top,rgba(0,0,0,.7),transparent)",
          }}
        />
        <div className="absolute bottom-6 container-fitma w-full left-1/2 -translate-x-1/2">
          <Badge
            variant={article.type === "COMMUNIQUE" ? "nuit" : "savane"}
            className="mb-3"
          >
            {article.type === "COMMUNIQUE" ? "Communiqué" : "Article"}
          </Badge>
          <p className="text-white/70 text-sm mb-2">
            {formatDate(article.createdAt)}
          </p>
          <h1 className="font-d font-black text-2xl sm:text-4xl text-white">
            {article.titre}
          </h1>
        </div>
      </div>
      <div className="container-fitma py-12">
        <div className="max-w-3xl mx-auto">
          <div
            className="prose-fitma"
            dangerouslySetInnerHTML={{ __html: article.contenu }}
          />
          <div
            className="mt-10 pt-8"
            style={{ borderTop: "1px solid #F5F0E8" }}
          >
            <Link href="/actualites" className="btn btn-outline-savane btn-sm">
              ← Retour aux actualités
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
