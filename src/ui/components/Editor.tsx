import React, { useMemo, useState } from 'react'
import { useResume } from '../context/ResumeContext'
import type { Experience, Project, Education } from '../context/ResumeContext'

type Step = 'basic' | 'about' | 'experience' | 'projects' | 'education' | 'template'
const steps: Step[] = ['basic', 'about', 'experience', 'projects', 'education', 'template']

export function Editor() {
  const { data, setData } = useResume()
  const [active, setActive] = useState<Step>('basic')

  // completion check
  const isComplete = useMemo(() => {
    const hasBasic = data.name.trim() && data.title.trim() && data.contact.email.trim()
    const hasAbout = data.about.trim() && data.skills.length > 0
    const hasExperience = data.experiences.length > 0
    const hasProjects = data.projects.length > 0
    const hasEdu = data.education.length > 0
    return Boolean(hasBasic && hasAbout && hasExperience && hasProjects && hasEdu)
  }, [data])

  // Removed auto-print; PDF is generated from the header button only

  const goNext = () => {
    const idx = steps.indexOf(active)
    if (idx < steps.length - 1) setActive(steps[idx + 1])
  }
  const goBack = () => {
    const idx = steps.indexOf(active)
    if (idx > 0) setActive(steps[idx - 1])
  }

  return (
    <div className="bg-white rounded-3xl surface overflow-hidden">
      <nav className="flex flex-wrap gap-2 border-b border-slate-200 p-4">
        {steps.map((s) => (
          <button
            key={s}
            onClick={() => setActive(s)}
            className={`px-3 py-1.5 rounded-lg text-xs border transition ${
              active === s ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
            }`}
          >
            {label(s)}
          </button>
        ))}
      </nav>

      <div className="p-6">
        {active === 'basic' && (
          <div className="grid gap-3">
            <Field label="Name" value={data.name} onChange={(v) => setData((d) => ({ ...d, name: v }))} />
            <Field label="Role" value={data.title} onChange={(v) => setData((d) => ({ ...d, title: v }))} />
            <div className="grid grid-cols-2 gap-3">
              <Field label="Email" value={data.contact.email} onChange={(v) => setData((d) => ({ ...d, contact: { ...d.contact, email: v } }))} />
              <Field label="Phone" value={data.contact.phone} onChange={(v) => setData((d) => ({ ...d, contact: { ...d.contact, phone: v } }))} />
              <Field label="Location" value={data.contact.location} onChange={(v) => setData((d) => ({ ...d, contact: { ...d.contact, location: v } }))} />
              <Field label="Website" value={data.contact.website ?? ''} onChange={(v) => setData((d) => ({ ...d, contact: { ...d.contact, website: v } }))} />
            </div>
          </div>
        )}

        {active === 'about' && (
          <div className="grid gap-4">
            <Area label="Summary" rows={4} value={data.about} onChange={(v) => setData((d) => ({ ...d, about: v }))} />
            <TagInput
              label="Skills"
              values={data.skills}
              onChange={(skills) => setData((d) => ({ ...d, skills }))}
              placeholder="Add a skill and press Enter"
            />
          </div>
        )}

        {active === 'experience' && (
          <Collection<Experience>
            label="Experience"
            items={data.experiences}
            newItem={() => ({ id: crypto.randomUUID(), company: '', role: '', start: '', end: '', summary: '' })}
            render={(item, update) => (
              <div className="grid gap-3">
                <Field label="Company" value={item.company} onChange={(v) => update({ ...item, company: v })} />
                <Field label="Role" value={item.role} onChange={(v) => update({ ...item, role: v })} />
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Start" value={item.start} onChange={(v) => update({ ...item, start: v })} />
                  <Field label="End" value={item.end} onChange={(v) => update({ ...item, end: v })} />
                </div>
                <Area label="Summary" rows={3} value={item.summary} onChange={(v) => update({ ...item, summary: v })} />
                <Toggle label="Verified" checked={!!item.verified} onChange={(v) => update({ ...item, verified: v })} />
              </div>
            )}
            onChange={(items) => setData((d) => ({ ...d, experiences: items }))}
          />
        )}

        {active === 'projects' && (
          <Collection<Project>
            label="Projects"
            items={data.projects}
            newItem={() => ({ id: crypto.randomUUID(), name: '', description: '', link: '' })}
            render={(item, update) => (
              <div className="grid gap-3">
                <Field label="Name" value={item.name} onChange={(v) => update({ ...item, name: v })} />
                <Area label="Description" rows={3} value={item.description} onChange={(v) => update({ ...item, description: v })} />
                <Field label="Link" value={item.link ?? ''} onChange={(v) => update({ ...item, link: v })} />
                <Toggle label="Verified" checked={!!item.verified} onChange={(v) => update({ ...item, verified: v })} />
              </div>
            )}
            onChange={(items) => setData((d) => ({ ...d, projects: items }))}
          />
        )}

        {active === 'education' && (
          <Collection<Education>
            label="Education"
            items={data.education}
            newItem={() => ({ id: crypto.randomUUID(), school: '', degree: '', start: '', end: '' })}
            render={(item, update) => (
              <div className="grid gap-3">
                <Field label="School" value={item.school} onChange={(v) => update({ ...item, school: v })} />
                <Field label="Degree" value={item.degree} onChange={(v) => update({ ...item, degree: v })} />
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Start" value={item.start} onChange={(v) => update({ ...item, start: v })} />
                  <Field label="End" value={item.end} onChange={(v) => update({ ...item, end: v })} />
                </div>
                <Toggle label="Verified" checked={!!item.verified} onChange={(v) => update({ ...item, verified: v })} />
              </div>
            )}
            onChange={(items) => setData((d) => ({ ...d, education: items }))}
          />
        )}

        {active === 'template' && (
          <div className="grid gap-4">
            <span className="text-xs font-medium text-slate-700">Template</span>
            <div className="grid grid-cols-3 gap-2">
              {(['professional','minimal','creative'] as const).map(t => (
                <button key={t} onClick={() => setData(d => ({ ...d, template: t }))} className={`px-3 py-2 rounded-lg text-xs border ${data.template===t? 'bg-slate-900 text-white':'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}`}>{t}</button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 flex items-center justify-between">
          <button onClick={goBack} className="px-3 py-2 text-xs rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-40" disabled={active === 'basic'}>
            Back
          </button>
          <div className="text-xs text-slate-600">{isComplete ? 'All sections complete — use Download PDF above' : 'Complete all sections for best PDF outcome'}</div>
          <button onClick={goNext} className="px-3 py-2 text-xs rounded-lg bg-slate-900 text-white disabled:opacity-40" disabled={active === 'education'}>
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

function label(step: Step): string {
  switch (step) {
    case 'basic': return 'Basic Info'
    case 'about': return 'About & Skills'
    case 'experience': return 'Experience'
    case 'projects': return 'Projects'
    case 'education': return 'Education'
    case 'template': return 'Template'
  }
  return 'Editor'
}

function Field(props: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="grid gap-1">
      <span className="text-xs font-medium text-slate-700">{props.label}</span>
      <input className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" value={props.value} onChange={(e) => props.onChange(e.target.value)} />
    </label>
  )
}

function Area(props: { label: string; value: string; rows?: number; onChange: (v: string) => void }) {
  return (
    <label className="grid gap-1">
      <span className="text-xs font-medium text-slate-700">{props.label}</span>
      <textarea rows={props.rows ?? 3} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" value={props.value} onChange={(e) => props.onChange(e.target.value)} />
    </label>
  )
}

function Toggle(props: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="inline-flex items-center gap-2 text-sm">
      <input type="checkbox" className="size-4" checked={props.checked} onChange={(e) => props.onChange(e.target.checked)} />
      <span className="text-xs text-slate-700">{props.label}</span>
    </label>
  )
}

function TagInput(props: { label: string; values: string[]; onChange: (v: string[]) => void; placeholder?: string }) {
  const [input, setInput] = useState('')
  const add = () => {
    const v = input.trim()
    if (!v) return
    if (props.values.includes(v)) return setInput('')
    props.onChange([...props.values, v])
    setInput('')
  }
  const remove = (v: string) => props.onChange(props.values.filter((s) => s !== v))
  return (
    <div className="grid gap-2">
      <span className="text-xs font-medium text-slate-700">{props.label}</span>
      <div className="flex flex-wrap gap-2">
        {props.values.map((s) => (
          <span key={s} className="px-2 py-1 text-xs rounded-full bg-slate-100 text-slate-800 inline-flex items-center gap-1">
            {s}
            <button className="size-4 grid place-items-center rounded hover:bg-slate-200" onClick={() => remove(s)}>×</button>
          </span>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <input
          className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm"
          placeholder={props.placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') { e.preventDefault(); add() }
          }}
        />
        <button onClick={add} className="px-3 py-2 text-xs rounded-lg bg-slate-900 text-white">Add</button>
      </div>
    </div>
  )
}

function Collection<T>(props: {
  label: string
  items: T[]
  newItem: () => T
  render: (item: T, update: (item: T) => void) => React.ReactNode
  onChange: (items: T[]) => void
}) {
  const add = () => props.onChange([...(props.items ?? []), props.newItem()])
  const updateAt = (index: number, item: T) => {
    const next = [...props.items]
    next[index] = item
    props.onChange(next)
  }
  const removeAt = (index: number) => {
    const next = props.items.filter((_, i) => i !== index)
    props.onChange(next)
  }
  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-slate-700">{props.label}</span>
        <button onClick={add} className="px-3 py-1.5 text-xs rounded-lg bg-slate-900 text-white">Add</button>
      </div>
      <div className="grid gap-4">
        {props.items.map((it, idx) => (
          <div key={idx} className="rounded-xl border border-slate-200 p-4 grid gap-3">
            {props.render(it, (next) => updateAt(idx, next))}
            <div className="text-right">
              <button onClick={() => removeAt(idx)} className="px-2 py-1 text-xs rounded-lg border border-slate-200 hover:bg-slate-50">Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


