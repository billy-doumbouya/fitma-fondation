// src/app/(admin)/actualites/[id]/page.js
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { Input, Textarea, Select, Button, Spinner } from "@/components/ui";
import TipTapEditor from "@/components/tiptap/TipTapEditor";

export default function EditArticlePage({ params }) {
  const [article, setArticle] = useState(null);
  const [contenu, setContenu] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [titre, setTitre] = useState("");
  const [extrait, setExtrait] = useState("");
  const [type, setType] = useState("ARTICLE");
  const [publie, setPublie] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/dashboard/actualites/${params.id}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.article) {
          setArticle(d.article);
          setContenu(d.article.contenu || "");
          setTitre(d.article.titre);
          setExtrait(d.article.extrait);
          setType(d.article.type);
          setPublie(d.article.publie);
        }
        setLoading(false);
      });
  }, [params.id]);

  async function onSubmit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`/api/dashboard/actualites/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titre, extrait, contenu, type, publie }),
      });
      if (!res.ok) throw new Error();
      toast.success("Article mis à jour !");
      router.push("/admin/actualites");
    } catch {
      toast.error("Erreur lors de la mise à jour.");
    } finally {
      setSaving(false);
    }
  }

  if (loading)
    return (
      <div className="p-8 flex justify-center">
        <Spinner size="lg" />
      </div>
    );
  if (!article)
    return <div className="p-8 text-center">Article introuvable</div>;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/actualites" className="btn btn-ghost btn-sm">
          <ArrowLeft size={16} />
          Retour
        </Link>
        <h1
          className="font-d font-black text-2xl"
          style={{ color: "var(--encre)" }}
        >
          Modifier l'article
        </h1>
      </div>
      <form onSubmit={onSubmit} className="space-y-6" noValidate>
        <div className="card p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label
                className="block text-sm font-semibold mb-1.5"
                style={{ color: "var(--ardoise)", fontFamily: "var(--font-d)" }}
              >
                Titre *
              </label>
              <input
                value={titre}
                onChange={(e) => setTitre(e.target.value)}
                className="input-f"
                required
              />
            </div>
            <div>
              <label
                className="block text-sm font-semibold mb-1.5"
                style={{ color: "var(--ardoise)", fontFamily: "var(--font-d)" }}
              >
                Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="input-f"
              >
                <option value="ARTICLE">Article</option>
                <option value="COMMUNIQUE">Communiqué</option>
              </select>
            </div>
          </div>
          <div>
            <label
              className="block text-sm font-semibold mb-1.5"
              style={{ color: "var(--ardoise)", fontFamily: "var(--font-d)" }}
            >
              Extrait *
            </label>
            <textarea
              value={extrait}
              onChange={(e) => setExtrait(e.target.value)}
              rows={3}
              className="input-f resize-none"
            />
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={publie}
              onChange={(e) => setPublie(e.target.checked)}
            />
            <span
              className="text-sm font-semibold"
              style={{ color: "var(--ardoise)" }}
            >
              Publié
            </span>
          </label>
        </div>
        <div className="card p-6">
          <h2
            className="font-d font-bold text-lg mb-4"
            style={{ color: "var(--encre)" }}
          >
            Contenu
          </h2>
          <TipTapEditor content={contenu} onChange={setContenu} />
        </div>
        <div className="flex gap-3">
          <Button type="submit" loading={saving} variant="savane" size="lg">
            <Save size={18} />
            Sauvegarder
          </Button>
          <Link href="/admin/actualites" className="btn btn-ghost btn-lg">
            Annuler
          </Link>
          
        </div>
      </form>
    </div>
  );
}
