// Hanami components — sidebar, breadcrumb, hub card, step, callout
// Names are unique to avoid collisions.

const { useState, useRef, useEffect, useMemo } = React;

/* ─────────────────────────── Iconography ─────────────────────────── */
// Tiny line icons drawn in a hand-feel: slightly off-center, soft strokes.
const Icon = ({ name, size = 16, color = 'currentColor', strokeWidth = 1.6 }) => {
  const paths = {
    folder: <><path d="M3 7 L3 17 Q3 18 4 18 L20 18 Q21 18 21 17 L21 9 Q21 8 20 8 L11 8 L9 6 L4 6 Q3 6 3 7 Z" /></>,
    file:   <><path d="M6 4 L14 4 L18 8 L18 20 Q18 21 17 21 L6 21 Q5 21 5 20 L5 5 Q5 4 6 4 Z" /><path d="M14 4 L14 8 L18 8" /></>,
    chevron:<><path d="M9 6 L15 12 L9 18" /></>,
    search: <><circle cx="11" cy="11" r="6" /><path d="M16 16 L21 21" /></>,
    sun:    <><circle cx="12" cy="12" r="4" /><path d="M12 2 L12 5 M12 19 L12 22 M2 12 L5 12 M19 12 L22 12 M4.5 4.5 L6.5 6.5 M17.5 17.5 L19.5 19.5 M4.5 19.5 L6.5 17.5 M17.5 6.5 L19.5 4.5" /></>,
    moon:   <><path d="M20 14 Q15 19 9 17 Q4 14 5 8 Q6 4 11 3 Q9 9 13 13 Q17 16 20 14 Z" /></>,
    plus:   <><path d="M12 5 L12 19 M5 12 L19 12" /></>,
    star:   <><path d="M12 4 L14 10 L20 10 L15 14 L17 20 L12 16 L7 20 L9 14 L4 10 L10 10 Z" /></>,
    bookmark: <><path d="M7 4 L17 4 Q18 4 18 5 L18 20 L12 16 L6 20 L6 5 Q6 4 7 4 Z" /></>,
    tag:    <><path d="M3 12 L12 3 L21 3 L21 12 L12 21 Z" /><circle cx="16" cy="8" r="1.4" /></>,
    book:   <><path d="M4 5 Q4 4 5 4 L19 4 L19 19 L5 19 Q4 19 4 20 L4 5 Z M4 19 Q4 18 5 18 L19 18" /></>,
    clock:  <><circle cx="12" cy="12" r="8" /><path d="M12 7 L12 12 L16 14" /></>,
    sparkle:<><path d="M12 3 L13.5 10 L20 11.5 L13.5 13 L12 20 L10.5 13 L4 11.5 L10.5 10 Z" /><path d="M19 4 L19.6 6 L21.5 6.5 L19.6 7 L19 9 L18.4 7 L16.5 6.5 L18.4 6 Z" /></>,
    leaf:   <><path d="M5 19 Q4 11 11 5 Q19 4 19 12 Q19 19 11 19 Q8 19 5 19 Z" /><path d="M5 19 L13 11" /></>,
    pin:    <><path d="M12 3 L17 8 L14 11 L16 18 L12 15 L8 18 L10 11 L7 8 Z" /></>,
    arrow:  <><path d="M5 12 L19 12 M13 6 L19 12 L13 18" /></>,
    home:   <><path d="M4 11 L12 4 L20 11 L20 19 Q20 20 19 20 L14 20 L14 14 L10 14 L10 20 L5 20 Q4 20 4 19 Z" /></>,
    flame:  <><path d="M12 3 Q10 7 8 9 Q5 12 6 16 Q7 20 12 20 Q17 20 18 16 Q19 12 16 9 Q13 7 12 3 Z" /></>,
    git:    <><circle cx="6" cy="6" r="2" /><circle cx="6" cy="18" r="2" /><circle cx="18" cy="12" r="2" /><path d="M6 8 L6 16 M8 6 Q12 6 12 10 L12 14 Q12 18 8 18 M12 12 L16 12" /></>,
    db:     <><ellipse cx="12" cy="6" rx="7" ry="3" /><path d="M5 6 L5 12 Q5 15 12 15 Q19 15 19 12 L19 6 M5 12 L5 18 Q5 21 12 21 Q19 21 19 18 L19 12" /></>,
    bug:    <><ellipse cx="12" cy="13" rx="5" ry="6" /><path d="M12 7 L12 6 M9 4 L11 6 M15 4 L13 6 M5 11 L7 12 M5 17 L7 16 M19 11 L17 12 M19 17 L17 16 M12 9 L12 19" /></>,
    cmd:    <><path d="M6 6 Q4 6 4 8 Q4 10 6 10 L18 10 Q20 10 20 8 Q20 6 18 6 Q16 6 16 8 L16 16 Q16 18 18 18 Q20 18 20 16 Q20 14 18 14 L6 14 Q4 14 4 16 Q4 18 6 18 Q8 18 8 16 L8 8 Q8 6 6 6 Z" /></>,
    layers: <><path d="M12 3 L21 8 L12 13 L3 8 Z M3 13 L12 18 L21 13 M3 18 L12 23 L21 18" /></>,
    menu:   <><path d="M4 7 L20 7 M4 12 L20 12 M4 17 L20 17" /></>,
    dots:   <><circle cx="5" cy="12" r="1.4" /><circle cx="12" cy="12" r="1.4" /><circle cx="19" cy="12" r="1.4" /></>,
    check:  <><path d="M5 12 L10 17 L20 6" /></>,
    copy:   <><rect x="7" y="7" width="13" height="13" rx="2" /><path d="M5 14 L5 5 Q5 4 6 4 L15 4" /></>,
    eye:    <><path d="M2 12 Q7 5 12 5 Q17 5 22 12 Q17 19 12 19 Q7 19 2 12 Z" /><circle cx="12" cy="12" r="3" /></>,
  };
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none"
      stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {paths[name] || null}
    </svg>
  );
};

