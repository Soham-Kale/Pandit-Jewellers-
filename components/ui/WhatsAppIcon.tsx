/** Lucide has no brand icons; a minimal line-style WhatsApp glyph to match. */
export default function WhatsAppIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M3.5 20.5l1.3-4.1A8.5 8.5 0 1 1 8 19.4z" strokeLinejoin="round" />
      <path
        d="M9 8.6c.2-.5.5-.6.8-.6h.5c.2 0 .4.1.5.4l.7 1.6c.1.2 0 .5-.1.6l-.5.6c-.1.2-.1.4 0 .5.6 1 1.4 1.8 2.5 2.4.2.1.4.1.5-.1l.6-.6c.2-.2.4-.2.6-.1l1.6.7c.3.1.4.3.4.5v.5c0 .4-.2.7-.6.9-.6.3-1.4.4-2.3.1-2.4-.8-4.3-2.7-5.1-5.1-.2-.8-.1-1.5.3-2.1z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}
