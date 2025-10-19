// import React from 'react'
import { ResumeProvider } from './context/ResumeContext'
import { ResumePreview } from './components/ResumePreview'
import { Editor } from './components/Editor'
import { downloadResumePdf } from './components/pdf'

export function App() {
  return (
    <ResumeProvider>
      <div className="min-h-screen app-bg app-fg">
        <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-lg bg-gradient-to-br from-indigo-500 to-emerald-500" />
              <p className="text-sm font-semibold tracking-wide">Live Resume Studio</p>
            </div>
            <button
              onClick={() => downloadResumePdf()}
              className="text-xs font-medium px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50"
            >
              Download PDF
            </button>
          </div>
        </header>

        {/* --- UPDATED MAIN LAYOUT --- */}
        {/* This creates a 2-column grid on large screens (lg:) and stacks them on mobile.
          The editor (col-span-1) is sticky so it stays in place while you scroll the preview.
        */}
        <main className="mx-auto max-w-7xl px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            {/* Make the editor sticky within its column */}
            <div className="sticky top-24">
              <Editor />
            </div>
          </div>

          <div className="lg:col-span-2">
            <ResumePreview />
          </div>
        </main>
        {/* --- END UPDATED MAIN LAYOUT --- */}

      </div>
    </ResumeProvider>
  )
}