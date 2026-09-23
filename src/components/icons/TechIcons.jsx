import React from "react";

export function ReactIcon({ className = "w-5 h-5", ...props }) {
  return (
    <svg viewBox="-11.5 -10.23174 23 20.46348" fill="currentColor" className={className} aria-hidden="true" {...props}>
      <circle cx="0" cy="0" r="2.05" />
      <g stroke="currentColor" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
}

export function NextjsIcon({ className = "w-5 h-5", ...props }) {
  return (
    <svg viewBox="0 0 180 180" fill="currentColor" className={className} aria-hidden="true" {...props}>
      <mask height="180" id="nextjs-mask" maskUnits="userSpaceOnUse" width="180" x="0" y="0" style={{ maskType: "alpha" }}>
        <circle cx="90" cy="90" fill="black" r="90" />
      </mask>
      <g mask="url(#nextjs-mask)">
        <circle cx="90" cy="90" fill="currentColor" r="90" />
        <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="white" />
        <rect fill="white" height="72" width="12" x="115" y="54" />
      </g>
    </svg>
  );
}

export function VueIcon({ className = "w-5 h-5", ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true" {...props}>
      <path d="M12 15.2L18.8 3.5H15.2L12 9.1L8.8 3.5H5.2L12 15.2ZM2 3.5L12 20.8L22 3.5H17.8L12 13.5L6.2 3.5H2Z" />
    </svg>
  );
}

export function LaravelIcon({ className = "w-5 h-5", ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true" {...props}>
      <path d="M18.8 8.6l-5.6-3.2c-.4-.2-.8-.2-1.2 0L6.4 8.6c-.4.2-.6.6-.6 1v6.4c0 .4.2.8.6 1l5.6 3.2c.2.1.4.2.6.2.2 0 .4-.1.6-.2l5.6-3.2c.4-.2.6-.6.6-1V9.6c0-.4-.2-.8-.6-1zm-6.2 9.5l-4.5-2.6V11l4.5 2.6v4.5zm1.1-6.1l-4.5-2.6 4.5-2.6 4.5 2.6-4.5 2.6zm4.5 4.6l-3.4 1.9v-4.5l3.4-1.9v4.5z" />
    </svg>
  );
}

export function FlaskIcon({ className = "w-5 h-5", ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}>
      <path d="M9 3h6M10 3v6l-5 8.5A2 2 0 0 0 6.7 20.5h10.6a2 2 0 0 0 1.7-3L14 9V3" />
      <path d="M8.5 14h7" />
    </svg>
  );
}

export function LivewireIcon({ className = "w-5 h-5", ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true" {...props}>
      <path d="M13.5 2L3 14h8l-1.5 8L21 10h-8l1.5-8z" />
    </svg>
  );
}

export function TailwindIcon({ className = "w-5 h-5", ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true" {...props}>
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.335 6.182 14.974 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.335 13.382 8.974 12 6.001 12z" />
    </svg>
  );
}

export function PythonIcon({ className = "w-5 h-5", ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true" {...props}>
      <path d="M11.914 0C8.508 0 8.7 1.48 8.7 1.48l.006 1.535h3.298v.492H4.896S2.63 3.248 2.63 6.643c0 3.394 1.986 3.267 1.986 3.267h1.183v-1.66s-.065-1.986 1.954-1.986h3.364s1.888.03 1.888-1.826V2.696S13.328 0 11.914 0zm-1.85 1.018c.365 0 .66.296.66.66 0 .365-.295.66-.66.66-.364 0-.66-.295-.66-.66 0-.364.296-.66.66-.66zM12.086 24c3.406 0 3.214-1.48 3.214-1.48l-.006-1.535h-3.298v-.492h7.108s2.266.259 2.266-3.136c0-3.395-1.986-3.268-1.986-3.268h-1.183v1.66s.065 1.987-1.954 1.987h-3.364s-1.888-.031-1.888 1.825v1.734s-.318 2.699 1.096 2.699zm1.85-1.018a.66.66 0 1 1 0-1.32.66.66 0 0 1 0 1.32z" />
    </svg>
  );
}

export function NodejsIcon({ className = "w-5 h-5", ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true" {...props}>
      <path d="M12 2.163l9.5 5.485v10.97L12 24.103l-9.5-5.485V7.648L12 2.163zm7.6 15.345V8.745L12 4.354 4.4 8.745v8.763L12 21.912l7.6-4.404z" />
    </svg>
  );
}

export function PhpIcon({ className = "w-5 h-5", ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true" {...props}>
      <path d="M12 3C7.03 3 3 7.03 3 12s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm-4.5 12.5H6.2l1.1-5h2.1c1.2 0 1.9.6 1.7 1.6-.2 1.3-1.1 2-2.3 2H7.9l-.4 1.4zm6.2 0h-1.3l1.1-5h1.3l-.3 1.3h1.8c1.2 0 1.9.6 1.7 1.6-.2 1.3-1.1 2-2.3 2h-1.3l-.7 2.1zm-4.7-4.2h.8c.6 0 1-.3 1.1-.9.1-.5-.2-.7-.7-.7h-.7l-.5 1.6zm6.3 0h.8c.6 0 1-.3 1.1-.9.1-.5-.2-.7-.7-.7h-.7l-.5 1.6z" />
    </svg>
  );
}