/* ─────────────────────────── Brand mark ─────────────────────────── */
const BrandMark = ({ size = 28 }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
    <div style={{
      width: size, height: size, borderRadius: 10,
      background: 'linear-gradient(160deg, #F2C2A0, #E8B4B0 60%, #C4827E)',
      display: 'grid', placeItems: 'center',
      boxShadow: '0 4px 10px rgba(196,130,126,.32), inset 0 1px 0 rgba(255,255,255,.5)',
      flex: '0 0 auto',
    }}>
      <Sakura5 size={size * 0.66} opacity={0.95} />
    </div>
    <div style={{ lineHeight: 1 }}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 500, color: 'var(--ink)' }}>
        Hanami
      </div>
      <div style={{ fontSize: 10.5, color: 'var(--ink-faint)', letterSpacing: '.18em', textTransform: 'uppercase', marginTop: 2 }}>
        playbook
      </div>
    </div>
  </div>
);

/* ─────────────────────────── Sidebar tree ─────────────────────────── */
const TreeNode = ({ node, depth = 0, activeId, onSelect, openMap, setOpenMap }) => {
  const hasKids = node.children && node.children.length > 0;
  const open = openMap[node.id] !== false; // default open
  const active = activeId === node.id;

  return (
    <div>
      <div
        onClick={() => {
          if (hasKids) setOpenMap({ ...openMap, [node.id]: !open });
          onSelect && onSelect(node.id);
        }}
        style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '6px 10px 6px ' + (10 + depth * 14) + 'px',
          margin: '1px 8px',
          borderRadius: 10,
          background: active ? 'linear-gradient(90deg, rgba(242,194,160,.35), rgba(232,180,176,.18))' : 'transparent',
          color: active ? '#5a3a2f' : 'var(--ink-soft)',
          fontWeight: active ? 600 : 500,
          fontSize: 13,
          cursor: 'pointer',
          position: 'relative',
        }}
      >
        {hasKids ? (
          <span style={{
            display: 'inline-flex', width: 12, transition: 'transform .15s',
            transform: open ? 'rotate(90deg)' : 'rotate(0deg)', color: 'var(--ink-faint)',
          }}>
            <Icon name="chevron" size={11} strokeWidth={2} />
          </span>
        ) : (
          <span style={{ width: 12, display: 'inline-block' }} />
        )}
        {node.icon ? (
          <span style={{ color: node.iconColor || 'var(--ink-faint)' }}>
            <Icon name={node.icon} size={14} />
          </span>
        ) : (
          <span className={'hb-dot hb-dot--' + (node.status || 'mute')} />
        )}
        <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {node.label}
        </span>
        {node.count !== undefined && (
          <span style={{
            fontSize: 10.5, fontFamily: 'var(--font-mono)',
            background: 'rgba(63,54,44,.06)', padding: '2px 6px', borderRadius: 6,
            color: 'var(--ink-faint)',
          }}>{node.count}</span>
        )}
        {node.fresh && (
          <span style={{
            fontSize: 9.5, fontFamily: 'var(--font-hand)', color: 'var(--rose-deep)',
            transform: 'rotate(-6deg)', marginLeft: -2,
          }}>new!</span>
        )}
      </div>
      {hasKids && open && (
        <div style={{
          position: 'relative',
          // tree connector line
          borderLeft: '1px dashed rgba(63,54,44,.12)',
          marginLeft: 18 + depth * 14,
        }}>
          {node.children.map(c => (
            <TreeNode key={c.id} node={c} depth={depth + 1}
              activeId={activeId} onSelect={onSelect}
              openMap={openMap} setOpenMap={setOpenMap} />
          ))}
        </div>
      )}
    </div>
  );
};

