// import React from 'react'
import { useResume } from '../context/ResumeContext'
import { downloadResumePdf } from './pdf'

export function CustomizationPanel(): React.ReactElement {
  const { data, setData } = useResume()

  const quickStats = {
    completeness: calculateCompleteness(data),
    sections: countFilledSections(data),
    totalSections: 5
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden sticky top-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-white">Quick Actions</h3>
            <p className="text-xs text-indigo-100">Customize & Export</p>
          </div>
        </div>

        {/* Progress */}
        <div className="bg-white/20 backdrop-blur rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-white">Resume Completeness</span>
            <span className="text-sm font-bold text-white">{quickStats.completeness}%</span>
          </div>
          <div className="h-2 bg-white/30 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white rounded-full transition-all duration-500"
              style={{ width: `${quickStats.completeness}%` }}
            />
          </div>
          <p className="text-xs text-indigo-100 mt-2">
            {quickStats.sections}/{quickStats.totalSections} sections completed
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="p-6 space-y-4">
        {/* Download Button */}
        <button
          onClick={() => downloadResumePdf()}
          className="w-full px-4 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 transition-all flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download PDF
        </button>

        {/* Quick Template Switcher */}
        <div>
          <p className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-2">
            <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
            Quick Template
          </p>
          <div className="grid grid-cols-3 gap-2">
            {(['professional', 'minimal', 'creative'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setData((d) => ({ ...d, template: t }))}
                className={`px-2 py-2 rounded-lg text-[10px] font-semibold border transition-all ${
                  data.template === t
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50'
                }`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Theme Switcher */}
        <div>
          <p className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-2">
            <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
            Quick Color
          </p>
          <div className="flex gap-2">
            {(['slate', 'emerald', 'indigo', 'rose'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setData((d) => ({ ...d, theme: t }))}
                className={`flex-1 h-10 rounded-lg border-2 transition-all ${
                  data.theme === t
                    ? 'border-indigo-600 ring-2 ring-indigo-200'
                    : 'border-slate-200 hover:border-slate-300'
                } ${getThemeColor(t)}`}
                title={t}
              >
                {data.theme === t && (
                  <svg className="w-5 h-5 mx-auto text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200">
          <p className="text-xs font-bold text-slate-700 mb-3">Resume Tips</p>
          <div className="space-y-2">
            <TipCard
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              text="Add verified credentials to boost credibility"
              color="emerald"
            />
            <TipCard
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              }
              text="Use action verbs and quantify achievements"
              color="blue"
            />
            <TipCard
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              }
              text="Keep it concise - aim for 1-2 pages max"
              color="purple"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="pt-4 border-t border-slate-200">
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <div className="w-10 h-10 rounded-lg bg-blue-100 mx-auto mb-1 flex items-center justify-center">
                <span className="text-sm font-bold text-blue-600">{data.skills.length}</span>
              </div>
              <p className="text-[10px] text-slate-600 font-medium">Skills</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 mx-auto mb-1 flex items-center justify-center">
                <span className="text-sm font-bold text-emerald-600">{data.experiences.length}</span>
              </div>
              <p className="text-[10px] text-slate-600 font-medium">Experience</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 rounded-lg bg-purple-100 mx-auto mb-1 flex items-center justify-center">
                <span className="text-sm font-bold text-purple-600">{data.projects.length}</span>
              </div>
              <p className="text-[10px] text-slate-600 font-medium">Projects</p>
            </div>
          </div>
        </div>

        {/* ATS Badge */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-3 border border-emerald-200">
          <div className="flex items-center gap-2 mb-1">
            <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-xs font-bold text-emerald-700">ATS Optimized</span>
          </div>
          <p className="text-[10px] text-emerald-600">
            Your resume format is optimized for Applicant Tracking Systems
          </p>
        </div>
      </div>
    </div>
  )
}

function TipCard({ icon, text, color }: { icon: React.ReactNode; text: string; color: string }) {
  const colors = {
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    purple: 'bg-purple-50 text-purple-600 border-purple-200'
  }

  return (
    <div className={`flex items-start gap-2 p-2 rounded-lg border ${colors[color as keyof typeof colors]}`}>
      <div className="mt-0.5">{icon}</div>
      <p className="text-[10px] font-medium flex-1">{text}</p>
    </div>
  )
}

function getThemeColor(theme: string): string {
  switch (theme) {
    case 'slate': return 'bg-gradient-to-br from-slate-700 to-slate-900'
    case 'emerald': return 'bg-gradient-to-br from-emerald-500 to-teal-600'
    case 'indigo': return 'bg-gradient-to-br from-indigo-500 to-purple-600'
    case 'rose': return 'bg-gradient-to-br from-rose-500 to-pink-600'
    default: return 'bg-slate-500'
  }
}

function calculateCompleteness(data: any): number {
  let score = 0
  const total = 100

  // Basic info (20 points)
  if (data.name?.trim()) score += 7
  if (data.title?.trim()) score += 7
  if (data.contact?.email?.trim()) score += 6

  // About & Skills (20 points)
  if (data.about?.trim()) score += 10
  if (data.skills?.length > 0) score += 10

  // Experience (20 points)
  if (data.experiences?.length > 0) score += 20

  // Projects (20 points)
  if (data.projects?.length > 0) score += 20

  // Education (20 points)
  if (data.education?.length > 0) score += 20

  return Math.min(Math.round(score), total)
}

function countFilledSections(data: any): number {
  let count = 0
  
  if (data.name?.trim() && data.title?.trim() && data.contact?.email?.trim()) count++
  if (data.about?.trim() && data.skills?.length > 0) count++
  if (data.experiences?.length > 0) count++
  if (data.projects?.length > 0) count++
  if (data.education?.length > 0) count++
  
  return count
}