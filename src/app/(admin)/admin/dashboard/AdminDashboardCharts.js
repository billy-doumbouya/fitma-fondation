"use client";
import Link from "next/link";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Eye, Heart, Mail, ArrowRight, TrendingUp } from "lucide-react";
import { formatDate, formatMontant } from "@/lib/utils";

/* ─── Custom Tooltip ────────────────────────────────────────── */
function CustomTooltip({ active, payload, label, formatter, labelFormatter }) {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        borderRadius: 14,
        background: "#fff",
        padding: "10px 14px",
        boxShadow: "0 8px 32px rgba(0,0,0,.13)",
        fontSize: 12,
        border: "1px solid rgba(0,0,0,.06)",
      }}
    >
      <p style={{ color: "#90A4AE", marginBottom: 4, fontSize: 11 }}>
        {labelFormatter ? labelFormatter(label) : label}
      </p>
      {payload.map((p, i) => (
        <p
          key={i}
          style={{
            fontWeight: 800,
            color: p.color || "#1B5E20",
            fontFamily: "var(--font-d)",
          }}
        >
          {formatter ? formatter(p.value)[0] : p.value}
        </p>
      ))}
    </div>
  );
}

/* ─── Chart card wrapper ─────────────────────────────────────── */
function ChartCard({ icon: Icon, title, children }) {
  return (
    <div
      style={{
        borderRadius: 20,
        background: "#fff",
        padding: "20px 20px 12px",
        border: "1.5px solid rgba(0,0,0,.07)",
        boxShadow: "0 2px 16px rgba(0,0,0,.05)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 20,
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 9,
            background: "rgba(27,94,32,.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon size={15} style={{ color: "#1B5E20" }} />
        </div>
        <h2
          style={{
            fontFamily: "var(--font-d)",
            fontWeight: 800,
            fontSize: 14,
            color: "var(--encre,#1A237E)",
          }}
        >
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}

/* ─── List card wrapper ──────────────────────────────────────── */
function ListCard({ icon: Icon, title, href, children }) {
  return (
    <div
      style={{
        borderRadius: 20,
        background: "#fff",
        overflow: "hidden",
        border: "1.5px solid rgba(0,0,0,.07)",
        boxShadow: "0 2px 16px rgba(0,0,0,.05)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 20px",
          borderBottom: "1px solid rgba(0,0,0,.05)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 9,
              background: "rgba(27,94,32,.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon size={15} style={{ color: "#1B5E20" }} />
          </div>
          <h2
            style={{
              fontFamily: "var(--font-d)",
              fontWeight: 800,
              fontSize: 14,
              color: "var(--encre,#1A237E)",
            }}
          >
            {title}
          </h2>
        </div>
        <Link
          href={href}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            fontSize: 12,
            fontWeight: 700,
            color: "#1B5E20",
            textDecoration: "none",
          }}
        >
          Voir tout <ArrowRight size={12} />
        </Link>
      </div>
      {children}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════ */
export default function AdminDashboardCharts({
  visiteurs,
  donsMensuels,
  derniersMessages,
  derniersDons,
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* ── Charts row ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
          gap: 20,
        }}
      >
        {/* Visiteurs */}
        <ChartCard icon={Eye} title="Visiteurs — 7 derniers jours">
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart
              data={visiteurs}
              margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="gVis" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1B5E20" stopOpacity={0.22} />
                  <stop offset="95%" stopColor="#1B5E20" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(0,0,0,.05)"
                vertical={false}
              />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10, fill: "#90A4AE" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) =>
                  new Date(v).toLocaleDateString("fr-FR", {
                    day: "2-digit",
                    month: "2-digit",
                  })
                }
              />
              <YAxis
                tick={{ fontSize: 10, fill: "#90A4AE" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                content={
                  <CustomTooltip
                    labelFormatter={(v) => formatDate(v)}
                    formatter={(v) => [`${v} visiteurs`]}
                  />
                }
              />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#1B5E20"
                strokeWidth={2.5}
                fill="url(#gVis)"
                dot={false}
                activeDot={{ r: 5, fill: "#1B5E20", strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Dons */}
        <ChartCard icon={TrendingUp} title="Dons — 6 derniers mois">
          <ResponsiveContainer width="100%" height={180}>
            <BarChart
              data={donsMensuels}
              margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="gDons" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1B5E20" />
                  <stop offset="100%" stopColor="#F9A825" />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(0,0,0,.05)"
                vertical={false}
              />
              <XAxis
                dataKey="mois"
                tick={{ fontSize: 10, fill: "#90A4AE" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "#90A4AE" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                content={
                  <CustomTooltip formatter={(v) => [formatMontant(v)]} />
                }
              />
              <Bar
                dataKey="total"
                fill="url(#gDons)"
                radius={[8, 8, 0, 0]}
                maxBarSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* ── Lists row ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
          gap: 20,
        }}
      >
        {/* Messages */}
        <ListCard icon={Mail} title="Derniers messages" href="/admin/messages">
          {derniersMessages.length === 0 ? (
            <p
              style={{
                padding: "24px",
                textAlign: "center",
                fontSize: 13,
                color: "#90A4AE",
              }}
            >
              Aucun message
            </p>
          ) : (
            derniersMessages.map((m) => (
              <Link
                key={m.id}
                href="/admin/messages"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "13px 20px",
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(0,0,0,.045)",
                  transition: "background .15s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "rgba(0,0,0,.02)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                {/* Avatar initiales */}
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: "50%",
                    flexShrink: 0,
                    background: "linear-gradient(135deg,#1B5E20,#1A237E)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 11,
                    fontWeight: 800,
                    color: "#fff",
                    fontFamily: "var(--font-d)",
                  }}
                >
                  {m.prenom[0]}
                  {m.nom[0]}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 6 }}
                  >
                    <p
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: "var(--encre,#1A237E)",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {m.prenom} {m.nom}
                    </p>
                    {!m.lu && (
                      <span
                        style={{
                          width: 7,
                          height: 7,
                          borderRadius: "50%",
                          background: "#F9A825",
                          flexShrink: 0,
                          boxShadow: "0 0 0 2px rgba(249,168,37,.25)",
                        }}
                      />
                    )}
                  </div>
                  <p
                    style={{
                      fontSize: 11,
                      color: "#90A4AE",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {m.sujet}
                  </p>
                </div>
                <span style={{ fontSize: 10, color: "#90A4AE", flexShrink: 0 }}>
                  {m.createdAt}
                </span>
              </Link>
            ))
          )}
        </ListCard>

        {/* Dons */}
        <ListCard icon={Heart} title="Derniers dons" href="/admin/dons">
          {derniersDons.length === 0 ? (
            <p
              style={{
                padding: "24px",
                textAlign: "center",
                fontSize: 13,
                color: "#90A4AE",
              }}
            >
              Aucun don
            </p>
          ) : (
            derniersDons.map((d) => (
              <div
                key={d.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "13px 20px",
                  borderBottom: "1px solid rgba(0,0,0,.045)",
                }}
              >
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: "50%",
                    flexShrink: 0,
                    background: "rgba(27,94,32,.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 16,
                  }}
                >
                  💚
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: "var(--encre,#1A237E)",
                    }}
                  >
                    {d.prenom} {d.nom}
                  </p>
                  <p style={{ fontSize: 11, color: "#90A4AE" }}>
                    {d.createdAt}
                  </p>
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-d)",
                    fontWeight: 800,
                    fontSize: 13,
                    color: "#1B5E20",
                    flexShrink: 0,
                  }}
                >
                  {d.montantFormate}
                </p>
              </div>
            ))
          )}
        </ListCard>
      </div>
    </div>
  );
}
