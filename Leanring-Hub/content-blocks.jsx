// Rich content components — typography, code, callouts, tables, comparisons
// All standalone, drop into any article. Names prefixed Rc* to avoid collisions.

const { useState: _useS2 } = React;

/* ─────────────────────────── Typography primitives ─────────────────────────── */

const RcH2 = ({ children, kanji, ornament = true }) => (
  <h2 style={{
    fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 500,
    color: 'var(--ink)', margin: '36px 0 10px 0', letterSpacing: '-0.012em',
    lineHeight: 1.18, position: 'relative',
    display: 'flex', alignItems: 'baseline', gap: 14,
  }}>
    {ornament && (
      <span style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: 28, height: 28, marginRight: -4,
        borderRadius: 8, background: 'linear-gradient(160deg, #FFE38B, #FFC93A)',
        color: '#5a3f0a', fontFamily: 'var(--font-display)',
        fontSize: 14, fontWeight: 700, flex: '0 0 auto',
        boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.5)',
      }}>{kanji || '§'}</span>
    )}
    <span style={{ flex: 1, minWidth: 0 }}>{children}</span>
  </h2>
);

const RcH3 = ({ children }) => (
  <h3 style={{
    fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 600,
    color: 'var(--ink)', margin: '24px 0 8px 0',
    display: 'flex', alignItems: 'center', gap: 10,
  }}>
    <span className="hb-dot hb-dot--coral" style={{ flex: '0 0 auto' }} />
    {children}
  </h3>
);

const RcLead = ({ children }) => (
  <p style={{
    fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 400,
    color: 'var(--ink)', lineHeight: 1.55,
    margin: '8px 0 18px 0', letterSpacing: '-0.005em',
    textWrap: 'pretty',
  }}>
    {children}
  </p>
);

const RcP = ({ children, style = {} }) => (
  <p style={{
    fontSize: 15, color: 'var(--ink)', lineHeight: 1.72,
    margin: '0 0 14px 0', textWrap: 'pretty', ...style,
  }}>
    {children}
  </p>
);

const DropCap = ({ children, first = 'O' }) => (
  <p style={{
    fontSize: 15, color: 'var(--ink)', lineHeight: 1.72,
    margin: '0 0 14px 0', textWrap: 'pretty',
  }}>
    <span style={{
      float: 'left', fontFamily: 'var(--font-display)',
      fontSize: 64, lineHeight: 0.86, fontWeight: 500,
      color: '#D45A75', margin: '8px 10px 0 0',
      background: 'linear-gradient(160deg, #FFE9F0, #FFC8D2)',
      padding: '10px 12px 4px 12px', borderRadius: 12,
      boxShadow: 'inset 0 -3px 0 rgba(212,90,117,.15)',
    }}>{first}</span>
    {children}
  </p>
);

// Inline UI
const Hi = ({ children, hue = '#FFC93A' }) => (
  <span style={{
    backgroundImage: `linear-gradient(transparent 58%, ${hue}80 58%, ${hue}80 92%, transparent 92%)`,
    padding: '0 3px',
  }}>
    {children}
  </span>
);

const Code = ({ children }) => (
  <code style={{
    fontFamily: 'var(--font-mono)', fontSize: 13,
    background: 'rgba(255,143,163,.12)', color: '#7a1f33',
    padding: '1px 6px', borderRadius: 5,
    border: '1px solid rgba(212,90,117,.18)',
  }}>{children}</code>
);

const Kbd = ({ children }) => (
  <kbd style={{
    fontFamily: 'var(--font-mono)', fontSize: 11.5, fontWeight: 600,
    display: 'inline-block',
    padding: '2px 7px', borderRadius: 5,
    background: 'linear-gradient(180deg, #fff, #f4ece0)',
    border: '1px solid rgba(63,54,44,.18)',
    boxShadow: '0 1px 0 rgba(63,54,44,.12), inset 0 -1px 0 rgba(63,54,44,.06)',
    color: 'var(--ink)',
    verticalAlign: '1px',
  }}>{children}</kbd>
);

