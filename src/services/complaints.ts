import { addDoc, collection, doc, getDocs, limit, orderBy, query, serverTimestamp, updateDoc, where } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { db, storage } from '../firebase/config'
import type { Complaint, ComplaintStatus } from '../types'

export interface ComplaintInput {
  issueType: string
  institution: string
  description: string
  incidentDate: string
  anonymous: boolean
  evidence?: File
}

function complaintCode() {
  const token = crypto.randomUUID().replaceAll('-', '').slice(0, 5).toUpperCase()
  return `EDU-${new Date().getFullYear()}-${token}`
}

export async function submitComplaint(input: ComplaintInput, userId: string, onProgress: (value: number) => void) {
  const complaintId = complaintCode()
  const evidencePaths: string[] = []
  if (input.evidence) {
    const cleanName = input.evidence.name.replace(/[^a-zA-Z0-9._-]/g, '_')
    const storageRef = ref(storage, `evidence/${userId}/${complaintId}/${cleanName}`)
    const task = uploadBytesResumable(storageRef, input.evidence, { contentType: input.evidence.type })
    await new Promise<void>((resolve, reject) => task.on('state_changed',
      (snapshot) => onProgress(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)),
      reject, resolve))
    evidencePaths.push(task.snapshot.ref.fullPath)
  }
  const created = await addDoc(collection(db, 'complaints'), {
    complaintId, userId, anonymous: input.anonymous, issueType: input.issueType,
    institution: input.institution.trim(), description: input.description.trim(),
    incidentDate: input.incidentDate, evidencePaths, status: 'Submitted',
    createdAt: serverTimestamp(), updatedAt: serverTimestamp(), resolutionNotes: '',
  })
  return { id: created.id, complaintId }
}

export async function getUserComplaints(userId: string): Promise<Complaint[]> {
  const result = await getDocs(query(collection(db, 'complaints'), where('userId', '==', userId), orderBy('createdAt', 'desc'), limit(100)))
  return result.docs.map((item) => ({ id: item.id, ...item.data() }) as Complaint)
}

export async function trackComplaint(complaintId: string, userId: string): Promise<Complaint | null> {
  const result = await getDocs(query(collection(db, 'complaints'), where('complaintId', '==', complaintId.toUpperCase()), where('userId', '==', userId), limit(1)))
  return result.empty ? null : ({ id: result.docs[0].id, ...result.docs[0].data() } as Complaint)
}

export async function getAllComplaints(): Promise<Complaint[]> {
  const result = await getDocs(query(collection(db, 'complaints'), orderBy('createdAt', 'desc'), limit(250)))
  return result.docs.map((item) => ({ id: item.id, ...item.data() }) as Complaint)
}

export async function updateComplaintStatus(id: string, status: ComplaintStatus, resolutionNotes: string) {
  await updateDoc(doc(db, 'complaints', id), { status, resolutionNotes: resolutionNotes.trim(), updatedAt: serverTimestamp() })
}

export async function getEvidenceUrl(path: string) {
  return getDownloadURL(ref(storage, path))
}
