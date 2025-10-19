import React from 'react'
import { useResume } from '../context/ResumeContext'

export function CustomizationPanel(): JSX.Element {
  const { data, setData } = useResume()

  return (
    <div className="bg-white rounded-3xl surface p-6 space-y-6 sticky top-20">
      <div>
        <p className="text-xs uppercase tracking-wider font-semibold text-slate-700">Theme</p>
        <div className="mt-3 grid grid-cols-4 gap-2">
          {(['slate', 'emerald', 'indigo', 'rose'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setData((d) => ({ ...d, theme: t }))}
              className={`px-2 py-1 rounded-lg text-xs border border-slate-200 transition ${
                dEq(data.theme, t) ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs uppercase tracking-wider font-semibold text-slate-700">Header</p>
        <div className="mt-3 grid gap-3">
          <input
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            placeholder="Name"
            value={data.name}
            onChange={(e) => setData((d) => ({ ...d, name: e.target.value }))}
          />
          <input
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            placeholder="Title"
            value={data.title}
            onChange={(e) => setData((d) => ({ ...d, title: e.target.value }))}
          />
          <textarea
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            placeholder="About"
            rows={3}
            value={data.about}
            onChange={(e) => setData((d) => ({ ...d, about: e.target.value }))}
          />
        </div>
      </div>

      <div>
        <p className="text-xs uppercase tracking-wider font-semibold text-slate-700">Contact</p>
        <div className="mt-3 grid gap-3">
          <input
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            placeholder="Email"
            value={data.contact.email}
            onChange={(e) => setData((d) => ({ ...d, contact: { ...d.contact, email: e.target.value } }))}
          />
          <input
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            placeholder="Phone"
            value={data.contact.phone}
            onChange={(e) => setData((d) => ({ ...d, contact: { ...d.contact, phone: e.target.value } }))}
          />
          <input
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            placeholder="Location"
            value={data.contact.location}
            onChange={(e) => setData((d) => ({ ...d, contact: { ...d.contact, location: e.target.value } }))}
          />
          <input
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            placeholder="Website"
            value={data.contact.website ?? ''}
            onChange={(e) => setData((d) => ({ ...d, contact: { ...d.contact, website: e.target.value } }))}
          />
        </div>
      </div>
    </div>
  )
}

function dEq<T>(a: T, b: T): boolean { return a === b }