const Foot = ({ n }) => (
  <sup style={{
    fontSize: 9.5, fontWeight: 700, color: '#D45A75',
    background: 'rgba(255,143,163,.18)', borderRadius: 4,
    padding: '0 4px', marginLeft: 1, verticalAlign: 'super',
    cursor: 'pointer',
  }}>{n}</sup>
);

/* ─────────────────────────── Pull quote ─────────────────────────── */
const PullQuote = ({ children, attribution }) => (
  <blockquote style={{
    margin: '28px 0', padding: '20px 36px',
    fontFamily: 'var(--font-display)', fontSize: 24, lineHeight: 1.35,
    color: '#1d3a52', letterSpacing: '-0.01em', fontStyle: 'italic',
    textAlign: 'center', position: 'relative',
  }}>
    {/* Big opening curly quote */}
    <span style={{
      position: 'absolute', left: 0, top: -8,
      fontFamily: 'Georgia, serif', fontSize: 96, lineHeight: 1,
      color: '#FFC93A', opacity: .6, fontStyle: 'normal',
    }}>“</span>
    {/* Big closing curly quote */}
    <span style={{
      position: 'absolute', right: 0, bottom: -52,
      fontFamily: 'Georgia, serif', fontSize: 96, lineHeight: 1,
      color: '#FFC93A', opacity: .6, fontStyle: 'normal',
    }}>”</span>
    <div style={{ position: 'relative', zIndex: 1 }}>
      {children}
    </div>
    {attribution && (
      <div style={{
        marginTop: 12, fontFamily: 'var(--font-body)', fontSize: 12,
        fontStyle: 'normal', color: 'var(--ink-faint)',
        letterSpacing: '.16em', textTransform: 'uppercase',
      }}>— {attribution}</div>
    )}
  </blockquote>
);

const BlockQuote = ({ children, attribution }) => (
  <blockquote style={{
    margin: '20px 0', padding: '14px 18px',
    borderLeft: '3px solid #FF8FA3',
    background: 'linear-gradient(90deg, rgba(255,143,163,.08), transparent)',
    borderRadius: '0 12px 12px 0',
  }}>
    <div style={{ fontSize: 14, color: 'var(--ink)', fontStyle: 'italic', lineHeight: 1.6 }}>
      {children}
    </div>
    {attribution && (
      <div style={{
        marginTop: 8, fontSize: 11.5, color: 'var(--ink-faint)',
        letterSpacing: '.06em',
      }}>— {attribution}</div>
    )}
  </blockquote>
);

/* ─────────────────────────── Key term / definition ─────────────────────────── */
const KeyTerm = ({ term, kana, def, see }) => (
  <div style={{
    margin: '20px 0', padding: '18px 22px',
    background: 'linear-gradient(160deg, #FFF7E1, #FFEAB3)',
    border: '1.5px solid #FFC93A',
    borderRadius: 16, position: 'relative',
    boxShadow: '0 6px 18px rgba(229,169,60,.15)',
  }}>
    <div style={{
      position: 'absolute', left: -10, top: -10,
      background: '#FFC93A', color: '#5a3f0a',
      padding: '4px 10px', borderRadius: 8,
      fontFamily: 'var(--font-hand)', fontSize: 15,
      transform: 'rotate(-3deg)',
      boxShadow: '0 4px 10px rgba(229,169,60,.4)',
    }}>
      key term
    </div>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginTop: 6 }}>
      <span style={{
        fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600,
        color: '#5a3f0a',
      }}>{term}</span>
      {kana && (
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 12, color: '#8a6a18',
          opacity: .8,
        }}>· {kana}</span>
      )}
    </div>
    <div style={{
      marginTop: 6, fontSize: 14, color: '#3a2a08', lineHeight: 1.6,
    }}>
      {def}
    </div>
    {see && (
      <div style={{
        marginTop: 8, fontSize: 11.5, color: '#8a6a18',
        display: 'inline-flex', alignItems: 'center', gap: 4,
      }}>
        see also: <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>{see}</span>
      </div>
    )}
  </div>
);

