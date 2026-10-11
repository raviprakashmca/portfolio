// Single source of truth for all site content.
// Edit this file to update the website — no component changes needed.

export type Role = {
  title: string
  company: string
  client?: string
  start: string
  end: string
  note?: string
  highlights?: string[]
}

export const profile = {
  name: 'Ravi Prakash',
  role: 'Senior Software Engineer',
  tagline: '.NET Microservices · Cloud-Native APIs · Google Cloud',
  location: 'New Delhi, India',
  email: 'raviprakash.mca2013@gmail.com',
  phone: '+91-8860711226',
  linkedin: 'linkedin.com/in/ravi-prakash-4893a529',
}

export const summary = [
  'Senior Software Engineer with 7+ years of experience, specialising in ASP.NET Core Web APIs and microservice architecture on Google Cloud. I own the operations, maintenance and continuous optimisation of a seven-service platform that processes more than three million records.',
  'My focus is keeping high-volume systems available, fast and fault-tolerant — through deliberate data modelling across MongoDB and Cloud SQL, event-driven messaging with Cloud Pub/Sub, targeted indexing strategies, throughput tuning and proactive monitoring.',
]

export const metrics = [
  { value: '7+', label: 'Years of experience' },
  { value: '7', label: 'Microservices in production' },
  { value: '3M+', label: 'Records processed' },
]

export const skills: { group: string; items: string[] }[] = [
  {
    group: 'Languages & Frameworks',
    items: ['C#', 'ASP.NET Core Web API', 'LINQ','Python'],
  },
  {
    group: 'Architecture & Patterns',
    items: ['Microservices', 'REST', 'SOLID Principles', 'Clean Architecture'],
  },
  {
    group: 'Cloud & DevOps',
    items: [
      'Google Cloud Platform',
      'Cloud Functions',
      'Cloud Pub/Sub',
      'Cloud Storage',
      'GKE',
      'Cloud SQL',
      'MongoDB',
      'Docker',
    ],
  },
  {
    group: 'API Engineering',
    items: ['API Versioning', 'Rate Limiting', 'Resiliency with Polly', 'Minimal APIs'],
  },
  {
    group: 'Tooling & Quality',
    items: [
      'Git',
      'Postman',
      'Swagger / OpenAPI',
      'OpenTelemetry',
      'xUnit',
      'Cloud Code',
      'Spec-Driven Development',
    ],
  },
  {
    group: 'Working Knowledge',
    items: [
      'React/Angular'
    ],
  },
]

export const experience: Role[] = [
  {
    title: 'Senior Software Engineer',
    company: 'Happiest Minds Technologies (acquired PureSoftware)',
    client: 'S&P Global',
    start: 'Jul 2025',
    end: 'Present',
    highlights: [
      'Operate, maintain and optimise a 7-microservice ASP.NET Core Web API platform on Google Cloud processing 3M+ records.',
      'Manage polyglot persistence — MongoDB for high-volume documents, Cloud SQL for transactional data and Cloud Storage for large payloads.',
      'Run asynchronous, event-driven workflows on Cloud Pub/Sub, leading throughput tuning for heavy data loads.',
      'Drive database indexing strategy and proactive monitoring to sustain low latency, fault tolerance and high availability.',
    ],
  },
  {
    title: 'Software Engineer',
    company: 'StatusNeo',
    client: 'IndiGo Airlines',
    start: 'Dec 2024',
    end: 'Jun 2025',
  },
  {
    title: 'Software Engineer',
    company: 'PeopleStrong',
    start: 'Jul 2022',
    end: 'Oct 2023',
  },
  {
    title: 'Software Engineer',
    company: 'KiwiTech',
    start: 'Apr 2021',
    end: 'Jul 2022',
  },
  {
    title: 'Software Engineer (Contract)',
    company: 'Process Tech Management Consultant',
    start: 'Nov 2020',
    end: 'Feb 2021',
  },
  {
    title: 'Software Engineer',
    company: 'KiwiTech',
    start: 'Dec 2018',
    end: 'Nov 2019',
  },
  {
    title: 'Software Engineer',
    company: 'Nippon Data Systems',
    start: 'Nov 2017',
    end: 'Sep 2018',
  },
  {
    title: 'Software Engineer',
    company: 'Amigo Infotech',
    start: 'May 2014',
    end: 'Aug 2015',
  },
]

export const education = [
  {
    degree: 'Master of Computer Applications (MCA)',
    school: 'Punjab Technical University, Jalandhar',
    score: '75%',
  },
  {
    degree: 'Bachelor of Computer Applications (BCA)',
    school: 'Makhanlal Chaturvedi National University (MCRPV), Bhopal',
    score: '69%',
  },
]