const Sidebar = ({ tree, activeId, onSelect, compact = false }) => {
  const [openMap, setOpenMap] = useState({});
  const [q, setQ] = useState('');
  return (
    <aside style={{
      width: compact ? 240 : 272,
      flex: '0 0 auto',
      height: '100%',
      background: 'rgba(255,251,244,0.82)',
      backdropFilter: 'blur(10px)',
      borderRight: '1px solid var(--line)',
      display: 'flex', flexDirection: 'column',
      position: 'relative', zIndex: 2,
    }}>
      {/* Top: brand */}
      <div style={{ padding: '18px 18px 14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <BrandMark />
        <button className="hb-btn hb-btn--ghost" style={{ padding: '6px 8px', borderRadius: 8 }}>
          <Icon name="menu" size={14} />
        </button>
      </div>

      {/* Search */}
      <div style={{ padding: '0 14px 12px 14px' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '8px 12px',
          background: 'var(--paper)',
          border: '1px solid var(--line-strong)',
          borderRadius: 12,
          boxShadow: 'var(--shadow-sm)',
        }}>
          <Icon name="search" size={14} color="var(--ink-faint)" />
          <input value={q} onChange={e => setQ(e.target.value)}
            placeholder="Search the garden…"
            style={{
              flex: 1, border: 0, outline: 0, background: 'transparent',
              font: 'inherit', fontSize: 12.5, color: 'var(--ink)',
            }} />
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-faint)',
            border: '1px solid var(--line-strong)', borderRadius: 5, padding: '1px 5px',
          }}>⌘K</span>
        </div>
      </div>

      {/* Pinned section */}
      <div style={{ padding: '6px 18px 4px 18px' }}>
        <div style={{
          fontSize: 10.5, letterSpacing: '.18em', textTransform: 'uppercase',
          color: 'var(--ink-faint)', display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <Icon name="pin" size={10} />
          pinned
        </div>
      </div>
      <div style={{ padding: '4px 0 8px 0' }}>
        {[
          { id: 'p1', label: 'Onboarding checklist', icon: 'check', iconColor: 'var(--sage-deep)' },
          { id: 'p2', label: 'Production runbook',   icon: 'flame', iconColor: 'var(--rose-deep)' },
        ].map(p => (
          <div key={p.id}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '6px 10px', margin: '1px 12px', borderRadius: 10,
              fontSize: 12.5, color: 'var(--ink-soft)', cursor: 'pointer',
            }}>
            <span style={{ color: p.iconColor }}><Icon name={p.icon} size={13} /></span>
            <span>{p.label}</span>
          </div>
        ))}
      </div>

      <div style={{ padding: '8px 18px 4px 18px' }}>
        <div style={{
          fontSize: 10.5, letterSpacing: '.18em', textTransform: 'uppercase',
          color: 'var(--ink-faint)',
        }}>library</div>
      </div>

      {/* Tree */}
      <div style={{ flex: 1, overflow: 'hidden', padding: '4px 0 12px 0', position: 'relative' }}>
        {tree.map(n => (
          <TreeNode key={n.id} node={n} activeId={activeId}
            onSelect={onSelect} openMap={openMap} setOpenMap={setOpenMap} />
        ))}
      </div>

      {/* Footer card — daily haiku / mood */}
      <div style={{ padding: 14 }}>
        <div className="hb-card" style={{
          padding: 14, borderRadius: 16,
          background: 'linear-gradient(160deg, #FADFC9, #F5D6D2)',
          border: '1px solid rgba(196,130,126,.2)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div className="deco" style={{ position: 'absolute', right: -10, top: -10, width: 70, height: 70 }}>
            <Sakura5 size={70} opacity={0.4} />
          </div>
          <div style={{
            fontFamily: 'var(--font-hand)', fontSize: 17, lineHeight: 1.15,
            color: '#6b3f37',
          }}>
            “small commits, like<br/>petals — one by one”
          </div>
          <div style={{ marginTop: 8, fontSize: 10.5, color: '#8b5a52', letterSpacing: '.12em', textTransform: 'uppercase' }}>
            today · haiku #042
          </div>
        </div>
      </div>
    </aside>
  );
};

/* ─────────────────────────── Breadcrumb ─────────────────────────── */
const Breadcrumb = ({ items }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', minWidth: 0 }}>
    {items.map((it, i) => (
      <React.Fragment key={i}>
        {i > 0 && <span style={{ color: 'var(--ink-ghost)', fontSize: 12 }}>›</span>}
        <span style={{
          fontSize: 12.5,
          color: i === items.length - 1 ? 'var(--ink)' : 'var(--ink-faint)',
          fontWeight: i === items.length - 1 ? 600 : 500,
          display: 'inline-flex', alignItems: 'center', gap: 6,
        }}>
          {it.icon && <Icon name={it.icon} size={12} />}
          {it.label}
        </span>
      </React.Fragment>
    ))}
  </div>
);

/* ─────────────────────────── Hub card ─────────────────────────── */
const HubCard = ({ accent = 'rose', icon, title, blurb, count, fresh, kanji, slotId, slotPlaceholder }) => {
  const accents = {
    rose:   { bg: 'linear-gradient(160deg, #FFE9E2, #F5D6D2)', ink: '#6b3f37', dot: '#C4827E' },
    peach:  { bg: 'linear-gradient(160deg, #FFE8D2, #FADFC9)', ink: '#6a4628', dot: '#C68A63' },
    sage:   { bg: 'linear-gradient(160deg, #E8F2DC, #D6E3CB)', ink: '#3e5234', dot: '#7E9968' },
    lav:    { bg: 'linear-gradient(160deg, #ECE5F5, #E2DCEB)', ink: '#48405a', dot: '#9388A6' },
    sky:    { bg: 'linear-gradient(160deg, #E1EEF3, #C9DEE6)', ink: '#2e4a55', dot: '#6E94A0' },
    cream:  { bg: 'linear-gradient(160deg, #FFF7EA, #F5EDDF)', ink: '#5a4a32', dot: '#B89968' },
    pond:   { bg: 'linear-gradient(160deg, #DCEDD0, #B4C99A)', ink: '#2e4a2a', dot: '#3A5C2E' },
    water:  { bg: 'linear-gradient(160deg, #D6E9E7, #9FCFCB)', ink: '#1e4847', dot: '#3F7C7A' },
    wood:   { bg: 'linear-gradient(160deg, #EDDBC2, #D4B58A)', ink: '#4a3520', dot: '#8a5e30' },
  }[accent];
  return (
    <div className="hb-card" style={{
      padding: slotId ? 14 : 18,
      borderRadius: 18,
      background: accents.bg,
      border: '1px solid rgba(63,54,44,.06)',
      overflow: 'hidden',
      position: 'relative',
      minHeight: 158,
      display: 'flex', flexDirection: 'column', gap: 10,
    }}>
      {kanji && (
        <div style={{
          position: 'absolute', right: -14, bottom: -28,
          fontFamily: 'var(--font-display)', fontSize: 120, lineHeight: 1,
          color: accents.ink, opacity: .08, pointerEvents: 'none',
          fontWeight: 600,
        }}>{kanji}</div>
      )}

      {slotId && (
        <div className="hb-thumb">
          <image-slot id={slotId} placeholder={slotPlaceholder || 'Drop painted scene'}
            shape="rounded" radius="12" />
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        padding: slotId ? '4px 4px 0 4px' : 0 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 12,
          background: 'rgba(255,255,255,.55)',
          display: 'grid', placeItems: 'center',
          boxShadow: 'inset 0 0 0 1px rgba(63,54,44,.06)',
          color: accents.ink,
        }}>
          <Icon name={icon} size={18} strokeWidth={1.7} />
        </div>
        {fresh && (
          <span style={{
            fontFamily: 'var(--font-hand)', fontSize: 15, color: accents.dot,
            transform: 'rotate(-4deg)',
          }}>new!</span>
        )}
      </div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 19, color: accents.ink, lineHeight: 1.2, fontWeight: 500,
        padding: slotId ? '0 4px' : 0 }}>
        {title}
      </div>
      <div style={{ fontSize: 12.5, color: accents.ink, opacity: .72, lineHeight: 1.45,
        padding: slotId ? '0 4px' : 0 }}>
        {blurb}
      </div>
      <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: slotId ? '0 4px 2px 4px' : 0 }}>
        <span style={{ fontSize: 11, color: accents.ink, opacity: .65, fontFamily: 'var(--font-mono)' }}>
          {count} entries
        </span>
        <span style={{
          width: 24, height: 24, borderRadius: 8,
          background: 'rgba(255,255,255,.6)',
          display: 'grid', placeItems: 'center', color: accents.ink,
        }}>
          <Icon name="arrow" size={12} strokeWidth={2} />
        </span>
      </div>
    </div>
  );
};