/* ─────────────────────────── Lists ─────────────────────────── */
const RcOrdered = ({ items }) => (
  <ol style={{ margin: '8px 0 18px 0', paddingLeft: 0, listStyle: 'none' }}>
    {items.map((it, i) => (
      <li key={i} style={{
        display: 'flex', gap: 14, alignItems: 'flex-start',
        padding: '8px 0', borderBottom: i < items.length - 1 ? '1px dashed var(--line)' : 'none',
      }}>
        <span style={{
          width: 26, height: 26, borderRadius: '50%',
          background: 'linear-gradient(160deg, #FFC8D2, #FF8FA3)',
          color: '#7a1f33', display: 'grid', placeItems: 'center',
          fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 600,
          flex: '0 0 auto', boxShadow: '0 2px 6px rgba(212,90,117,.2)',
        }}>{i + 1}</span>
        <span style={{ flex: 1, fontSize: 14.5, lineHeight: 1.6, color: 'var(--ink)', paddingTop: 3 }}>{it}</span>
      </li>
    ))}
  </ol>
);

const RcChecklist = ({ items }) => (
  <ul style={{ margin: '8px 0 18px 0', paddingLeft: 0, listStyle: 'none' }}>
    {items.map((it, i) => {
      const done = typeof it === 'object' ? it.done : false;
      const txt = typeof it === 'object' ? it.t : it;
      return (
        <li key={i} style={{
          display: 'flex', gap: 12, alignItems: 'flex-start',
          padding: '6px 0',
        }}>
          <span style={{
            width: 18, height: 18, borderRadius: 6,
            background: done ? 'linear-gradient(160deg, #B8E098, #8FCB6F)' : 'transparent',
            border: '1.5px solid ' + (done ? '#447A2A' : 'rgba(63,54,44,.25)'),
            color: 'white', display: 'grid', placeItems: 'center',
            flex: '0 0 auto', marginTop: 3,
          }}>
            {done && <Icon name="check" size={11} strokeWidth={3} />}
          </span>
          <span style={{
            flex: 1, fontSize: 14, lineHeight: 1.55,
            color: done ? 'var(--ink-faint)' : 'var(--ink)',
            textDecoration: done ? 'line-through' : 'none',
          }}>{txt}</span>
        </li>
      );
    })}
  </ul>
);

const RcBullets = ({ items }) => (
  <ul style={{ margin: '8px 0 18px 0', paddingLeft: 4, listStyle: 'none' }}>
    {items.map((it, i) => (
      <li key={i} style={{
        display: 'flex', gap: 10, alignItems: 'flex-start',
        padding: '4px 0', fontSize: 14, lineHeight: 1.6, color: 'var(--ink)',
      }}>
        <span style={{ color: '#FF8FA3', fontSize: 14, lineHeight: 1.4, flex: '0 0 auto' }}>✿</span>
        <span>{it}</span>
      </li>
    ))}
  </ul>
);

/* ─────────────────────────── Code variants ─────────────────────────── */

