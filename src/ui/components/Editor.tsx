import React, { useMemo, useState } from 'react'
import { useResume } from '../context/ResumeContext'
import type { Experience, Project, Education } from '../context/ResumeContext'

type Step = 'basic' | 'about' | 'experience' | 'projects' | 'education' | 'template'
const steps: Step[] = ['basic', 'about', 'experience', 'projects', 'education', 'template']

const stepIcons = {
  basic: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  about: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  experience: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  projects: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
    </svg>
  ),
  education: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    </svg>
  ),
  template: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    </svg>
  )
}

export function Editor() {
  const { data, setData } = useResume()
  const [active, setActive] = useState<Step>('basic')

  const stepCompletion = useMemo(() => ({
    basic: !!(data.name.trim() && data.title.trim() && data.contact.email.trim()),
    about: !!(data.about.trim() && data.skills.length > 0),
    experience: data.experiences.length > 0,
    projects: data.projects.length > 0,
    education: data.education.length > 0,
    template: true
  }), [data])

  const isComplete = Object.values(stepCompletion).every(Boolean)
  const currentStepComplete = stepCompletion[active]

  const goNext = () => {
    const idx = steps.indexOf(active)
    if (idx < steps.length - 1) setActive(steps[idx + 1])
  }
  const goBack = () => {
    const idx = steps.indexOf(active)
    if (idx > 0) setActive(steps[idx - 1])
  }

  return (
    <div className="overflow-hidden">
      {/* Progress Bar */}
      <div className="px-6 pt-4 pb-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-700">Progress</span>
          <span className="text-xs font-bold text-indigo-600">
            {Object.values(stepCompletion).filter(Boolean).length}/{steps.length} Complete
          </span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-500 rounded-full"
            style={{ width: `${(Object.values(stepCompletion).filter(Boolean).length / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Navigation */}
      <nav className="px-4 py-3 overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          {steps.map((s, idx) => (
            <button
              key={s}
              onClick={() => setActive(s)}
              className={`group relative px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all duration-200 flex items-center gap-2 ${
                active === s 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-transparent shadow-lg shadow-indigo-500/30' 
                  : stepCompletion[s]
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {stepCompletion[s] && active !== s && (
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
              <span className={active === s ? '' : 'hidden sm:inline'}>{label(s)}</span>
              {active !== s && <span className="sm:hidden">{idx + 1}</span>}
            </button>
          ))}
        </div>
      </nav>

      {/* Content Area */}
      <div className="px-6 py-6 max-h-[calc(100vh-20rem)] overflow-y-auto">
        <div className="mb-4 flex items-center gap-3">
          <div className={`p-2 rounded-lg ${active === 'template' ? 'bg-gradient-to-br from-indigo-500 to-purple-600' : 'bg-slate-100'}`}>
            <div className={active === 'template' ? 'text-white' : 'text-slate-600'}>
              {stepIcons[active]}
            </div>
          </div>
          <div>
            <h3 className="font-bold text-slate-800">{label(active)}</h3>
            <p className="text-xs text-slate-500">{getStepDescription(active)}</p>
          </div>
        </div>

        {active === 'basic' && (
          <div className="space-y-4">
            <Field 
              label="Full Name" 
              value={data.name} 
              onChange={(v) => setData((d) => ({ ...d, name: v }))}
              placeholder="John Doe"
              icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
            />
            <Field 
              label="Professional Title" 
              value={data.title} 
              onChange={(v) => setData((d) => ({ ...d, title: v }))}
              placeholder="Senior Software Engineer"
              icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
            />
            
            <div className="pt-2">
              <p className="text-xs font-semibold text-slate-700 mb-3">Contact Information</p>
              <div className="space-y-3">
                <Field 
                  label="Email Address" 
                  value={data.contact.email} 
                  onChange={(v) => setData((d) => ({ ...d, contact: { ...d.contact, email: v } }))}
                  placeholder="john@example.com"
                  icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
                />
                <Field 
                  label="Phone Number" 
                  value={data.contact.phone} 
                  onChange={(v) => setData((d) => ({ ...d, contact: { ...d.contact, phone: v } }))}
                  placeholder="+1 (555) 000-0000"
                  icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>}
                />
                <Field 
                  label="Location" 
                  value={data.contact.location} 
                  onChange={(v) => setData((d) => ({ ...d, contact: { ...d.contact, location: v } }))}
                  placeholder="San Francisco, CA"
                  icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                />
                <Field 
                  label="Website / Portfolio" 
                  value={data.contact.website ?? ''} 
                  onChange={(v) => setData((d) => ({ ...d, contact: { ...d.contact, website: v } }))}
                  placeholder="https://johndoe.com"
                  icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>}
                />
              </div>
            </div>
          </div>
        )}

        {active === 'about' && (
          <div className="space-y-5">
            <Area 
              label="Professional Summary" 
              rows={5} 
              value={data.about} 
              onChange={(v) => setData((d) => ({ ...d, about: v }))}
              placeholder="Write a compelling summary that highlights your key achievements, expertise, and career goals..."
              helper="Tip: Focus on your unique value proposition and what makes you stand out"
            />
            <TagInput
              label="Technical Skills & Expertise"
              values={data.skills}
              onChange={(skills) => setData((d) => ({ ...d, skills }))}
              placeholder="e.g., React, Python, Project Management"
              helper="Add relevant skills that match job requirements"
            />
          </div>
        )}

        {active === 'experience' && (
          <Collection<Experience>
            label="Work Experience"
            items={data.experiences}
            newItem={() => ({ id: crypto.randomUUID(), company: '', role: '', start: '', end: '', summary: '' })}
            render={(item, update) => (
              <div className="space-y-4">
                <Field label="Company Name" value={item.company} onChange={(v) => update({ ...item, company: v })} placeholder="Tech Corp Inc." />
                <Field label="Job Title" value={item.role} onChange={(v) => update({ ...item, role: v })} placeholder="Senior Software Engineer" />
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Start Date" value={item.start} onChange={(v) => update({ ...item, start: v })} placeholder="Jan 2020" />
                  <Field label="End Date" value={item.end} onChange={(v) => update({ ...item, end: v })} placeholder="Present" />
                </div>
                <Area 
                  label="Role Description & Achievements" 
                  rows={4} 
                  value={item.summary} 
                  onChange={(v) => update({ ...item, summary: v })}
                  placeholder="• Led a team of 5 engineers to deliver...&#10;• Increased system performance by 40%...&#10;• Implemented new features that..."
                  helper="Use bullet points and quantify achievements"
                />
                <Toggle label="✓ Verified Experience" checked={!!item.verified} onChange={(v) => update({ ...item, verified: v })} />
              </div>
            )}
            onChange={(items) => setData((d) => ({ ...d, experiences: items }))}
            emptyMessage="No work experience added yet. Add your first role!"
          />
        )}

        {active === 'projects' && (
          <Collection<Project>
            label="Featured Projects"
            items={data.projects}
            newItem={() => ({ id: crypto.randomUUID(), name: '', description: '', link: '' })}
            render={(item, update) => (
              <div className="space-y-4">
                <Field label="Project Name" value={item.name} onChange={(v) => update({ ...item, name: v })} placeholder="E-commerce Platform" />
                <Area 
                  label="Project Description" 
                  rows={4} 
                  value={item.description} 
                  onChange={(v) => update({ ...item, description: v })}
                  placeholder="Describe the project, your role, technologies used, and impact..."
                  helper="Highlight your specific contributions and results"
                />
                <Field label="Project URL (Optional)" value={item.link ?? ''} onChange={(v) => update({ ...item, link: v })} placeholder="https://github.com/username/project" />
                <Toggle label="✓ Verified Project" checked={!!item.verified} onChange={(v) => update({ ...item, verified: v })} />
              </div>
            )}
            onChange={(items) => setData((d) => ({ ...d, projects: items }))}
            emptyMessage="No projects added yet. Showcase your best work!"
          />
        )}

        {active === 'education' && (
          <Collection<Education>
            label="Education & Certifications"
            items={data.education}
            newItem={() => ({ id: crypto.randomUUID(), school: '', degree: '', start: '', end: '' })}
            render={(item, update) => (
              <div className="space-y-4">
                <Field label="Institution Name" value={item.school} onChange={(v) => update({ ...item, school: v })} placeholder="Stanford University" />
                <Field label="Degree / Certification" value={item.degree} onChange={(v) => update({ ...item, degree: v })} placeholder="Bachelor of Science in Computer Science" />
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Start Year" value={item.start} onChange={(v) => update({ ...item, start: v })} placeholder="2016" />
                  <Field label="End Year" value={item.end} onChange={(v) => update({ ...item, end: v })} placeholder="2020" />
                </div>
                <Toggle label="✓ Verified Education" checked={!!item.verified} onChange={(v) => update({ ...item, verified: v })} />
              </div>
            )}
            onChange={(items) => setData((d) => ({ ...d, education: items }))}
            emptyMessage="No education added yet. Add your qualifications!"
          />
        )}

        {active === 'template' && (
          <div className="space-y-6">
            <div>
              <p className="text-xs font-bold text-slate-700 mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
                Choose Your Template Style
              </p>
              <div className="grid gap-3">
                {(['professional', 'minimal', 'creative'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setData((d) => ({ ...d, template: t }))}
                    className={`group p-4 rounded-xl border-2 text-left transition-all ${
                      data.template === t
                        ? 'border-indigo-600 bg-indigo-50 shadow-lg'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        data.template === t ? 'border-indigo-600' : 'border-slate-300'
                      }`}>
                        {data.template === t && (
                          <div className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-bold text-sm capitalize ${data.template === t ? 'text-indigo-900' : 'text-slate-800'}`}>
                          {t}
                        </h4>
                        <p className="text-xs text-slate-600 mt-1">{getTemplateDescription(t)}</p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {getTemplateFeatures(t).map((feature) => (
                            <span key={feature} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-bold text-slate-700 mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
                Select Color Theme
              </p>
              <div className="grid grid-cols-2 gap-3">
                {(['slate', 'emerald', 'indigo', 'rose'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setData((d) => ({ ...d, theme: t }))}
                    className={`p-3 rounded-xl border-2 text-left transition-all ${
                      data.theme === t
                        ? 'border-indigo-600 shadow-lg'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg ${getThemePreview(t)}`} />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-slate-800 capitalize">{t}</p>
                        <p className="text-[10px] text-slate-500">{getThemeDescription(t)}</p>
                      </div>
                      {data.theme === t && (
                        <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Navigation */}
      <div className="px-6 py-4 border-t border-slate-200 bg-slate-50">
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={goBack}
            disabled={active === 'basic'}
            className="px-4 py-2.5 text-sm font-semibold rounded-xl border-2 border-slate-200 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          <div className="text-center">
            {currentStepComplete ? (
              <div className="flex items-center gap-2 text-xs font-medium text-emerald-600">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Section Complete
              </div>
            ) : (
              <p className="text-xs text-slate-500">Fill in the fields above</p>
            )}
            {isComplete && (
              <p className="text-xs font-semibold text-indigo-600 mt-1">✓ Resume Ready!</p>
            )}
          </div>

          <button
            onClick={goNext}
            disabled={active === 'template'}
            className="px-4 py-2.5 text-sm font-semibold rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-500/30 flex items-center gap-2"
          >
            Next
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

function label(step: Step): string {
  switch (step) {
    case 'basic': return 'Basic Info'
    case 'about': return 'Summary'
    case 'experience': return 'Experience'
    case 'projects': return 'Projects'
    case 'education': return 'Education'
    case 'template': return 'Design'
  }
}

function getStepDescription(step: Step): string {
  switch (step) {
    case 'basic': return 'Your personal and contact information'
    case 'about': return 'Professional summary and skills'
    case 'experience': return 'Your work history and achievements'
    case 'projects': return 'Showcase your best work'
    case 'education': return 'Academic background and certifications'
    case 'template': return 'Customize your resume appearance'
  }
}

function getTemplateDescription(template: string): string {
  switch (template) {
    case 'professional': return 'Clean corporate design with bold header - Perfect for traditional industries'
    case 'minimal': return 'Simple and elegant layout - Ideal for creative professionals'
    case 'creative': return 'Modern design with visual flair - Stand out from the crowd'
    default: return ''
  }
}

function getTemplateFeatures(template: string): string[] {
  switch (template) {
    case 'professional': return ['ATS Optimized', 'Corporate Style', 'Bold Header']
    case 'minimal': return ['Clean Layout', 'Easy to Read', 'Versatile']
    case 'creative': return ['Eye-Catching', 'Modern Design', 'Unique Style']
    default: return []
  }
}

function getThemePreview(theme: string): string {
  switch (theme) {
    case 'slate': return 'bg-gradient-to-br from-slate-700 to-slate-900'
    case 'emerald': return 'bg-gradient-to-br from-emerald-500 to-teal-600'
    case 'indigo': return 'bg-gradient-to-br from-indigo-500 to-purple-600'
    case 'rose': return 'bg-gradient-to-br from-rose-500 to-pink-600'
    default: return 'bg-slate-500'
  }
}

function getThemeDescription(theme: string): string {
  switch (theme) {
    case 'slate': return 'Professional & Classic'
    case 'emerald': return 'Fresh & Energetic'
    case 'indigo': return 'Modern & Tech'
    case 'rose': return 'Creative & Warm'
    default: return ''
  }
}

function Field(props: { 
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  icon?: React.ReactNode
}) {
  return (
    <label className="grid gap-1.5">
      <span className="text-xs font-semibold text-slate-700">{props.label}</span>
      <div className="relative">
        {props.icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            {props.icon}
          </div>
        )}
        <input
          className={`w-full rounded-lg border border-slate-200 ${props.icon ? 'pl-10' : 'pl-3'} pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
          placeholder={props.placeholder}
        />
      </div>
    </label>
  )
}

function Area(props: { 
  label: string
  value: string
  rows?: number
  onChange: (v: string) => void
  placeholder?: string
  helper?: string
}) {
  return (
    <label className="grid gap-1.5">
      <span className="text-xs font-semibold text-slate-700">{props.label}</span>
      <textarea
        rows={props.rows ?? 3}
        className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        placeholder={props.placeholder}
      />
      {props.helper && (
        <p className="text-xs text-slate-500 flex items-center gap-1">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          {props.helper}
        </p>
      )}
    </label>
  )
}

function Toggle(props: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="inline-flex items-center gap-3 cursor-pointer group">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={props.checked}
          onChange={(e) => props.onChange(e.target.checked)}
        />
        <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:bg-gradient-to-r peer-checked:from-emerald-500 peer-checked:to-teal-600 transition-all"></div>
        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5 shadow-sm"></div>
      </div>
      <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">{props.label}</span>
    </label>
  )
}

function TagInput(props: { 
  label: string
  values: string[]
  onChange: (v: string[]) => void
  placeholder?: string
  helper?: string
}) {
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
      <span className="text-xs font-semibold text-slate-700">{props.label}</span>
      <div className="min-h-[60px] p-3 rounded-lg border border-slate-200 bg-slate-50">
        <div className="flex flex-wrap gap-2">
          {props.values.map((s) => (
            <span key={s} className="px-3 py-1.5 text-xs font-medium rounded-full bg-indigo-100 text-indigo-700 border border-indigo-200 inline-flex items-center gap-2 group hover:bg-indigo-200 transition-colors">
              {s}
              <button
                className="size-4 grid place-items-center rounded-full hover:bg-indigo-300 transition-colors"
                onClick={() => remove(s)}
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </span>
          ))}
          {props.values.length === 0 && (
            <span className="text-xs text-slate-400 py-1">No skills added yet</span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <input
          className="flex-1 rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          placeholder={props.placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              add()
            }
          }}
        />
        <button
          onClick={add}
          className="px-4 py-2.5 text-sm font-semibold rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg shadow-indigo-500/30"
        >
          Add
        </button>
      </div>
      {props.helper && (
        <p className="text-xs text-slate-500 flex items-center gap-1">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          {props.helper}
        </p>
      )}
    </div>
  )
}

function Collection<T>(props: {
  label: string
  items: T[]
  newItem: () => T
  render: (item: T, update: (item: T) => void) => React.ReactNode
  onChange: (items: T[]) => void
  emptyMessage?: string
}) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  
  const add = () => {
    props.onChange([...(props.items ?? []), props.newItem()])
    setExpandedIndex(props.items.length)
  }
  
  const updateAt = (index: number, item: T) => {
    const next = [...props.items]
    next[index] = item
    props.onChange(next)
  }
  
  const removeAt = (index: number) => {
    const next = props.items.filter((_, i) => i !== index)
    props.onChange(next)
    if (expandedIndex === index) setExpandedIndex(null)
  }
  
  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-700">{props.label}</span>
        <button
          onClick={add}
          className="px-4 py-2 text-xs font-semibold rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg shadow-indigo-500/30 flex items-center gap-1.5"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New
        </button>
      </div>
      
      {props.items.length === 0 && props.emptyMessage && (
        <div className="rounded-xl border-2 border-dashed border-slate-200 p-8 text-center">
          <div className="w-12 h-12 rounded-full bg-slate-100 mx-auto mb-3 flex items-center justify-center">
            <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <p className="text-sm text-slate-600 font-medium">{props.emptyMessage}</p>
          <button
            onClick={add}
            className="mt-4 px-4 py-2 text-xs font-semibold rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all"
          >
            Get Started
          </button>
        </div>
      )}
      
      <div className="grid gap-3">
        {props.items.map((it, idx) => (
          <div
            key={idx}
            className="rounded-xl border-2 border-slate-200 bg-white overflow-hidden hover:border-indigo-200 transition-all"
          >
            <div
              className="p-4 cursor-pointer flex items-center justify-between bg-slate-50 hover:bg-slate-100 transition-colors"
              onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                  {idx + 1}
                </div>
                <span className="text-sm font-semibold text-slate-700">
                  {props.label} #{idx + 1}
                </span>
              </div>
              <svg
                className={`w-5 h-5 text-slate-400 transition-transform ${expandedIndex === idx ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            
            {expandedIndex === idx && (
              <div className="p-5 space-y-4 border-t border-slate-200">
                {props.render(it, (next) => updateAt(idx, next))}
                <div className="pt-3 border-t border-slate-200 flex justify-end">
                  <button
                    onClick={() => removeAt(idx)}
                    className="px-4 py-2 text-xs font-semibold rounded-lg border-2 border-rose-200 text-rose-600 hover:bg-rose-50 transition-all flex items-center gap-1.5"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Remove
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}