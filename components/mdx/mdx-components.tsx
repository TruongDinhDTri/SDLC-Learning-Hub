import React, { ReactNode } from 'react'
import { Callout } from './Callout'
import { Step } from './Step'
import { Checklist } from './Checklist'
import { PhaseHeader } from './PhaseHeader'
import { StatusBadge } from './StatusBadge'
import { TagRow } from './TagRow'
import { CodeBlock } from './CodeBlock'

export const mdxComponents = {
  // Custom MDX components
  Callout,
  Step,
  Checklist,
  PhaseHeader,
  StatusBadge,
  TagRow,
  CodeBlock,

  // HTML element overrides
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 {...props} style={{
      fontFamily: 'var(--font-display)',
      fontSize: 28,
      fontWeight: 600,
      color: 'var(--ink)',
      lineHeight: 1.3,
      margin: '0 0 16px',
    }} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 {...props} style={{
      fontFamily: 'var(--font-display)',
      fontSize: 20,
      fontWeight: 600,
      color: 'var(--ink)',
      lineHeight: 1.3,
      margin: '28px 0 12px',
    }} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 {...props} style={{
      fontSize: 16,
      fontWeight: 600,
      color: 'var(--ink-soft)',
      margin: '20px 0 8px',
    }} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p {...props} style={{
      fontSize: 14.5,
      color: 'var(--ink-soft)',
      lineHeight: 1.75,
      margin: '0 0 14px',
    }} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul {...props} style={{
      paddingLeft: 20,
      margin: '8px 0 14px',
      color: 'var(--ink-soft)',
      fontSize: 14,
    }} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol {...props} style={{
      paddingLeft: 20,
      margin: '8px 0 14px',
      color: 'var(--ink-soft)',
      fontSize: 14,
    }} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li {...props} style={{ marginBottom: 5, lineHeight: 1.6 }} />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code {...props} style={{
      fontFamily: 'var(--font-mono)',
      fontSize: 12.5,
      background: 'rgba(196, 130, 126, 0.1)',
      padding: '1px 5px',
      borderRadius: 4,
      color: '#8B4513',
    }} />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement> & { children?: React.ReactElement<{ className?: string; children?: ReactNode }> }) => {
    const codeEl = props.children
    if (!codeEl || typeof codeEl !== 'object') return <pre {...props} />
    const text = typeof codeEl.props?.children === 'string' ? codeEl.props.children : ''
    const lang = (codeEl.props?.className as string | undefined)?.replace('language-', '') ?? undefined
    return <CodeBlock language={lang}>{text}</CodeBlock>
  },
  blockquote: (props: React.HTMLAttributes<HTMLElement>) => (
    <blockquote {...props} style={{
      borderLeft: '3px solid var(--lavender)',
      paddingLeft: 16,
      margin: '14px 0',
      fontFamily: 'var(--font-hand)',
      fontSize: 16,
      color: 'var(--ink-soft)',
      fontStyle: 'italic',
      lineHeight: 1.7,
    }} />
  ),
  hr: () => (
    <div className="hb-divider" style={{ margin: '24px 0' }}>✦</div>
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong {...props} style={{ fontWeight: 600, color: 'var(--ink)' }} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a {...props} style={{
      color: 'var(--peach-deep)',
      textDecoration: 'underline',
      textDecorationColor: 'var(--peach-soft)',
    }} />
  ),
}