const CodeFile = ({ filename, lang, code, lines = true, highlight }) => {
  const rawLines = code.split('\n');
  return (
    <div style={{
      margin: '16px 0', borderRadius: 14, overflow: 'hidden',
      border: '1px solid rgba(63,54,44,.12)',
      boxShadow: '0 6px 18px rgba(60,40,30,.06)',
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(180deg, #f5ede0, #ecddc4)',
        padding: '8px 14px',
        display: 'flex', alignItems: 'center', gap: 10,
        borderBottom: '1px solid rgba(63,54,44,.1)',
      }}>
        {/* traffic lights */}
        <span style={{ display: 'flex', gap: 5 }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff8e7e' }} />
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#fbc14d' }} />
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#8fcb6f' }} />
        </span>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 12, color: '#5a4a3a', flex: 1,
          textAlign: 'center',
        }}>{filename}</span>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 10.5, color: '#8a7256',
          background: 'rgba(255,255,255,.6)', padding: '2px 8px', borderRadius: 999,
          letterSpacing: '.08em', textTransform: 'lowercase',
        }}>{lang}</span>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 10.5, color: '#8a7256',
          display: 'inline-flex', gap: 4, alignItems: 'center', cursor: 'pointer',
        }}>
          <Icon name="copy" size={11} /> copy
        </span>
      </div>
      <pre style={{
        margin: 0, padding: '14px 0',
        background: '#fffbf2',
        fontFamily: 'var(--font-mono)', fontSize: 12.5, lineHeight: 1.7,
        color: '#5a4a3a',
        overflow: 'hidden',
      }}>
        {rawLines.map((l, i) => {
          const isHi = highlight && highlight.includes(i + 1);
          return (
            <div key={i} style={{
              display: 'flex',
              background: isHi ? 'rgba(255,201,58,.18)' : 'transparent',
              borderLeft: isHi ? '3px solid #FFC93A' : '3px solid transparent',
              paddingRight: 14,
            }}>
              {lines && (
                <span style={{
                  display: 'inline-block', width: 38, paddingLeft: 14,
                  color: 'rgba(63,54,44,.28)', userSelect: 'none', fontSize: 11,
                  flex: '0 0 auto',
                }}>{i + 1}</span>
              )}
              <span dangerouslySetInnerHTML={{ __html: l || '&nbsp;' }} />
            </div>
          );
        })}
      </pre>
    </div>
  );
};

const Diff = ({ filename, hunks }) => (
  <div style={{
    margin: '16px 0', borderRadius: 14, overflow: 'hidden',
    border: '1px solid rgba(63,54,44,.12)',
  }}>
    <div style={{
      background: 'linear-gradient(180deg, #f5ede0, #ecddc4)',
      padding: '8px 14px',
      display: 'flex', alignItems: 'center', gap: 10,
      borderBottom: '1px solid rgba(63,54,44,.1)',
    }}>
      <Icon name="git" size={13} color="#5a4a3a" />
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#5a4a3a' }}>{filename}</span>
      <div style={{ flex: 1 }} />
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: '#447A2A' }}>+4</span>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: '#B0445A' }}>−2</span>
    </div>
    <div style={{ background: '#fffbf2', fontFamily: 'var(--font-mono)', fontSize: 12.5, lineHeight: 1.7 }}>
      {hunks.map((h, i) => {
        const bg = h.k === '+' ? 'rgba(143,203,111,.18)'
                 : h.k === '-' ? 'rgba(255,143,163,.16)'
                 : 'transparent';
        const ink = h.k === '+' ? '#355a23' : h.k === '-' ? '#7a1f33' : '#5a4a3a';
        return (
          <div key={i} style={{
            display: 'flex', background: bg, color: ink,
            borderLeft: '3px solid ' + (h.k === '+' ? '#8FCB6F' : h.k === '-' ? '#FF8FA3' : 'transparent'),
          }}>
            <span style={{ width: 18, textAlign: 'center', userSelect: 'none', flex: '0 0 auto',
              color: h.k === '+' ? '#447A2A' : h.k === '-' ? '#B0445A' : 'rgba(63,54,44,.3)' }}>
              {h.k || ' '}
            </span>
            <span style={{ flex: 1, paddingRight: 14 }}
              dangerouslySetInnerHTML={{ __html: h.t || '&nbsp;' }} />
          </div>
        );
      })}
    </div>
  </div>
);

