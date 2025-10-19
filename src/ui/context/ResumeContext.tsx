import React, { createContext, useContext, useMemo, useState } from 'react'

export type Experience = {
  id: string
  company: string
  role: string
  start: string
  end: string
  summary: string
  verified?: boolean
}

export type Education = {
  id: string
  school: string
  degree: string
  start: string
  end: string
  verified?: boolean
}

export type Project = {
  id: string
  name: string
  description: string
  link?: string
  verified?: boolean
}

export type ResumeData = {
  name: string
  title: string
  about: string
  contact: { email: string; phone: string; location: string; website?: string }
  skills: string[]
  experiences: Experience[]
  education: Education[]
  projects: Project[]
  theme: 'slate' | 'emerald' | 'indigo' | 'rose'
  template: 'professional' | 'minimal' | 'creative'
}

type ResumeContextValue = {
  data: ResumeData
  setData: React.Dispatch<React.SetStateAction<ResumeData>>
}

const ResumeContext = createContext<ResumeContextValue | null>(null)

export function useResume(): ResumeContextValue {
  const ctx = useContext(ResumeContext)
  if (!ctx) throw new Error('useResume must be used within ResumeProvider')
  return ctx
}

const SAMPLE: ResumeData = {
  name: 'Priyanshu Sharma',
  title: 'Full-Stack Developer',
  about:
    'Passionate about building connected learning ecosystems. Focused on delightful UX and robust engineering.',
  contact: {
    email: 'priyanshu@example.com',
    phone: '+91-98765-43210',
    location: 'India',
    website: 'https://portfolio.example.com'
  },
  skills: ['React', 'TypeScript', 'Tailwind', 'Node.js', 'Express', 'MongoDB'],
  experiences: [
    {
      id: 'exp-1',
      company: 'Innovate Labs',
      role: 'Frontend Engineer',
      start: '2023',
      end: 'Present',
      summary:
        'Led development of resume builder UI with real-time updates from platform activities.'
    }
  ],
  education: [
    { id: 'edu-1', school: 'ABC University', degree: 'B.Tech CSE', start: '2019', end: '2023' }
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'Hackathon Hub',
      description: 'Platform to manage hackathons with team formation and scoring.',
      link: 'https://github.com/example/hackathon-hub',
      verified: true
    }
  ],
  theme: 'indigo',
  template: 'professional'
}

export function ResumeProvider(props: { children: React.ReactNode }): React.ReactElement {
  const [data, setData] = useState<ResumeData>(SAMPLE)
  const value = useMemo(() => ({ data, setData }), [data])
  return <ResumeContext.Provider value={value}>{props.children}</ResumeContext.Provider>
}


