// import React from 'react'
import { useResume } from '../context/ResumeContext'

const themeToClasses: Record<string, { accent: string; chip: string; border: string; headerBg: string }> = {
  slate: { 
    accent: 'text-slate-900', 
    chip: 'bg-slate-100 text-slate-800 border-slate-300', 
    border: 'border-slate-200',
    headerBg: 'bg-gradient-to-r from-slate-700 to-slate-900'
  },
  emerald: { 
    accent: 'text-emerald-700', 
    chip: 'bg-emerald-50 text-emerald-800 border-emerald-300', 
    border: 'border-emerald-200',
    headerBg: 'bg-gradient-to-r from-emerald-600 to-teal-700'
  },
  indigo: { 
    accent: 'text-indigo-700', 
    chip: 'bg-indigo-50 text-indigo-800 border-indigo-300', 
    border: 'border-indigo-200',
    headerBg: 'bg-gradient-to-r from-indigo-600 to-purple-700'
  },
  rose: { 
    accent: 'text-rose-700', 
    chip: 'bg-rose-50 text-rose-800 border-rose-300', 
    border: 'border-rose-200',
    headerBg: 'bg-gradient-to-r from-rose-600 to-pink-700'
  }
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
  layout: 'single' | 'two-column' | 'modern'
}> = {
  professional: {
    container: 'rounded-none border-0',
    header: 'px-10 py-12 text-white relative overflow-hidden',
    name: 'text-5xl font-bold tracking-tight mb-2',
    title: 'text-lg text-white/90 font-medium',
    section: 'px-10 py-6 space-y-10',
    sectionTitle: 'text-xs uppercase tracking-widest font-bold pb-2 mb-4 border-b-2',
    card: 'pb-5 border-b last:border-b-0',
    contact: 'mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/90',
    layout: 'single'
  },
  minimal: {
    container: 'rounded-none border-l-4',
    header: 'px-10 py-10 bg-white border-b-2',
    name: 'text-4xl font-bold tracking-tight',
    title: 'text-base text-slate-600 mt-2 font-medium',
    section: 'px-10 py-8 space-y-8',
    sectionTitle: 'text-sm font-bold text-slate-900 uppercase tracking-wide mb-4',
    card: 'pb-4 mb-4 border-b border-slate-200 last:border-b-0',
    contact: 'mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm text-slate-700',
    layout: 'single'
  },
  creative: {
    container: 'rounded-xl border-2 shadow-lg overflow-hidden',
    header: 'px-12 py-14 relative',
    name: 'text-5xl font-black tracking-tight mb-3 relative z-10',
    title: 'text-xl font-semibold relative z-10',
    section: 'px-12 py-8 space-y-10',
    sectionTitle: 'text-base font-black uppercase tracking-widest mb-5 flex items-center gap-3',
    card: 'p-5 rounded-xl border-2 bg-white shadow-sm hover:shadow-md transition-shadow',
    contact: 'mt-5 flex flex-wrap gap-x-7 gap-y-2 text-sm font-medium relative z-10',
    layout: 'modern'
  }
}

export function ResumePreview() {
  const { data } = useResume()
  const t = themeToClasses[data.theme]
  const template = templateStyles[data.template]

  return (
    <div id="resume-preview" className={`bg-white ${template.container} ${template.layout === 'single' ? t.border : ''}`}>
      {/* Header Section */}
      <div className={`${template.header} ${data.template === 'professional' ? t.headerBg : data.template === 'creative' ? 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50' : ''}`}>
        {data.template === 'professional' && (
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-white rounded-full blur-3xl" />
          </div>
        )}
        
        {data.template === 'creative' && (
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full blur-3xl opacity-30" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full blur-3xl opacity-30" />
          </div>
        )}

        <div className="relative z-10">
          <h1 className={`${template.name} ${data.template === 'professional' ? 'text-white' : data.template === 'creative' ? t.accent : t.accent}`}>
            {data.name}
          </h1>
          <p className={template.title}>{data.title}</p>
          
          <div className={template.contact}>
            {data.contact.email && (
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {data.contact.email}
              </span>
            )}
            {data.contact.phone && (
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {data.contact.phone}
              </span>
            )}
            {data.contact.location && (
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {data.contact.location}
              </span>
            )}
            {data.contact.website && (
              <a className="flex items-center gap-1.5 underline decoration-dotted hover:opacity-70 transition-opacity" href={data.contact.website} target="_blank" rel="noopener noreferrer">
                <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                Website
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={template.section}>
        {/* About Section */}
        {data.about && (
          <section>
            <h2 className={`${template.sectionTitle} ${t.accent}`}>
              {data.template === 'creative' && (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              )}
              Professional Summary
            </h2>
            <p className="text-slate-700 leading-relaxed text-sm">{data.about}</p>
          </section>
        )}

        {/* Skills Section */}
        {data.skills.length > 0 && (
          <section>
            <h2 className={`${template.sectionTitle} ${t.accent}`}>
              {data.template === 'creative' && (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              )}
              Core Competencies
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((s) => (
                <span key={s} className={`px-4 py-1.5 text-xs font-medium rounded-full border ${t.chip}`}>
                  {s}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Experience Section */}
        {data.experiences.length > 0 && (
          <section>
            <h2 className={`${template.sectionTitle} ${t.accent}`}>
              {data.template === 'creative' && (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              )}
              Professional Experience
            </h2>
            <div className="space-y-6">
              {data.experiences.map((e) => (
                <div key={e.id} className={template.card}>
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-bold text-slate-900 text-base">{e.role}</h3>
                        {e.verified && <BadgeVerified />}
                      </div>
                      <p className="text-sm font-medium text-slate-600">{e.company}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-semibold text-slate-500 whitespace-nowrap bg-slate-100 px-3 py-1 rounded-full">
                        {e.start} — {e.end}
                      </p>
                    </div>
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed">{e.summary}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects Section */}
        {data.projects.length > 0 && (
          <section>
            <h2 className={`${template.sectionTitle} ${t.accent}`}>
              {data.template === 'creative' && (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              )}
              Key Projects
            </h2>
            <div className="space-y-6">
              {data.projects.map((p) => (
                <div key={p.id} className={template.card}>
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3 flex-1">
                      <h3 className="font-bold text-slate-900 text-base">{p.name}</h3>
                      {p.verified && <BadgeVerified />}
                    </div>
                    {p.link && (
                      <a 
                        className="text-xs font-medium text-indigo-600 hover:text-indigo-700 underline decoration-dotted whitespace-nowrap flex items-center gap-1" 
                        href={p.link} 
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        View Project
                      </a>
                    )}
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed">{p.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education Section */}
        {data.education.length > 0 && (
          <section>
            <h2 className={`${template.sectionTitle} ${t.accent}`}>
              {data.template === 'creative' && (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                </svg>
              )}
              Education
            </h2>
            <div className="space-y-4">
              {data.education.map((ed) => (
                <div key={ed.id} className={data.template === 'creative' ? template.card : 'pb-4 border-b border-slate-200 last:border-b-0'}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-bold text-slate-900 text-base">{ed.school}</h3>
                        {ed.verified && <BadgeVerified />}
                      </div>
                      <p className="text-sm text-slate-600 font-medium">{ed.degree}</p>
                    </div>
                    <p className="text-xs font-semibold text-slate-500 whitespace-nowrap bg-slate-100 px-3 py-1 rounded-full">
                      {ed.start} — {ed.end}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

function BadgeVerified() {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-sm">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
      VERIFIED
    </span>
  )
}