const Terminal = ({ lines }) => (
  <div style={{
    margin: '16px 0', borderRadius: 14, overflow: 'hidden',
    background: '#1f1a14',
    boxShadow: '0 12px 30px rgba(20,15,5,.25)',
    border: '1px solid #2c2519',
  }}>
    <div style={{
      background: '#2c2519', padding: '8px 14px',
      display: 'flex', alignItems: 'center', gap: 10,
    }}>
      <span style={{ display: 'flex', gap: 5 }}>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff8e7e' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#fbc14d' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#8fcb6f' }} />
      </span>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, color: '#a89880', flex: 1, textAlign: 'center' }}>
        ~ / yuki / hanami
      </span>
    </div>
    <div style={{
      padding: '14px 16px',
      fontFamily: 'var(--font-mono)', fontSize: 12.5, lineHeight: 1.75,
    }}>
      {lines.map((l, i) => {
        if (typeof l === 'string') {
          // command
          return (
            <div key={i} style={{ color: '#e8dfcf' }}>
              <span style={{ color: '#FF8FA3' }}>❀</span>{' '}
              <span style={{ color: '#FFE38B' }}>~/hanami</span>{' '}
              <span style={{ color: '#8FCB6F' }}>›</span>{' '}
              <span dangerouslySetInnerHTML={{ __html: l }} />
            </div>
          );
        }
        // output / err / ok line
        const color = l.k === 'err' ? '#ff8e7e' : l.k === 'ok' ? '#8FCB6F' : l.k === 'dim' ? '#7a6e5a' : '#cfc3a8';
        return (
          <div key={i} style={{ color, paddingLeft: 16 }}
            dangerouslySetInnerHTML={{ __html: l.t }} />
        );
      })}
      <div style={{ color: '#cfc3a8' }}>
        <span style={{ color: '#FF8FA3' }}>❀</span>{' '}
        <span style={{ color: '#FFE38B' }}>~/hanami</span>{' '}
        <span style={{ color: '#8FCB6F' }}>›</span>{' '}
        <span style={{
          display: 'inline-block', width: 8, height: 14,
          background: '#FFE38B', verticalAlign: '-3px', marginLeft: 2,
        }} className="hb-blink" />
      </div>
    </div>
  </div>
);

/* ─────────────────────────── Data table ─────────────────────────── */
const RcTable = ({ caption, headers, rows }) => (
  <div style={{ margin: '18px 0' }}>
    {caption && (
      <div style={{
        fontFamily: 'var(--font-hand)', fontSize: 16, color: 'var(--rose-deep)',
        marginBottom: 6,
      }}>{caption}</div>
    )}
    <div style={{
      borderRadius: 14, overflow: 'hidden',
      border: '1px solid var(--line)',
      background: 'var(--paper)',
      boxShadow: 'var(--shadow-sm)',
    }}>
      <div style={{
        display: 'grid', gridTemplateColumns: `repeat(${headers.length}, 1fr)`,
        background: 'linear-gradient(180deg, #f5ede0, #ecddc4)',
        borderBottom: '1px solid rgba(63,54,44,.1)',
        fontSize: 10.5, letterSpacing: '.16em', textTransform: 'uppercase',
        color: '#5a4a3a', fontWeight: 600,
      }}>
        {headers.map((h, i) => (
          <div key={i} style={{
            padding: '10px 14px',
            borderRight: i < headers.length - 1 ? '1px solid rgba(63,54,44,.08)' : 'none',
          }}>{h}</div>
        ))}
      </div>
      {rows.map((r, i) => (
        <div key={i} style={{
          display: 'grid', gridTemplateColumns: `repeat(${headers.length}, 1fr)`,
          borderBottom: i < rows.length - 1 ? '1px solid var(--line)' : 'none',
          fontSize: 13, color: 'var(--ink)',
        }}>
          {r.map((c, j) => (
            <div key={j} style={{
              padding: '12px 14px',
              borderRight: j < r.length - 1 ? '1px solid rgba(63,54,44,.05)' : 'none',
              fontFamily: j === 0 ? 'var(--font-body)' : 'inherit',
              fontWeight: j === 0 ? 600 : 400,
              color: j === 0 ? 'var(--ink)' : 'var(--ink-soft)',
            }}>{c}</div>
          ))}
        </div>
      ))}
    </div>
  </div>
);

