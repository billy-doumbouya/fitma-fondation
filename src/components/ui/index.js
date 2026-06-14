"use client";

import { forwardRef, useId, useRef, useEffect, useState } from "react";
import { Loader2, ChevronLeft, ChevronRight, AlertCircle, CheckCircle2, X, Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

/* ─── Design tokens (inline, no Tailwind dependency) ─────── */
const T = {
  savane:   "#1B5E20",
  savaneL:  "#388E3C",
  savanePale:"#E8F5E9",
  cauri:    "#F9A825",
  cauriL:   "#FFD54F",
  cauriPale:"#FFF8E1",
  nuit:     "#1A237E",
  nuitPale: "#E8EAF6",
  encre:    "var(--encre,#1A237E)",
  ardoise:  "var(--ardoise,#546E7A)",
  brume:    "var(--brume,#90A4AE)",
  error:    "#C62828",
  errorPale:"#FFEBEE",
  success:  "#1B5E20",
  radius:   { sm: 10, md: 14, lg: 20, xl: 28, pill: 9999 },
  shadow:   { sm: "0 2px 8px rgba(0,0,0,.07)", md: "0 4px 24px rgba(0,0,0,.09)", lg: "0 12px 48px rgba(0,0,0,.14)" },
};

/* ─── Micro ripple on click ──────────────────────────────── */
function useRipple() {
  const [ripples, setRipples] = useState([]);
  const add = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left, y = e.clientY - rect.top;
    const id = Date.now();
    setRipples(r => [...r, { id, x, y }]);
    setTimeout(() => setRipples(r => r.filter(i => i.id !== id)), 600);
  };
  return [ripples, add];
}

function Ripple({ ripples, color = "rgba(255,255,255,.25)" }) {
  return (
    <>
      {ripples.map(r => (
        <span key={r.id} style={{
          position: "absolute", left: r.x, top: r.y, width: 6, height: 6,
          borderRadius: "50%", background: color, transform: "translate(-50%,-50%)",
          pointerEvents: "none",
          animation: "fitmaRipple .6s ease-out forwards",
        }}/>
      ))}
      <style>{`@keyframes fitmaRipple{to{transform:translate(-50%,-50%) scale(28);opacity:0}}`}</style>
    </>
  );
}

/* ════════════════════════════════════════════════════════════
   BUTTON
════════════════════════════════════════════════════════════ */
const BTN_VARIANTS = {
  savane: {
    bg: "linear-gradient(135deg,#1B5E20,#2E7D32)",
    color: "#fff",
    shadow: "0 4px 16px rgba(27,94,32,.32)",
    hoverShadow: "0 8px 28px rgba(27,94,32,.42)",
    ripple: "rgba(255,255,255,.22)",
  },
  cauri: {
    bg: "linear-gradient(135deg,#F9A825,#FFD54F)",
    color: "#1B3A00",
    shadow: "0 4px 16px rgba(249,168,37,.35)",
    hoverShadow: "0 8px 28px rgba(249,168,37,.5)",
    ripple: "rgba(27,58,0,.12)",
  },
  nuit: {
    bg: "linear-gradient(135deg,#1A237E,#283593)",
    color: "#fff",
    shadow: "0 4px 16px rgba(26,35,126,.28)",
    hoverShadow: "0 8px 28px rgba(26,35,126,.42)",
    ripple: "rgba(255,255,255,.2)",
  },
  outline: {
    bg: "transparent",
    color: "#1B5E20",
    border: "2px solid #1B5E20",
    shadow: "none",
    hoverShadow: "0 4px 16px rgba(27,94,32,.15)",
    ripple: "rgba(27,94,32,.1)",
  },
  ghost: {
    bg: "transparent",
    color: T.ardoise,
    shadow: "none",
    hoverBg: "rgba(0,0,0,.05)",
    ripple: "rgba(0,0,0,.06)",
  },
  danger: {
    bg: "linear-gradient(135deg,#C62828,#E53935)",
    color: "#fff",
    shadow: "0 4px 16px rgba(198,40,40,.3)",
    hoverShadow: "0 8px 24px rgba(198,40,40,.44)",
    ripple: "rgba(255,255,255,.2)",
  },
  white: {
    bg: "rgba(255,255,255,.1)",
    color: "#fff",
    border: "1.5px solid rgba(255,255,255,.35)",
    shadow: "none",
    hoverBg: "rgba(255,255,255,.18)",
    ripple: "rgba(255,255,255,.18)",
  },
};

