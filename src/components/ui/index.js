import { forwardRef } from "react"
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

// ── Button ────────────────────────────────────────────────────
export const Button = forwardRef(function Button(
  { variant="savane", size="md", loading, fullWidth, className, children, disabled, ...props }, ref
) {
  const v = {
    savane: "btn btn-savane", cauri: "btn btn-cauri", nuit: "btn btn-nuit",
    outline: "btn btn-outline-savane", ghost: "btn btn-ghost rounded-xl",
    danger: "btn btn-danger", white: "btn btn-outline-white",
  }
  const s = { sm:"text-xs px-4 py-2", md:"text-sm px-6 py-3", lg:"text-base px-8 py-4" }
  return (
    <button ref={ref} disabled={disabled||loading}
      className={cn(v[variant], s[size], fullWidth && "w-full justify-center", className)} {...props}>
      {loading && <Loader2 size={15} className="animate-spin"/>}
      {children}
    </button>
  )
})

// ── Input ─────────────────────────────────────────────────────
export const Input = forwardRef(function Input({ label, error, helperText, className, id, required, ...props }, ref) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g,"-")
  return (
    <div className="w-full">
      {label && <label htmlFor={inputId} className="block text-sm font-semibold mb-1.5" style={{ color:"var(--ardoise)", fontFamily:"var(--font-d)" }}>
        {label}{required && <span className="text-red-500 ml-1">*</span>}
      </label>}
      <input ref={ref} id={inputId} required={required}
        className={cn("input-f", error && "err", className)}
        aria-invalid={!!error} {...props}/>
      {error && <p className="text-xs mt-1.5 flex items-center gap-1" style={{ color:"var(--error)" }} role="alert">⚠ {error}</p>}
      {!error && helperText && <p className="text-xs mt-1.5" style={{ color:"var(--brume)" }}>{helperText}</p>}
    </div>
  )
})

// ── Textarea ──────────────────────────────────────────────────
export const Textarea = forwardRef(function Textarea({ label, error, helperText, className, id, required, ...props }, ref) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g,"-")
  return (
    <div className="w-full">
      {label && <label htmlFor={inputId} className="block text-sm font-semibold mb-1.5" style={{ color:"var(--ardoise)", fontFamily:"var(--font-d)" }}>
        {label}{required && <span className="text-red-500 ml-1">*</span>}
      </label>}
      <textarea ref={ref} id={inputId} rows={props.rows||5} required={required}
        className={cn("input-f resize-none", error && "err", className)} {...props}/>
      {error && <p className="text-xs mt-1.5" style={{ color:"var(--error)" }} role="alert">⚠ {error}</p>}
      {!error && helperText && <p className="text-xs mt-1.5" style={{ color:"var(--brume)" }}>{helperText}</p>}
    </div>
  )
})

// ── Select ────────────────────────────────────────────────────
export const Select = forwardRef(function Select({ label, error, options=[], placeholder, className, id, required, ...props }, ref) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g,"-")
  return (
    <div className="w-full">
      {label && <label htmlFor={inputId} className="block text-sm font-semibold mb-1.5" style={{ color:"var(--ardoise)", fontFamily:"var(--font-d)" }}>
        {label}{required && <span className="text-red-500 ml-1">*</span>}
      </label>}
      <select ref={ref} id={inputId} className={cn("input-f", error && "err", className)} {...props}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      {error && <p className="text-xs mt-1.5" style={{ color:"var(--error)" }} role="alert">⚠ {error}</p>}
    </div>
  )
})