/* ─────────────────────────── Do / Don't comparison ─────────────────────────── */
const DoDont = ({ doItem, dontItem }) => (
  <div style={{
    margin: '18px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14,
  }}>
    <div style={{
      padding: '16px 18px', borderRadius: 14,
      background: 'linear-gradient(160deg, rgba(143,203,111,.15), rgba(143,203,111,.05))',
      border: '1.5px solid rgba(111,175,84,.4)',
      position: 'relative',
    }}>
      <div style={{
        position: 'absolute', left: -8, top: -8,
        background: '#8FCB6F', color: 'white',
        padding: '3px 10px', borderRadius: 999,
        fontSize: 10.5, fontWeight: 700, letterSpacing: '.14em',
        textTransform: 'uppercase',
      }}>
        ✓ do
      </div>
      <div style={{ marginTop: 6, fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 600, color: '#2e4818' }}>
        {doItem.title}
      </div>
      <div style={{ marginTop: 6, fontSize: 13, color: '#3e5234', lineHeight: 1.55 }}>
        {doItem.body}
      </div>
      {doItem.code && (
        <pre style={{
          margin: '10px 0 0 0', padding: '10px 12px',
          background: 'rgba(255,255,255,.55)', borderRadius: 8,
          fontFamily: 'var(--font-mono)', fontSize: 12, color: '#2e4818',
          overflow: 'hidden',
        }} dangerouslySetInnerHTML={{ __html: doItem.code }} />
      )}
    </div>
    <div style={{
      padding: '16px 18px', borderRadius: 14,
      background: 'linear-gradient(160deg, rgba(255,143,163,.12), rgba(255,143,163,.04))',
      border: '1.5px solid rgba(212,90,117,.35)',
      position: 'relative',
    }}>
      <div style={{
        position: 'absolute', left: -8, top: -8,
        background: '#D45A75', color: 'white',
        padding: '3px 10px', borderRadius: 999,
        fontSize: 10.5, fontWeight: 700, letterSpacing: '.14em',
        textTransform: 'uppercase',
      }}>
        ✕ not this
      </div>
      <div style={{ marginTop: 6, fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 600, color: '#5c1f2d' }}>
        {dontItem.title}
      </div>
      <div style={{ marginTop: 6, fontSize: 13, color: '#6a2934', lineHeight: 1.55 }}>
        {dontItem.body}
      </div>
      {dontItem.code && (
        <pre style={{
          margin: '10px 0 0 0', padding: '10px 12px',
          background: 'rgba(255,255,255,.55)', borderRadius: 8,
          fontFamily: 'var(--font-mono)', fontSize: 12, color: '#5c1f2d',
          overflow: 'hidden',
        }} dangerouslySetInnerHTML={{ __html: dontItem.code }} />
      )}
    </div>
  </div>
);