const BTN_SIZES = {
  sm: { padding: "8px 18px", fontSize: 12, gap: 6, iconSize: 13 },
  md: { padding: "11px 24px", fontSize: 14, gap: 8, iconSize: 15 },
  lg: { padding: "14px 32px", fontSize: 15, gap: 10, iconSize: 18 },
};

export const Button = forwardRef(function Button(
  { variant = "savane", size = "md", loading, fullWidth, className, children, disabled, style: extraStyle, ...props },
  ref
) {
  const v = BTN_VARIANTS[variant] || BTN_VARIANTS.savane;
  const s = BTN_SIZES[size] || BTN_SIZES.md;
  const [ripples, addRipple] = useRipple();
  const [hovered, setHovered] = useState(false);

  return (
    <motion.button
      ref={ref}
      disabled={disabled || loading}
      whileTap={{ scale: 0.97 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={(e) => { addRipple(e); props.onClick?.(e); }}
      style={{
        position: "relative", overflow: "hidden",
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        gap: s.gap, padding: s.padding, fontSize: s.fontSize,
        fontWeight: 800, fontFamily: "var(--font-d,system-ui)",
        letterSpacing: "0.01em", cursor: disabled || loading ? "not-allowed" : "pointer",
        borderRadius: T.radius.pill, border: v.border || "none",
        background: hovered && v.hoverBg ? v.hoverBg : v.bg,
        color: v.color,
        boxShadow: hovered ? (v.hoverShadow || v.shadow) : v.shadow,
        opacity: disabled || loading ? 0.55 : 1,
        transition: "box-shadow .2s, background .2s, opacity .2s",
        width: fullWidth ? "100%" : undefined,
        ...extraStyle,
      }}
      {...props}
    >
      <Ripple ripples={ripples} color={v.ripple}/>
      {loading && (
        <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: .8, ease: "linear" }}>
          <Loader2 size={s.iconSize}/>
        </motion.span>
      )}
      {children}
    </motion.button>
  );
});

/* ════════════════════════════════════════════════════════════
   FIELD WRAPPER (shared by Input / Textarea / Select)
════════════════════════════════════════════════════════════ */
function FieldWrap({ label, id, required, error, helperText, children }) {
  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 6 }}>
      {label && (
        <label htmlFor={id} style={{
          fontSize: 13, fontWeight: 700, color: T.ardoise,
          fontFamily: "var(--font-d,system-ui)", display: "flex", gap: 4, alignItems: "center",
        }}>
          {label}
          {required && <span style={{ color: T.error }}>*</span>}
        </label>
      )}
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            key="err"
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            role="alert"
            style={{ fontSize: 12, color: T.error, display: "flex", alignItems: "center", gap: 5, margin: 0 }}
          >
            <AlertCircle size={12}/> {error}
          </motion.p>
        )}
        {!error && helperText && (
          <motion.p key="help" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ fontSize: 12, color: T.brume, margin: 0 }}>
            {helperText}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

/* Shared input style builder */
function inputStyle(error, focused) {
  return {
    width: "100%", padding: "11px 14px", fontSize: 14,
    borderRadius: T.radius.md, outline: "none",
    fontFamily: "inherit", color: T.encre,
    background: "#fff",
    border: `1.5px solid ${error ? T.error : focused ? T.savane : "rgba(0,0,0,.14)"}`,
    boxShadow: focused ? `0 0 0 3px ${error ? "rgba(198,40,40,.12)" : "rgba(27,94,32,.12)"}` : "none",
    transition: "border-color .18s, box-shadow .18s",
    boxSizing: "border-box",
  };
}

