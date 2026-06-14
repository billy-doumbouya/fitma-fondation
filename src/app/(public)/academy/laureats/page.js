import { prisma } from "@/lib/prisma";
import { SectionTitle, Badge } from "@/components/ui";
import { LAUREATS_PLACEHOLDER } from "@/constants/placeholders";

export const metadata = { title: "Lauréats | Fitma Academy" };

export default async function LaureatsPage() {
  let laureats = [];
  try {
    laureats = await prisma.laureats.findMany({
      orderBy: { promotion: "desc" },
    });
  } catch {}
  const data = laureats.length > 0 ? laureats : LAUREATS_PLACEHOLDER;

  return (
    <main className="pt-20">
      <section className="section section-savane">
        <div className="container-fitma text-center">
          <h1 className="text-h1 text-white mb-4">Nos Lauréats</h1>
          <p className="text-white/75 max-w-xl mx-auto">
            Des entrepreneurs qui ont fait confiance à Fitma pour transformer
            leurs idées en startups florissantes.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container-fitma">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.map((l, i) => (
              <motion.div
                key={l.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="card p-6 text-center overflow-hidden"
              >
                <div className="relative mx-auto mb-4 h-28 w-28 rounded-full overflow-hidden border-4 border-white/15 shadow-[0_24px_60px_rgba(0,0,0,0.14)]">
                  <Image
                    src={l.image}
                    alt={l.nom}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </div>
                <h3
                  className="font-d font-bold text-base mb-1"
                  style={{ color: "var(--encre)" }}
                >
                  {l.nom}
                </h3>
                <p
                  className="text-sm font-semibold mb-2"
                  style={{ color: "var(--savane)" }}
                >
                  {l.startup}
                </p>
                {l.promotion && (
                  <Badge variant="gris" className="mb-3">
                    Promotion {l.promotion}
                  </Badge>
                )}
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "var(--ardoise)" }}
                >
                  {l.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
