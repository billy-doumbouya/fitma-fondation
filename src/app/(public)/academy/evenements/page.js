// src/app/(public)/academy/evenements/page.js
export const metadata = { title:"Événements | Fitma Academy" }
export default function EvenementsPage() {
  const events = [
    { titre:"Pitch Day — Promotion 2025", date:"15 Juillet 2025", type:"Pitch Day", desc:"Les startups incubées présentent leurs projets à un jury d'investisseurs et de partenaires.", lieu:"Fitma Espace, Conakry" },
    { titre:"Webinaire : Marketing Digital en Afrique", date:"20 Juin 2025", type:"Webinaire", desc:"Comment adapter sa stratégie marketing aux réalités du marché africain.", lieu:"En ligne" },
    { titre:"AfriTech Summit — Partenariat Fitma", date:"10 Août 2025", type:"Conférence", desc:"La grande conférence tech de l'Afrique de l'Ouest. Fitma est partenaire officiel.", lieu:"Conakry" },
    { titre:"Formation gratuite : Excel pour entrepreneurs", date:"5 Juillet 2025", type:"Formation", desc:"Session gratuite d'initiation à Excel pour les entrepreneurs débutants.", lieu:"Fitma Espace + En ligne" },
  ]
  return (
    <main className="pt-20">
      <section className="section section-savane">
        <div className="container-fitma text-center">
          <h1 className="text-h1 text-white mb-4">Événements & Webinaires</h1>
          <p className="text-white/75 max-w-xl mx-auto">Rejoignez notre communauté lors de nos événements : pitch days, webinaires, conférences et networking.</p>
        </div>
      </section>
      <section className="section">
        <div className="container-fitma">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {events.map((e,i) => (
              <div key={i} className="card p-6">
                <div className="flex items-start justify-between mb-4">
                  <span className="badge badge-savane">{e.type}</span>
                  <span className="text-xs" style={{color:"var(--brume)"}}>{e.date}</span>
                </div>
                <h3 className="font-d font-bold text-lg mb-2" style={{color:"var(--encre)"}}>{e.titre}</h3>
                <p className="text-sm mb-4" style={{color:"var(--ardoise)"}}>{e.desc}</p>
                <p className="text-xs" style={{color:"var(--brume)"}}>📍 {e.lieu}</p>
                <button className="mt-4 btn btn-savane btn-sm">S'inscrire à l'événement</button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