/* ════════════════════════════════════════════════════════════
   INPUT
════════════════════════════════════════════════════════════ */
export const Input = forwardRef(function Input(
  { label, error, helperText, className, id, required, type = "text", ...props }, ref
) {
  const uid = useId();
  const fid = id || uid;
  const [focused, setFocused] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const isPassword = type === "password";

  return (
    <FieldWrap label={label} id={fid} required={required} error={error} helperText={helperText}>
      <div style={{ position: "relative" }}>
        <input
          ref={ref} id={fid}
          type={isPassword ? (showPwd ? "text" : "password") : type}
          required={required}
          aria-invalid={!!error}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{ ...inputStyle(error, focused), paddingRight: isPassword ? 42 : 14 }}
          {...props}
        />
        {isPassword && (
          <button type="button"
            onClick={() => setShowPwd(v => !v)}
            style={{
              position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
              background: "none", border: "none", cursor: "pointer", color: T.brume, padding: 2,
            }}
          >
            {showPwd ? <EyeOff size={16}/> : <Eye size={16}/>}
          </button>
        )}
        {/* Success tick */}
        {!error && props.value && (
          <motion.span
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            style={{ position: "absolute", right: isPassword ? 36 : 12, top: "50%", transform: "translateY(-50%)" }}
          >
            <CheckCircle2 size={15} style={{ color: T.savane }}/>
          </motion.span>
        )}
      </div>
    </FieldWrap>
  );
});

/* ════════════════════════════════════════════════════════════
   TEXTAREA
════════════════════════════════════════════════════════════ */
export const Textarea = forwardRef(function Textarea(
  { label, error, helperText, className, id, required, maxLength, ...props }, ref
) {
  const uid = useId();
  const fid = id || uid;
  const [focused, setFocused] = useState(false);
  const [len, setLen] = useState(0);

  return (
    <FieldWrap label={label} id={fid} required={required} error={error} helperText={helperText}>
      <div style={{ position: "relative" }}>
        <textarea
          ref={ref} id={fid} rows={props.rows || 5}
          required={required} maxLength={maxLength}
          aria-invalid={!!error}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={e => { setLen(e.target.value.length); props.onChange?.(e); }}
          style={{ ...inputStyle(error, focused), resize: "vertical", lineHeight: 1.65 }}
          {...props}
        />
        {maxLength && (
          <span style={{
            position: "absolute", bottom: 10, right: 12,
            fontSize: 11, color: len >= maxLength ? T.error : T.brume,
          }}>
            {len}/{maxLength}
          </span>
        )}
      </div>
    </FieldWrap>
  );
});

/* ════════════════════════════════════════════════════════════
   SELECT
════════════════════════════════════════════════════════════ */
export const Select = forwardRef(function Select(
  { label, error, options = [], placeholder, id, required, ...props }, ref
) {
  const uid = useId();
  const fid = id || uid;
  const [focused, setFocused] = useState(false);

  return (
    <FieldWrap label={label} id={fid} required={required} error={error}>
      <div style={{ position: "relative" }}>
        <select
          ref={ref} id={fid} required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            ...inputStyle(error, focused),
            appearance: "none", WebkitAppearance: "none",
            paddingRight: 38, cursor: "pointer",
          }}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        {/* Custom arrow */}
        <svg
          viewBox="0 0 12 8" width={12} height={8}
          style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
          fill="none"
        >
          <path d="M1 1l5 5 5-5" stroke={focused ? T.savane : T.brume} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </FieldWrap>
  );
});

