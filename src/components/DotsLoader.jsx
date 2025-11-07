import React from 'react'

export default function DotsLoader() {
  return (
    <div className="min-h-screen grid place-items-center bg-gray-50">
      <div className="flex items-center gap-3">
        <span className="loader-dot" />
        <span className="loader-dot" />
        <span className="loader-dot" />
      </div>
      <style>{`
        .loader-dot{width:12px;height:12px;border-radius:9999px;background:#7c3aed;display:inline-block;animation:dot-blink 1.2s infinite ease-in-out;opacity:.25}
        .loader-dot:nth-child(2){animation-delay:.2s}
        .loader-dot:nth-child(3){animation-delay:.4s}
        @keyframes dot-blink{0%,80%,100%{opacity:.25;transform:scale(.9)}40%{opacity:1;transform:scale(1)}}
      `}</style>
    </div>
  )
}