/* ─────────────────────────── Expandable step ─────────────────────────── */
const Step = ({ n, title, summary, open: openProp, children, kind = 'normal' }) => {
  const [open, setOpen] = useState(openProp ?? n === 1);
  const isDone = kind === 'done';
  return (
    <div className="hb-card" style={{
      padding: 0, borderRadius: 16, overflow: 'hidden',
      border: '1px solid var(--line)',
      background: open ? 'var(--paper)' : 'rgba(255,251,244,.65)',
    }}>
      <div
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex', alignItems: 'center', gap: 14,
          padding: '16px 18px', cursor: 'pointer',
        }}
      >
        <div style={{
          width: 30, height: 30, borderRadius: '50%',
          background: isDone ? 'var(--sage)' : 'linear-gradient(160deg, #FADFC9, #F5D6D2)',
          color: isDone ? 'white' : '#6b3f37',
          display: 'grid', placeItems: 'center',
          fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 600,
          flex: '0 0 auto',
          boxShadow: 'inset 0 0 0 1px rgba(63,54,44,.06)',
        }}>
          {isDone ? <Icon name="check" size={14} strokeWidth={2.4} /> : n}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: 'var(--ink)', fontWeight: 500 }}>
            {title}
          </div>
          {summary && (
            <div style={{ fontSize: 12.5, color: 'var(--ink-faint)', marginTop: 2 }}>
              {summary}
            </div>
          )}
        </div>
        <span style={{
          color: 'var(--ink-faint)',
          transform: open ? 'rotate(90deg)' : 'rotate(0)',
          transition: 'transform .2s',
        }}>
          <Icon name="chevron" size={14} />
        </span>
      </div>
      {open && (
        <div style={{
          padding: '4px 22px 20px 62px',
          borderTop: '1px dashed var(--line)',
        }}>
          {children}
        </div>
      )}
    </div>
  );
};

