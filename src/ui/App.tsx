// import React from 'react'
import { ResumeProvider } from './context/ResumeContext'
import { ResumePreview } from './components/ResumePreview'
import { Editor } from './components/Editor'
import { downloadResumePdf } from './components/pdf'

export function App() {
  return (
    <ResumeProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Enhanced Header with Glass Morphism */}
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-white/20 shadow-sm">
          <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl blur opacity-50" />
                <div className="relative size-10 rounded-xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                EdTech and technology
                </h1>
                <p className="text-xs text-slate-500 font-medium">Next-Gen Career Ecosystem</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-medium text-emerald-700">Auto-Save Active</span>
              </div>
              
              <button
                onClick={() => downloadResumePdf()}
                className="group relative px-5 py-2.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transition-all duration-200 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download PDF
              </button>
            </div>
          </div>
        </header>

        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-8">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex items-center justify-between">
              <div className="text-white">
                <h2 className="text-2xl font-bold mb-1">Build Your Professional Resume</h2>
                <p className="text-indigo-100 text-sm">ATS-Optimized • Verified Achievements • Industry-Ready Templates</p>
              </div>
              <div className="hidden lg:flex items-center gap-6 text-white/90">
                <div className="text-center">
                  <div className="text-2xl font-bold">95%</div>
                  <div className="text-xs text-indigo-200">ATS Pass Rate</div>
                </div>
                <div className="w-px h-12 bg-white/20" />
                <div className="text-center">
                  <div className="text-2xl font-bold">500K+</div>
                  <div className="text-xs text-indigo-200">Resumes Created</div>
                </div>
                <div className="w-px h-12 bg-white/20" />
                <div className="text-center">
                  <div className="text-2xl font-bold">4.9★</div>
                  <div className="text-xs text-indigo-200">User Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <main className="mx-auto max-w-7xl px-6 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Editor Sidebar - Sticky */}
            <div className="lg:col-span-4">
              <div className="sticky top-28">
                <div className="bg-white rounded-2xl shadow-xl border border-slate-200/60 overflow-hidden">
                  <div className="bg-gradient-to-r from-slate-50 to-blue-50 px-6 py-4 border-b border-slate-200">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2">
                      <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Resume Builder
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">Customize your professional profile</p>
                  </div>
                  <Editor />
                </div>
              </div>
            </div>

            {/* Resume Preview - Scrollable */}
            <div className="lg:col-span-8">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <h3 className="font-bold text-slate-800">Live Preview</h3>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200">
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs font-medium text-blue-700">ATS Optimized</span>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-slate-200/60">
                <ResumePreview />
              </div>

              {/* Tips Section */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl p-4 border border-emerald-200 shadow-sm">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-slate-800 text-sm mb-1">Verified Achievements</h4>
                  <p className="text-xs text-slate-600">Add verified credentials to boost credibility</p>
                </div>

                <div className="bg-white rounded-xl p-4 border border-blue-200 shadow-sm">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-slate-800 text-sm mb-1">ATS Friendly</h4>
                  <p className="text-xs text-slate-600">Optimized for applicant tracking systems</p>
                </div>

                <div className="bg-white rounded-xl p-4 border border-purple-200 shadow-sm">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-slate-800 text-sm mb-1">Smart Templates</h4>
                  <p className="text-xs text-slate-600">Choose from industry-specific designs</p>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-16 border-t border-slate-200 bg-white/50 backdrop-blur">
          <div className="mx-auto max-w-7xl px-6 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-slate-600">© 2025  EdTech and technology. Built for the next generation of professionals.</p>
              <div className="flex items-center gap-6 text-sm text-slate-500">
                <a href="#" className="hover:text-indigo-600 transition-colors">Privacy</a>
                <a href="#" className="hover:text-indigo-600 transition-colors">Terms</a>
                <a href="#" className="hover:text-indigo-600 transition-colors">Support</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </ResumeProvider>
  )
}