/* ─────────────────────────── Deadlock diagram ─────────────────────────── */
const DeadlockDiagram = () => (
  <div style={{
    margin: '20px 0', padding: '24px 24px 16px 24px',
    background: 'linear-gradient(180deg, rgba(95,206,219,.08), rgba(95,206,219,.02))',
    border: '1px solid rgba(95,206,219,.25)',
    borderRadius: 16,
  }}>
    <div style={{
      fontSize: 10.5, letterSpacing: '.16em', textTransform: 'uppercase',
      color: 'var(--ink-faint)', marginBottom: 14,
    }}>fig 1 · the shape of a deadlock</div>
    <svg viewBox="0 0 600 220" width="100%" height="220">
      <defs>
        <marker id="arrowR" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 Z" fill="#D45A75" />
        </marker>
        <marker id="arrowB" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 Z" fill="#1d6975" />
        </marker>
      </defs>
      {/* Two transaction boxes */}
      <g>
        <rect x="40" y="30" width="180" height="150" rx="14"
          fill="#FFFFFF" stroke="#FF8FA3" strokeWidth="1.5" />
        <text x="130" y="60" textAnchor="middle"
          fontFamily="var(--font-display)" fontSize="14" fontWeight="600" fill="#7a1f33">
          Transaction A
        </text>
        <line x1="55" y1="74" x2="205" y2="74" stroke="#FF8FA3" strokeWidth=".8" strokeDasharray="4 3" />
        <text x="60" y="100" fontFamily="var(--font-mono)" fontSize="11.5" fill="#5a4a3a">
          1. holds &nbsp;<tspan fill="#1d6975" fontWeight="700">orders[7]</tspan>
        </text>
        <text x="60" y="124" fontFamily="var(--font-mono)" fontSize="11.5" fill="#5a4a3a">
          2. wants <tspan fill="#D45A75" fontWeight="700">invoices[7]</tspan>
        </text>
        <text x="60" y="156" fontFamily="var(--font-hand)" fontSize="14" fill="#D45A75">
          waiting…
        </text>
      </g>
      <g>
        <rect x="380" y="30" width="180" height="150" rx="14"
          fill="#FFFFFF" stroke="#5FCEDB" strokeWidth="1.5" />
        <text x="470" y="60" textAnchor="middle"
          fontFamily="var(--font-display)" fontSize="14" fontWeight="600" fill="#1d6975">
          Transaction B
        </text>
        <line x1="395" y1="74" x2="545" y2="74" stroke="#5FCEDB" strokeWidth=".8" strokeDasharray="4 3" />
        <text x="400" y="100" fontFamily="var(--font-mono)" fontSize="11.5" fill="#5a4a3a">
          1. holds &nbsp;<tspan fill="#D45A75" fontWeight="700">invoices[7]</tspan>
        </text>
        <text x="400" y="124" fontFamily="var(--font-mono)" fontSize="11.5" fill="#5a4a3a">
          2. wants <tspan fill="#1d6975" fontWeight="700">orders[7]</tspan>
        </text>
        <text x="400" y="156" fontFamily="var(--font-hand)" fontSize="14" fill="#1d6975">
          waiting…
        </text>
      </g>
      {/* Curved arrows pointing at each other */}
      <path d="M 220 80 Q 300 40 380 80"
        stroke="#D45A75" strokeWidth="2" fill="none"
        markerEnd="url(#arrowR)" strokeDasharray="0" />
      <path d="M 380 150 Q 300 190 220 150"
        stroke="#1d6975" strokeWidth="2" fill="none"
        markerEnd="url(#arrowB)" />
      <text x="300" y="40" textAnchor="middle"
        fontFamily="var(--font-hand)" fontSize="14" fill="#D45A75">
        A waits for B's invoice lock
      </text>
      <text x="300" y="210" textAnchor="middle"
        fontFamily="var(--font-hand)" fontSize="14" fill="#1d6975">
        B waits for A's order lock
      </text>
    </svg>
    <div style={{
      marginTop: 4, fontSize: 12, color: 'var(--ink-soft)', textAlign: 'center',
      fontStyle: 'italic',
    }}>
      Each transaction holds what the other needs. Neither can move.
    </div>
  </div>
);

