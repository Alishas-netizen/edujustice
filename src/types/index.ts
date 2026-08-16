import type { Timestamp } from 'firebase/firestore'

export type ComplaintStatus = 'Submitted' | 'Under Review' | 'Investigation' | 'Action Taken' | 'Resolved'

export interface Complaint {
  id: string
  complaintId: string
  userId: string
  anonymous: boolean
  issueType: string
  institution: string
  description: string
  incidentDate: string
  evidencePaths: string[]
  status: ComplaintStatus
  createdAt: Timestamp | Date
  updatedAt: Timestamp | Date
  resolutionNotes?: string
}

export interface AppUser {
  uid: string
  name: string
  email: string
  role: 'user' | 'admin'
}