/* ════════════════════════════════════════════════════════════
   SECTION TITLE
════════════════════════════════════════════════════════════ */
export function SectionTitle({ pretitle, title, subtitle, align = "center", light = false }) {
  const center = align === "center";
  return (
    <div style={{ marginBottom: 56, textAlign: center ? "center" : "left" }}>
      {pretitle && (
        <motion.span
          initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{
            display: "inline-block", padding: "5px 16px", borderRadius: T.radius.pill,
            background: light ? "rgba(249,168,37,.2)" : T.savanePale,
            color: light ? T.cauriL : T.savane,
            fontSize: 11, fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase",
            fontFamily: "var(--font-d,system-ui)", marginBottom: 14,
          }}
        >
          {pretitle}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ delay: 0.1 }}
        style={{
          fontFamily: "var(--font-d,system-ui)",
          fontSize: "clamp(1.8rem,3.5vw,2.8rem)",
          fontWeight: 900, lineHeight: 1.15, letterSpacing: "-0.02em",
          color: light ? "#fff" : T.encre, marginBottom: 14,
        }}
      >
        {title}
      </motion.h2>
      {/* Animated underline bar */}
      {center && (
        <motion.div
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
          viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.5, ease: [0.22,1,0.36,1] }}
          style={{
            height: 4, width: 56, margin: "0 auto 18px",
            borderRadius: T.radius.pill,
            background: `linear-gradient(90deg,${T.savane},${T.cauri})`,
            transformOrigin: "left",
          }}
        />
      )}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.25 }}
          style={{
            fontSize: 16, lineHeight: 1.75, color: light ? "rgba(255,255,255,.75)" : T.ardoise,
            maxWidth: 600, margin: center ? "0 auto" : undefined,
          }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   SPINNER
════════════════════════════════════════════════════════════ */
export function Spinner({ size = "md" }) {
  const dim = { sm: 18, md: 32, lg: 48 }[size] || 32;
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <motion.div
        animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: .9, ease: "linear" }}
        style={{
          width: dim, height: dim, borderRadius: "50%",
          border: `2.5px solid rgba(27,94,32,.15)`,
          borderTopColor: T.savane,
        }}
      />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   EMPTY STATE
════════════════════════════════════════════════════════════ */
export function EmptyState({ icon = "📭", title, description, action }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", padding: "64px 24px", textAlign: "center",
      }}
    >
      <div style={{
        width: 80, height: 80, borderRadius: 24, marginBottom: 20,
        background: T.savanePale,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 38,
      }}>
        {icon}
      </div>
      <h3 style={{ fontFamily: "var(--font-d)", fontWeight: 900, fontSize: "1.2rem", color: T.encre, marginBottom: 8 }}>
        {title}
      </h3>
      {description && (
        <p style={{ fontSize: 14, color: T.ardoise, maxWidth: 320, lineHeight: 1.65, marginBottom: action ? 24 : 0 }}>
          {description}
        </p>
      )}
      {action && <div>{action}</div>}
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════
   BADGE
════════════════════════════════════════════════════════════ */
const BADGE_STYLES = {
  savane: { bg: T.savanePale,  color: T.savane  },
  cauri:  { bg: T.cauriPale,   color: "#7a5000" },
  nuit:   { bg: T.nuitPale,    color: T.nuit    },
  gris:   { bg: "rgba(0,0,0,.06)", color: T.ardoise },
  success:{ bg: "#E8F5E9",     color: "#1B5E20" },
  error:  { bg: T.errorPale,   color: T.error   },
};

export function Badge({ children, variant = "savane", className, dot }) {
  const s = BADGE_STYLES[variant] || BADGE_STYLES.gris;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      padding: "3px 10px", borderRadius: T.radius.pill,
      fontSize: 11, fontWeight: 700, fontFamily: "var(--font-d,system-ui)",
      background: s.bg, color: s.color, letterSpacing: "0.03em",
    }}>
      {dot && (
        <span style={{
          width: 6, height: 6, borderRadius: "50%",
          background: s.color, display: "inline-block",
        }}/>
      )}
      {children}
    </span>
  );
}