/* ─────────────────────────── Callouts (named variants) ─────────────────────────── */
const RcCallout = ({ kind = 'tip', title, children }) => {
  const map = {
    tip:    { bg: 'linear-gradient(160deg, #DDF1CC, #B8E098)', border: 'rgba(111,175,84,.4)', ink: '#2e4818', icon: 'leaf',    label: 'tip',     handle: 'pro tip —' },
    note:   { bg: 'linear-gradient(160deg, #DCF0F4, #B6E9EE)', border: 'rgba(95,206,219,.35)', ink: '#1d6975', icon: 'sparkle', label: 'note',    handle: 'good to know —' },
    warn:   { bg: 'linear-gradient(160deg, #FFE5D2, #FAC8A8)', border: 'rgba(198,138,99,.4)',  ink: '#7a3f1f', icon: 'flame',   label: 'careful', handle: 'watch out —' },
    quote:  { bg: 'linear-gradient(160deg, #FFF7E1, #FFEAB3)', border: 'rgba(229,169,60,.4)',  ink: '#5a3f0a', icon: 'sparkle', label: 'wisdom',  handle: 'remember —' },
    danger: { bg: 'linear-gradient(160deg, #FFE0E6, #FFC8D2)', border: 'rgba(212,90,117,.4)',  ink: '#5c1f2d', icon: 'bug',     label: 'danger',  handle: 'careful —' },
    success:{ bg: 'linear-gradient(160deg, #E0F0CC, #C4E3AC)', border: 'rgba(111,175,84,.5)',  ink: '#2e4818', icon: 'check',   label: 'nice',    handle: 'you did it —' },
  };
  const s = map[kind];
  return (
    <div style={{
      margin: '14px 0', padding: '14px 18px',
      background: s.bg, border: '1.5px solid ' + s.border,
      borderRadius: 14, display: 'flex', gap: 14,
    }}>
      <div style={{
        flex: '0 0 auto', width: 30, height: 30, borderRadius: 10,
        background: 'rgba(255,255,255,.7)', display: 'grid', placeItems: 'center',
        color: s.ink,
      }}>
        <Icon name={s.icon} size={15} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <span style={{
            fontFamily: 'var(--font-hand)', fontSize: 16, color: s.ink, transform: 'rotate(-1deg)',
            display: 'inline-block',
          }}>
            {s.handle}
          </span>
          {title && (
            <span style={{ fontSize: 11, color: s.ink, opacity: .7,
              letterSpacing: '.14em', textTransform: 'uppercase' }}>
              {title}
            </span>
          )}
        </div>
        <div style={{ marginTop: 4, fontSize: 13.5, color: s.ink, lineHeight: 1.6 }}>
          {children}
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────── Footnotes block ─────────────────────────── */
const FootnotesList = ({ items }) => (
  <div style={{
    margin: '28px 0 0 0', paddingTop: 18,
    borderTop: '1.5px dashed var(--line-strong)',
  }}>
    <div style={{
      fontFamily: 'var(--font-hand)', fontSize: 18, color: 'var(--rose-deep)',
      transform: 'rotate(-1deg)', display: 'inline-block', marginBottom: 8,
    }}>
      footnotes —
    </div>
    {items.map((it, i) => (
      <div key={i} style={{
        display: 'flex', gap: 10, alignItems: 'flex-start',
        fontSize: 12, color: 'var(--ink-soft)', lineHeight: 1.6,
        padding: '4px 0',
      }}>
        <span style={{
          fontSize: 10, fontWeight: 700, color: '#D45A75',
          background: 'rgba(255,143,163,.18)', borderRadius: 4,
          padding: '0 5px', flex: '0 0 auto', marginTop: 2,
        }}>{i + 1}</span>
        <span>{it}</span>
      </div>
    ))}
  </div>
);

Object.assign(window, {
  RcH2, RcH3, RcLead, RcP, DropCap, Hi, Code, Kbd, Foot,
  PullQuote, BlockQuote, KeyTerm,
  RcOrdered, RcChecklist, RcBullets,
  CodeFile, Diff, Terminal, RcTable, DoDont, DeadlockDiagram, RcCallout, FootnotesList,
});
