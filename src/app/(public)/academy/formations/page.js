"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Search, Filter, GraduationCap } from "lucide-react"
import { SectionTitle, Badge, Spinner, EmptyState, Pagination } from "@/components/ui"
import { formatMontant } from "@/lib/utils"
import { useAnalytics } from "@/hooks"

const CATEGORIES = ["Tous","Marketing","Entrepreneuriat","Technologie","Leadership","Finance","Design","Communication"]
const NIVEAUX    = [{ value:"",label:"Tous niveaux"},{ value:"DEBUTANT",label:"Débutant"},{ value:"INTERMEDIAIRE",label:"Intermédiaire"},{ value:"AVANCE",label:"Avancé"}]
const FORMATS    = [{ value:"",label:"Tous formats"},{ value:"EN_LIGNE",label:"En ligne"},{ value:"PRESENTIEL",label:"Présentiel"},{ value:"HYBRIDE",label:"Hybride"}]
const NV_LABEL   = { DEBUTANT:"Débutant", INTERMEDIAIRE:"Intermédiaire", AVANCE:"Avancé" }
const FMT_LABEL  = { EN_LIGNE:"En ligne", PRESENTIEL:"Présentiel", HYBRIDE:"Hybride" }

export default function FormationsPage() {
  useAnalytics("/academy/formations")
  const [formations, setFormations] = useState([])
  const [loading, setLoading]       = useState(true)
  const [total, setTotal]           = useState(0)
  const [page, setPage]             = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [search, setSearch]         = useState("")
  const [categorie, setCategorie]   = useState("Tous")
  const [niveau, setNiveau]         = useState("")
  const [format, setFormat]         = useState("")

  async function load(p = 1) {
    setLoading(true)
    try {
      const params = new URLSearchParams({ page: p, limit: 9 })
      if (search)                params.set("search", search)
      if (categorie !== "Tous")  params.set("categorie", categorie)
      if (niveau)                params.set("niveau", niveau)
      if (format)                params.set("format", format)
      const res  = await fetch(`/api/formations?${params}`)
      const data = await res.json()
      setFormations(data.formations || [])
      setTotal(data.total || 0)
      setTotalPages(data.totalPages || 1)
      setPage(p)
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  useEffect(() => { load(1) }, [categorie, niveau, format])

  function handleSearch(e) {
    e.preventDefault()
    load(1)
  }

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="section section-savane">
        <div className="container-fitma text-center">
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>
            <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-4 px-3 py-1 rounded-full" style={{background:"rgba(249,168,37,.25)",color:"var(--cauri-l)",fontFamily:"var(--font-d)"}}>Fitma Academy</span>
            <h1 className="text-h1 text-white mb-4">Catalogue des Formations</h1>
            <p className="text-white/75 max-w-xl mx-auto mb-8">Des programmes pratiques conçus par des experts pour développer vos compétences et votre carrière.</p>
            <form onSubmit={handleSearch} className="max-w-lg mx-auto flex gap-2">
              <div className="flex-1 relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{color:"var(--brume)"}}/>
                <input type="text" value={search} onChange={e=>setSearch(e.target.value)}
                  placeholder="Rechercher une formation..."
                  className="w-full pl-9 pr-4 py-3 rounded-xl text-sm outline-none"
                  style={{border:"none",color:"var(--encre)"}}/>
              </div>
              <button type="submit" className="btn btn-cauri btn-md px-5">Chercher</button>
            </form>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container-fitma">
          {/* Filtres */}
          <div className="flex flex-wrap gap-3 mb-8 p-4 rounded-2xl" style={{background:"var(--sable)"}}>
            <div className="flex items-center gap-2">
              <Filter size={15} style={{color:"var(--ardoise)"}}/>
              <span className="text-xs font-semibold" style={{color:"var(--ardoise)",fontFamily:"var(--font-d)"}}>Filtres :</span>
            </div>
            {/* Catégories */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(c => (
                <button key={c} onClick={() => setCategorie(c)}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                  style={{background:categorie===c?"var(--savane)":"white",color:categorie===c?"white":"var(--ardoise)",fontFamily:"var(--font-d)"}}>
                  {c}
                </button>
              ))}
            </div>
            <select value={niveau} onChange={e=>setNiveau(e.target.value)}
              className="text-xs px-3 py-1.5 rounded-xl border outline-none" style={{borderColor:"#E0E0E0",fontFamily:"var(--font-d)"}}>
              {NIVEAUX.map(n => <option key={n.value} value={n.value}>{n.label}</option>)}
            </select>
            <select value={format} onChange={e=>setFormat(e.target.value)}
              className="text-xs px-3 py-1.5 rounded-xl border outline-none" style={{borderColor:"#E0E0E0",fontFamily:"var(--font-d)"}}>
              {FORMATS.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
            </select>
          </div>

          <p className="text-sm mb-6" style={{color:"var(--brume)"}}>{total} formation{total!==1?"s":""} trouvée{total!==1?"s":""}</p>

          {loading ? (
            <div className="py-20"><Spinner size="lg"/></div>
          ) : formations.length === 0 ? (
            <EmptyState icon="📚" title="Aucune formation trouvée" description="Essayez de modifier vos filtres."
              action={<button onClick={() => {setCategorie("Tous");setNiveau("");setFormat("");setSearch("")}} className="btn btn-savane btn-sm">Réinitialiser</button>}/>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {formations.map((f,i) => (
                  <motion.div key={f.id} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:i*.06}}>
                    <Link href={`/academy/formations/${f.slug}`} className="card card-hover block group h-full">
                      <div className="relative h-48 overflow-hidden">
                        {f.imageUrl
                          ? <Image src={f.imageUrl} alt={f.titre} fill className="object-cover transition-transform duration-500 group-hover:scale-105"/>
                          : <div className="w-full h-full flex items-center justify-center text-6xl" style={{background:"var(--savane-pale)"}}>📚</div>
                        }
                        <div className="absolute top-3 right-3">
                          <Badge variant={f.gratuit?"savane":"cauri"}>{f.gratuit?"Gratuit":formatMontant(f.prix)}</Badge>
                        </div>
                      </div>
                      <div className="p-5 flex flex-col h-full">
                        <div className="flex gap-2 mb-3">
                          <Badge variant="gris" className="text-[10px]">{FMT_LABEL[f.format]}</Badge>
                          <Badge variant="gris" className="text-[10px]">{NV_LABEL[f.niveau]}</Badge>
                        </div>
                        <h2 className="font-d font-bold text-base mb-2 group-hover:text-savane transition-colors" style={{color:"var(--encre)"}}>{f.titre}</h2>
                        <p className="text-xs leading-relaxed mb-3 flex-1" style={{color:"var(--ardoise)"}}>{f.description?.slice(0,100)}...</p>
                        <div className="flex items-center justify-between pt-3" style={{borderTop:"1px solid #F5F0E8"}}>
                          <span className="text-xs" style={{color:"var(--brume)"}}>{f.duree}</span>
                          <span className="text-xs font-semibold" style={{color:"var(--brume)"}}>{f._count?.inscriptions||0} inscrits</span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
              <Pagination page={page} totalPages={totalPages} onChange={p => load(p)}/>
            </>
          )}
        </div>
      </section>
    </main>
  )
}