/* ─────────────────────────── Callout ─────────────────────────── */
const Callout = ({ kind = 'tip', title, children }) => {
  const styles = {
    tip:     { bg: 'linear-gradient(160deg, #E8F2DC, #DCEACE)', border: 'rgba(126,153,104,.3)', ink: '#3e5234', icon: 'leaf',    label: 'tip' },
    note:    { bg: 'linear-gradient(160deg, #FFF7EA, #F5EDDF)', border: 'rgba(184,153,104,.3)', ink: '#5a4a32', icon: 'sparkle', label: 'note' },
    warn:    { bg: 'linear-gradient(160deg, #FFE2D6, #FAD0BD)', border: 'rgba(198,138,99,.35)', ink: '#7a3f1f', icon: 'flame',   label: 'careful' },
    quote:   { bg: 'linear-gradient(160deg, #ECE5F5, #E2DCEB)', border: 'rgba(147,136,166,.3)', ink: '#48405a', icon: 'book',    label: 'wisdom' },
  };
  const s = styles[kind];
  return (
    <div style={{
      background: s.bg,
      border: '1px solid ' + s.border,
      borderRadius: 14,
      padding: '14px 16px',
      color: s.ink,
      position: 'relative',
      display: 'flex', gap: 12,
    }}>
      <div style={{
        flex: '0 0 auto', width: 26, height: 26, borderRadius: 8,
        background: 'rgba(255,255,255,.6)', display: 'grid', placeItems: 'center',
        color: s.ink,
      }}>
        <Icon name={s.icon} size={14} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 11, letterSpacing: '.16em', textTransform: 'uppercase',
          fontWeight: 600, opacity: .8,
        }}>{s.label}{title ? ' — ' + title : ''}</div>
        <div style={{ marginTop: 4, fontSize: 13, lineHeight: 1.55 }}>
          {children}
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────── Code block ─────────────────────────── */
const CodeBlock = ({ lang = 'ts', code, caption }) => (
  <div style={{ position: 'relative' }}>
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '0 4px 6px 4px',
      fontSize: 11, color: 'var(--ink-faint)', fontFamily: 'var(--font-mono)',
    }}>
      <span>{caption || lang}</span>
      <span style={{ display: 'inline-flex', gap: 4, alignItems: 'center', cursor: 'pointer' }}>
        <Icon name="copy" size={11} /> copy
      </span>
    </div>
    <pre className="hb-code" style={{ margin: 0 }} dangerouslySetInnerHTML={{ __html: code }} />
  </div>
);

/* ─────────────────────────── Tag pill row ─────────────────────────── */
const TagRow = ({ tags }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
    {tags.map(t => (
      <span key={t} className="hb-chip" style={{
        fontSize: 10.5, padding: '4px 8px', textTransform: 'lowercase',
      }}>#{t}</span>
    ))}
  </div>
);

/* ─────────────────────────── Avatar ─────────────────────────── */
const Avatar = ({ initials = 'YT', hue = '#E8B4B0' }) => (
  <div style={{
    width: 30, height: 30, borderRadius: '50%',
    background: 'linear-gradient(160deg, ' + hue + ', #F5D6D2)',
    color: '#5a3a2f', display: 'grid', placeItems: 'center',
    fontFamily: 'var(--font-display)', fontSize: 12, fontWeight: 600,
    boxShadow: 'inset 0 0 0 1.5px rgba(255,255,255,.5)',
  }}>{initials}</div>
);

Object.assign(window, {
  Icon, BrandMark, Sidebar, Breadcrumb, HubCard, Step, Callout, CodeBlock, TagRow, Avatar,
});