/* ════════════════════════════════════════════════════════════
   CARD
════════════════════════════════════════════════════════════ */
export function Card({ children, hover = false, className, style: extraStyle, ...props }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.div
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      animate={hover && hov ? { y: -6 } : { y: 0 }}
      transition={{ duration: 0.22 }}
      style={{
        borderRadius: T.radius.lg, background: "#fff",
        border: "1.5px solid rgba(0,0,0,.08)",
        boxShadow: hov && hover ? T.shadow.md : T.shadow.sm,
        transition: "box-shadow .22s",
        ...extraStyle,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════
   MODAL
════════════════════════════════════════════════════════════ */
export function Modal({ open, onClose, title, children, size = "md" }) {
  const maxW = { sm: 400, md: 560, lg: 800 }[size] || 560;

  // Trap scroll
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            display: "flex", alignItems: "center", justifyContent: "center", padding: 16,
            background: "rgba(10,10,20,.55)", backdropFilter: "blur(8px)",
          }}
          onClick={onClose}
        >
          <motion.div
            key="panel"
            initial={{ opacity: 0, scale: .94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: .94, y: 20 }}
            transition={{ duration: .28, ease: [0.22,1,0.36,1] }}
            onClick={e => e.stopPropagation()}
            style={{
              width: "100%", maxWidth: maxW,
              borderRadius: T.radius.xl, background: "#fff",
              boxShadow: "0 32px 80px rgba(0,0,0,.2)",
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "20px 24px", borderBottom: "1px solid rgba(0,0,0,.07)",
            }}>
              {title && (
                <h2 style={{ fontFamily: "var(--font-d)", fontWeight: 900, fontSize: "1.15rem", color: T.encre, margin: 0 }}>
                  {title}
                </h2>
              )}
              <button
                onClick={onClose}
                style={{
                  width: 32, height: 32, borderRadius: T.radius.sm,
                  background: "rgba(0,0,0,.05)", border: "none", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: T.ardoise, transition: "background .15s",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(0,0,0,.1)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(0,0,0,.05)"}
              >
                <X size={16}/>
              </button>
            </div>
            {/* Body */}
            <div style={{ padding: 24 }}>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ════════════════════════════════════════════════════════════
   CONFIRM DIALOG
════════════════════════════════════════════════════════════ */
export function ConfirmDialog({ open, onClose, onConfirm, title, message, loading, confirmLabel = "Confirmer", variant = "danger" }) {
  return (
    <Modal open={open} onClose={onClose} title={title} size="sm">
      <p style={{ fontSize: 14, color: T.ardoise, lineHeight: 1.7, marginBottom: 24 }}>{message}</p>
      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
        <Button variant="ghost" onClick={onClose} disabled={loading}>Annuler</Button>
        <Button variant={variant} loading={loading} onClick={onConfirm}>{confirmLabel}</Button>
      </div>
    </Modal>
  );
}

/* ════════════════════════════════════════════════════════════
   PAGINATION
════════════════════════════════════════════════════════════ */
export function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  const pages = (() => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const res = [1];
    if (page > 3) res.push("…");
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) res.push(i);
    if (page < totalPages - 2) res.push("…");
    res.push(totalPages);
    return res;
  })();

  const btnBase = {
    width: 36, height: 36, borderRadius: T.radius.sm, fontSize: 13, fontWeight: 700,
    display: "flex", alignItems: "center", justifyContent: "center",
    border: "none", cursor: "pointer", transition: "background .15s, color .15s",
    fontFamily: "var(--font-d,system-ui)",
  };

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 32 }}>
      <button
        onClick={() => onChange(page - 1)} disabled={page <= 1}
        style={{
          ...btnBase, background: "rgba(0,0,0,.05)",
          color: page <= 1 ? T.brume : T.ardoise, opacity: page <= 1 ? 0.4 : 1,
        }}
      >
        <ChevronLeft size={16}/>
      </button>

      {pages.map((p, i) =>
        p === "…" ? (
          <span key={`dot-${i}`} style={{ fontSize: 14, color: T.brume, padding: "0 4px" }}>…</span>
        ) : (
          <motion.button
            key={p} whileTap={{ scale: 0.92 }}
            onClick={() => onChange(p)}
            style={{
              ...btnBase,
              background: p === page
                ? "linear-gradient(135deg,#1B5E20,#2E7D32)"
                : "rgba(0,0,0,.04)",
              color: p === page ? "#fff" : T.ardoise,
              boxShadow: p === page ? "0 2px 8px rgba(27,94,32,.28)" : "none",
            }}
          >
            {p}
          </motion.button>
        )
      )}

      <button
        onClick={() => onChange(page + 1)} disabled={page >= totalPages}
        style={{
          ...btnBase, background: "rgba(0,0,0,.05)",
          color: page >= totalPages ? T.brume : T.ardoise, opacity: page >= totalPages ? 0.4 : 1,
        }}
      >
        <ChevronRight size={16}/>
      </button>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   PROGRESS BAR
