import React, { useMemo } from 'react'

function startOfDay(date) {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

export default function Calendar({ value, onChange, minDate }) {
  const today = startOfDay(new Date())
  const min = minDate ? startOfDay(minDate) : today

  const current = startOfDay(value || today)

  const startOfMonth = new Date(current.getFullYear(), current.getMonth(), 1)
  const endOfMonth = new Date(current.getFullYear(), current.getMonth() + 1, 0)

  const days = useMemo(() => {
    const firstWeekday = startOfMonth.getDay()
    const totalDays = endOfMonth.getDate()
    const cells = []
    for (let i = 0; i < firstWeekday; i++) cells.push(null)
    for (let d = 1; d <= totalDays; d++) cells.push(new Date(current.getFullYear(), current.getMonth(), d))
    return cells
  }, [current, startOfMonth, endOfMonth])

  const canGoPrev = startOfMonth > min

  const goMonth = (offset) => {
    const next = new Date(current.getFullYear(), current.getMonth() + offset, 1)
    const clamped = next < min ? new Date(min.getFullYear(), min.getMonth(), 1) : next
    onChange(clamped)
  }

  const selectDate = (d) => {
    if (!d) return
    if (startOfDay(d) < min) return
    const chosen = new Date(d)
    const prev = value || today
    chosen.setHours(prev.getHours(), prev.getMinutes(), 0, 0)
    onChange(chosen)
  }

  const isSameDay = (a, b) => a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()

  return (
    <div className="w-full max-w-sm">
      <div className="flex items-center justify-between mb-2">
        <button
          type="button"
          onClick={() => goMonth(-1)}
          disabled={!canGoPrev}
          className="px-2 py-1 rounded border text-sm disabled:opacity-40"
        >
          Prev
        </button>
        <div className="text-sm font-medium">
          {current.toLocaleString(undefined, { month: 'long', year: 'numeric' })}
        </div>
        <button
          type="button"
          onClick={() => goMonth(1)}
          className="px-2 py-1 rounded border text-sm"
        >
          Next
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-[11px] text-gray-500 mb-1">
        {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map((d) => (
          <div key={d} className="text-center">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((d, i) => {
          const disabled = !d || startOfDay(d) < min
          const active = d && isSameDay(d, value)
          return (
            <button
              key={i}
              type="button"
              onClick={() => selectDate(d)}
              disabled={disabled}
              className={`h-8 rounded text-sm ${
                active ? 'bg-emerald-600 text-white' : disabled ? 'text-gray-300' : 'hover:bg-emerald-50'
              }`}
            >
              {d ? d.getDate() : ''}
            </button>
          )
        })}
      </div>
    </div>
  )
}


