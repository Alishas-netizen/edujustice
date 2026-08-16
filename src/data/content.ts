import { BadgeIndianRupee, BookOpenCheck, FileWarning, GraduationCap, Landmark, ReceiptIndianRupee, Scale, ScanSearch, ShieldAlert, UserRoundCheck } from 'lucide-react'

export const corruptionTypes = [
  { icon: BadgeIndianRupee, title: 'Bribery', description: 'Demanding or accepting money or benefits for academic or administrative services.' },
  { icon: FileWarning, title: 'Fake Certificates', description: 'Creating, submitting, or using fraudulent educational certificates and documents.' },
  { icon: GraduationCap, title: 'Unfair Admission', description: 'Favoritism, unauthorized payments, manipulation, or unfair treatment during admission.' },
  { icon: ReceiptIndianRupee, title: 'Scholarship Fraud', description: 'False claims, forged documents, manipulated eligibility, or misuse of scholarship funds.' },
  { icon: ScanSearch, title: 'Marks Manipulation', description: 'Unauthorized changes to marks, attendance, results, or academic records.' },
]

export const solutions = [
  { icon: BookOpenCheck, title: 'Transparent Admission', description: 'Make admission criteria, decisions, and records clear, documented, and verifiable.' },
  { icon: ReceiptIndianRupee, title: 'Digital Fee Tracking', description: 'Maintain verifiable records of payments, fees, and scholarship disbursement.' },
  { icon: ScanSearch, title: 'Regular Audits', description: 'Encourage independent financial, academic, and administrative audits.' },
  { icon: Scale, title: 'Strict Accountability', description: 'Apply proportionate action against violations established through due process.' },
  { icon: ShieldAlert, title: 'Anonymous Reporting', description: 'Let students report concerns without unnecessarily exposing their identity.' },
  { icon: UserRoundCheck, title: 'Institution Oversight', description: 'Build clear and reviewable accountability mechanisms for staff and institutions.' },
]

export const rights = [
  { icon: Landmark, title: 'Admission Rights', text: 'Admission criteria, required documents, selection processes, and applicable charges should be clear and consistently applied.' },
  { icon: ReceiptIndianRupee, title: 'Fee Rights', text: 'Students should receive understandable fee information and an official record for every payment.' },
  { icon: GraduationCap, title: 'Scholarship Rights', text: 'Eligibility, timelines, documentation, selection, and grievance procedures should be accessible.' },
  { icon: BookOpenCheck, title: 'Examination Rights', text: 'Students should be able to access applicable examination, evaluation, rechecking, and grievance procedures.' },
  { icon: FileWarning, title: 'Academic Records', text: 'Students should be able to obtain and verify relevant academic records through authorized channels.' },
  { icon: Scale, title: 'Grievance Rights', text: 'Students may raise concerns through institutional and official mechanisms without retaliation.' },
]