// ── SectionTitle ──────────────────────────────────────────────
export function SectionTitle({ pretitle, title, subtitle, align="center", light=false }) {
  return (
    <div className={`mb-12 md:mb-16 ${align==="center"?"text-center":"text-left"}`}>
      {pretitle && (
        <motion.span initial={{ opacity:0, y:10 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          className="inline-block text-xs font-semibold tracking-widest uppercase mb-3 px-3 py-1 rounded-full"
          style={{ background: light?"rgba(249,168,37,.25)":"var(--cauri-pale)", color: light?"var(--cauri-l)":"var(--savane-d)", fontFamily:"var(--font-d)" }}>
          {pretitle}
        </motion.span>
      )}
      <motion.h2 initial={{ opacity:0, y:15 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:.1 }}
        className="text-h1 mb-4" style={{ color: light?"white":"var(--encre)" }}>
        {title}
      </motion.h2>
      {align==="center" && (
        <motion.div initial={{ scaleX:0 }} whileInView={{ scaleX:1 }} viewport={{ once:true }} transition={{ delay:.2 }}
          className="divider-fitma mx-auto mb-5"/>
      )}
      {subtitle && (
        <motion.p initial={{ opacity:0, y:10 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:.25 }}
          className={`text-base max-w-2xl leading-relaxed ${align==="center"?"mx-auto":""}`}
          style={{ color: light?"rgba(255,255,255,.75)":"var(--ardoise)" }}>
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}

// ── Spinner ───────────────────────────────────────────────────
export function Spinner({ size="md" }) {
  const s = { sm:"w-4 h-4", md:"w-8 h-8", lg:"w-12 h-12" }[size]
  return <div className="flex items-center justify-center"><div className={`${s} rounded-full border-2 animate-spin`} style={{ borderColor:"var(--savane)", borderTopColor:"transparent" }}/></div>
}

// ── EmptyState ────────────────────────────────────────────────
export function EmptyState({ icon="📭", title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center px-4">
      <span className="text-5xl mb-4">{icon}</span>
      <h3 className="font-d text-xl font-bold mb-2" style={{ color:"var(--encre)" }}>{title}</h3>
      {description && <p className="text-sm max-w-xs" style={{ color:"var(--ardoise)" }}>{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}

// ── Badge ─────────────────────────────────────────────────────
export function Badge({ children, variant="savane", className }) {
  const v = { savane:"badge-savane", cauri:"badge-cauri", nuit:"badge-nuit", gris:"badge-gris" }[variant]
  return <span className={cn("badge", v, className)}>{children}</span>
}

// ── Card ──────────────────────────────────────────────────────
export function Card({ children, hover=false, className, ...props }) {
  return <div className={cn("card", hover && "card-hover", className)} {...props}>{children}</div>
}

// ── Modal ─────────────────────────────────────────────────────
export function Modal({ open, onClose, title, children, size="md" }) {
  const maxW = { sm:"max-w-sm", md:"max-w-lg", lg:"max-w-2xl" }[size]
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"/>
      <motion.div initial={{ opacity:0, scale:.95 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0, scale:.95 }}
        className={`relative z-10 w-full ${maxW} rounded-3xl p-6`} style={{ background:"white", boxShadow:"var(--sh-lg)" }}
        onClick={e => e.stopPropagation()}>
        {title && <h2 className="font-d text-xl font-bold mb-4" style={{ color:"var(--encre)" }}>{title}</h2>}
        {children}
      </motion.div>
    </div>
  )
}

// ── ConfirmDialog ─────────────────────────────────────────────
export function ConfirmDialog({ open, onClose, onConfirm, title, message, loading }) {
  return (
    <Modal open={open} onClose={onClose} title={title} size="sm">
      <p className="text-sm mb-6" style={{ color:"var(--ardoise)" }}>{message}</p>
      <div className="flex gap-3 justify-end">
        <Button variant="ghost" onClick={onClose}>Annuler</Button>
        <Button variant="danger" loading={loading} onClick={onConfirm}>Confirmer</Button>
      </div>
    </Modal>
  )
}

// ── Pagination ────────────────────────────────────────────────
export function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null
  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button onClick={() => onChange(page-1)} disabled={page<=1} className="btn btn-ghost btn-sm disabled:opacity-40"><ChevronLeft size={16}/></button>
      {Array.from({ length:totalPages },(_,i)=>i+1).map(p => (
        <button key={p} onClick={() => onChange(p)}
          className="w-9 h-9 rounded-xl text-sm font-semibold transition-all"
          style={{ background: p===page?"var(--savane)":"transparent", color: p===page?"white":"var(--ardoise)" }}>
          {p}
        </button>
      ))}
      <button onClick={() => onChange(page+1)} disabled={page>=totalPages} className="btn btn-ghost btn-sm disabled:opacity-40"><ChevronRight size={16}/></button>
    </div>
  )
}

// ── ProgressBar ───────────────────────────────────────────────
export function ProgressBar({ value=0, label }) {
  return (
    <div className="w-full">
      {label && <div className="flex justify-between text-xs mb-1" style={{ color:"var(--ardoise)" }}>
        <span>{label}</span><span className="font-semibold" style={{ color:"var(--savane)" }}>{value}%</span>
      </div>}
      <div className="progress-bar">
        <motion.div className="progress-fill" style={{ width:`${value}%` }}
          initial={{ width:0 }} animate={{ width:`${value}%` }} transition={{ duration:.8 }}/>
      </div>
    </div>
  )
}

// ── StatCard ──────────────────────────────────────────────────
export function StatCard({ icon: Icon, label, value, sub, couleur, bg, href }) {
  const inner = (
    <div className="stat-card">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background:bg }}>
        <Icon size={20} style={{ color:couleur }}/>
      </div>
      <p className="font-d text-2xl font-bold leading-tight" style={{ color:"var(--encre)" }}>{value}</p>
      <p className="text-xs mt-1 font-semibold" style={{ color:"var(--ardoise)" }}>{label}</p>
      {sub && <p className="text-xs mt-0.5 opacity-60" style={{ color:"var(--brume)" }}>{sub}</p>}
    </div>
  )
  if (href) return <a href={href} className="block">{inner}</a>
  return inner
}
