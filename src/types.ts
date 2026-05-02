export type ProposalStatus = 'draft' | 'sent' | 'replied' | 'hired' | 'lost';

export interface Proposal {
  id: string;
  title: string;
  jobDescription: string;
  tone: string;
  content: string;
  versions: string[];
  status: ProposalStatus;
  createdAt: string;
  revenue?: number;
}

export interface UserProfile {
  name: string;
  title: string;
  bio: string;
  skills: string[];
  experienceYears: number;
  defaultRate: number;
  currency: string;
}