export function JavaScriptIcon({ className = "w-5 h-5", ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true" {...props}>
      <path d="M3 3h18v18H3V3zm14.7 13.5c-.5.8-1.4 1.3-2.6 1.3-2.1 0-3.3-1.4-3.3-3.6 0-2.3 1.4-3.7 3.5-3.7 1.2 0 2 .5 2.5 1.2l-1.3 1c-.3-.5-.7-.8-1.2-.8-.9 0-1.6.7-1.6 2.3 0 1.5.6 2.2 1.6 2.2.5 0 .9-.2 1.2-.6l1.2 1.1zm-6-5.8v6.9c0 1.5-.7 2.2-2 2.2-.9 0-1.6-.4-1.9-1l1.2-.9c.2.4.4.6.7.6.4 0 .6-.2.6-.9v-6.9h1.4z" />
    </svg>
  );
}

export function MySQLIcon({ className = "w-5 h-5", ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  );
}

export function SQLiteIcon({ className = "w-5 h-5", ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true" {...props}>
      <path d="M12 2C6.48 2 2 4.02 2 6.5v11C2 19.98 6.48 22 12 22s10-2.02 10-4.5v-11C22 4.02 17.52 2 12 2zm0 2.2c4.8 0 8 1.5 8 2.3s-3.2 2.3-8 2.3-8-1.5-8-2.3 3.2-2.3 8-2.3zm8 13.3c0 .8-3.2 2.3-8 2.3s-8-1.5-8-2.3v-2.2c2.1 1.2 5 1.9 8 1.9s5.9-.7 8-1.9v2.2zm0-4.5c0 .8-3.2 2.3-8 2.3s-8-1.5-8-2.3v-2.2c2.1 1.2 5 1.9 8 1.9s5.9-.7 8-1.9v2.2z" />
    </svg>
  );
}

export function GitIcon({ className = "w-5 h-5", ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true" {...props}>
      <path d="M21.6 10.8l-8.4-8.4c-.8-.8-2-.8-2.8 0L8.7 4.1l3.5 3.5c.8-.3 1.7-.1 2.3.5.6.6.8 1.5.5 2.3l3.4 3.4c.8-.3 1.7-.1 2.3.5.9.9.9 2.3 0 3.2s-2.3.9-3.2 0c-.7-.7-.9-1.7-.5-2.5l-3.2-3.2v4.8c.4.3.7.8.7 1.4 0 1.1-.9 2-2 2s-2-.9-2-2c0-.6.3-1.1.7-1.4V9.3c-.4-.3-.7-.8-.7-1.4 0-.8.5-1.5 1.3-1.8L5.6 2.6c-.8-.8-2-.8-2.8 0l-1.4 1.4c-.8.8-.8 2 0 2.8l10.8 10.8c.8.8 2 .8 2.8 0l6.6-6.6c.8-.8.8-2 0-2.8z" />
    </svg>
  );
}

export function TensorFlowIcon({ className = "w-5 h-5", ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true" {...props}>
      <path d="M12 2.5L3.5 7.4v9.8l4-2.3v-5.2l4.5 2.6v9.8l4.5-2.6V9.7l4 2.3V7.4L12 2.5z" />
    </svg>
  );
}

export function ScikitlearnIcon({ className = "w-5 h-5", ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}>
      <circle cx="6" cy="6" r="3" />
      <circle cx="18" cy="18" r="3" />
      <circle cx="18" cy="6" r="3" />
      <line x1="8.5" y1="7.5" x2="15.5" y2="16.5" />
      <line x1="9" y1="6" x2="15" y2="6" />
    </svg>
  );
}

export function StreamlitIcon({ className = "w-5 h-5", ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true" {...props}>
      <path d="M12.7 3.5l8.5 14.8c.4.7-.1 1.7-1 1.7H3.8c-.9 0-1.4-1-1-1.7l8.5-14.8c.5-.7 1.4-.7 1.4 0zm-2 4.5l-5.6 9.8h13.8L13.3 8c-.3-.5-1-.5-1.3 0z" />
    </svg>
  );
}

export function ChartjsIcon({ className = "w-5 h-5", ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}>
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
      <line x1="2" y1="20" x2="22" y2="20" />
    </svg>
  );
}

export function PytestIcon({ className = "w-5 h-5", ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}>
      <path d="M9 12l2 2 4-4" />
      <path d="M12 3a9 9 0 1 0 9 9 9 9 0 0 0-9-9z" />
    </svg>
  );
}

export function PostmanIcon({ className = "w-5 h-5", ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M10 8l6 4-6 4V8z" />
    </svg>
  );
}