════════════════════════════════════════════════════════════ */
export function ProgressBar({ value = 0, label, color }) {
  const clamp = Math.min(100, Math.max(0, value));
  return (
    <div style={{ width: "100%" }}>
      {label && (
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontSize: 13, color: T.ardoise }}>{label}</span>
          <span style={{ fontSize: 13, fontWeight: 800, color: T.savane, fontFamily: "var(--font-d)" }}>
            {clamp}%
          </span>
        </div>
      )}
      <div style={{
        width: "100%", height: 8, borderRadius: T.radius.pill,
        background: "rgba(0,0,0,.07)", overflow: "hidden",
      }}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${clamp}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22,1,0.36,1] }}
          style={{
            height: "100%", borderRadius: T.radius.pill,
            background: color || `linear-gradient(90deg,${T.savane},${T.cauri})`,
          }}
        />
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   STAT CARD
════════════════════════════════════════════════════════════ */
export function StatCard({ icon: Icon, label, value, sub, couleur, bg, href, trend }) {
  const [hov, setHov] = useState(false);

  const inner = (
    <motion.div
      whileHover={{ y: -4 }}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      style={{
        borderRadius: T.radius.lg, padding: "22px 20px",
        background: "#fff",
        border: "1.5px solid rgba(0,0,0,.07)",
        boxShadow: hov ? T.shadow.md : T.shadow.sm,
        transition: "box-shadow .22s",
        position: "relative", overflow: "hidden",
      }}
    >
      {/* Background geo accent */}
      <div style={{
        position: "absolute", top: -18, right: -18, width: 72, height: 72,
        borderRadius: "50%", background: bg || T.savanePale, opacity: 0.5,
      }}/>

      <div style={{
        width: 42, height: 42, borderRadius: T.radius.sm, marginBottom: 14,
        background: bg || T.savanePale,
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative",
      }}>
        {Icon && <Icon size={20} style={{ color: couleur || T.savane }}/>}
      </div>

      <p style={{ fontFamily: "var(--font-d)", fontSize: "1.6rem", fontWeight: 900, color: T.encre, lineHeight: 1, marginBottom: 4 }}>
        {value}
      </p>
      <p style={{ fontSize: 12, fontWeight: 700, color: T.ardoise }}>{label}</p>

      {sub && <p style={{ fontSize: 11, color: T.brume, marginTop: 2 }}>{sub}</p>}

      {trend !== undefined && (
        <div style={{
          position: "absolute", top: 16, right: 16,
          fontSize: 11, fontWeight: 800, fontFamily: "var(--font-d)",
          color: trend >= 0 ? T.savane : T.error,
          display: "flex", alignItems: "center", gap: 2,
        }}>
          {trend >= 0 ? "↑" : "↓"} {Math.abs(trend)}%
        </div>
      )}
    </motion.div>
  );

  return href ? <a href={href} style={{ display: "block", textDecoration: "none" }}>{inner}</a> : inner;
}