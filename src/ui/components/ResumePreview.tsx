// import React from 'react'
import { useResume } from '../context/ResumeContext'

const themeToClasses: Record<string, { accent: string; chip: string; border: string }> = {
  slate: { accent: 'text-slate-900', chip: 'bg-slate-100 text-slate-800', border: 'border-slate-200' },
  emerald: { accent: 'text-emerald-700', chip: 'bg-emerald-50 text-emerald-800', border: 'border-emerald-200' },
  indigo: { accent: 'text-indigo-700', chip: 'bg-indigo-50 text-indigo-800', border: 'border-indigo-200' },
  rose: { accent: 'text-rose-700', chip: 'bg-rose-50 text-rose-800', border: 'border-rose-200' }
}

const templateStyles: Record<string, {
  container: string
  header: string
  name: string
  title: string
  section: string
  sectionTitle: string
  card: string
  contact: string
}> = {
  professional: {
    container: 'rounded-3xl shadow-lg',
    header: 'px-10 py-10 border-b border-slate-200 bg-gradient-to-br from-white to-slate-50',
    name: 'text-4xl font-extrabold tracking-tight',
    title: 'text-sm text-slate-500 mt-1',
    section: 'px-10 py-8 grid gap-10',
    sectionTitle: 'text-sm uppercase tracking-wider font-semibold',
    card: 'p-4 rounded-xl border border-slate-200',
    contact: 'mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm text-slate-600'
  },
  minimal: {
    container: 'rounded-xl shadow-sm',
    header: 'px-8 py-8 border-b border-slate-300 bg-white',
    name: 'text-3xl font-bold tracking-tight',
    title: 'text-sm text-slate-600 mt-1',
    section: 'px-8 py-6 grid gap-8',
    sectionTitle: 'text-sm font-semibold text-slate-800',
    card: 'p-3 rounded-lg border border-slate-300',
    contact: 'mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-700'
  },
  creative: {
    container: 'rounded-[2rem] shadow-2xl',
    header: 'px-12 py-12 border-b-2 border-indigo-200 bg-gradient-to-br from-indigo-50 via-white to-purple-50',
    name: 'text-5xl font-black tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent',
    title: 'text-base text-indigo-600 mt-2 font-medium',
    section: 'px-12 py-10 grid gap-12',
    sectionTitle: 'text-lg font-bold text-indigo-700 uppercase tracking-widest',
    card: 'p-6 rounded-2xl border-2 border-indigo-100 bg-gradient-to-br from-white to-indigo-50',
    contact: 'mt-6 flex flex-wrap gap-x-8 gap-y-2 text-base text-indigo-700 font-medium'
  }
}

export function ResumePreview() {
  const { data } = useResume()
  const t = themeToClasses[data.theme]
  const template = templateStyles[data.template]

  return (
    <div id="resume-preview" className={`bg-white ${template.container} surface overflow-hidden`}>
      <div className={template.header}>
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className={`${template.name} ${t.accent}`}>{data.name}</h1>
            <p className={template.title}>{data.title}</p>
          </div>
          {/* Removed skills from header */}
        </div>
        <div className={template.contact}>
          <span>{data.contact.email}</span>
          <span>{data.contact.phone}</span>
          <span>{data.contact.location}</span>
          {data.contact.website ? (
            <a className="underline decoration-dotted" href={data.contact.website} target="_blank">Website</a>
          ) : null}
        </div>
      </div>

      <div className={template.section}>
        <section>
          <h2 className={`${template.sectionTitle} ${t.accent}`}>About</h2>
          <p className="mt-3 text-slate-700 leading-7">{data.about}</p>
        </section>

        <section>
          <h2 className={`${template.sectionTitle} ${t.accent}`}>Skills</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {data.skills.map((s) => (
              <span key={s} className={`px-3 py-1 text-xs rounded-full ${t.chip}`}>{s}</span>
            ))}
          </div>
        </section>

        <section>
          <h2 className={`${template.sectionTitle} ${t.accent}`}>Experience</h2>
          <div className="mt-4 grid gap-4">
            {data.experiences.map((e) => (
              <div key={e.id} className={`${template.card} ${t.border}`}>
                <div className="flex items-baseline justify-between gap-4">
                  <div>
                    <p className="font-medium text-slate-900">{e.role}</p>
                    <p className="text-sm text-slate-600">{e.company}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {e.verified ? <BadgeVerified /> : null}
                    <p className="text-xs text-slate-500 whitespace-nowrap">{e.start} — {e.end}</p>
                  </div>
                </div>
                <p className="mt-2 text-slate-700 text-sm leading-6">{e.summary}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className={`${template.sectionTitle} ${t.accent}`}>Projects</h2>
          <div className="mt-4 grid gap-4">
            {data.projects.map((p) => (
              <div key={p.id} className={`${template.card} ${t.border}`}>
                <div className="flex items-baseline justify-between gap-4">
                  <p className="font-medium text-slate-900">{p.name}</p>
                  <div className="flex items-center gap-3">
                    {p.verified ? <BadgeVerified /> : null}
                    {p.link ? (
                      <a className="text-xs underline decoration-dotted" href={p.link} target="_blank">View</a>
                    ) : null}
                  </div>
                </div>
                <p className="mt-2 text-slate-700 text-sm leading-6">{p.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className={`${template.sectionTitle} ${t.accent}`}>Education</h2>
          <div className="mt-4 grid gap-3">
            {data.education.map((ed) => (
              <div key={ed.id} className="flex items-baseline justify-between">
                <div>
                  <p className="font-medium text-slate-900">{ed.school}</p>
                  <p className="text-sm text-slate-600">{ed.degree}</p>
                </div>
                <div className="flex items-center gap-3">
                  {ed.verified ? <BadgeVerified /> : null}
                  <p className="text-xs text-slate-500 whitespace-nowrap">{ed.start} — {ed.end}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

function BadgeVerified() {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 1.5l2.12 2.12 3-.62-.62 3L16.5 8l-2.12 2.12.62 3-3-.62L10 14.5l-2.12-2.12-3 .62.62-3L3.5 8l2.12-2.12-.62-3 3 .62L10 1.5zm3.536 6.95a.75.75 0 10-1.06-1.06L9 10.868 7.525 9.394a.75.75 0 10-1.06 1.06l2 2a.75.75 0 001.06 0l4-4z" clipRule="evenodd" /></svg>
      Verified
    </span>
  )
}


