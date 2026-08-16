/* oxlint-disable react/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile, type User } from 'firebase/auth'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { auth, db, isFirebaseConfigured } from '../firebase/config'

interface AuthContextValue {
  user: User | null
  role: 'user' | 'admin'
  loading: boolean
  configured: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

async function retry<T>(task: () => Promise<T>, attempts = 3): Promise<T> {
  let lastError: unknown
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try { return await task() } catch (error) {
      lastError = error
      if (attempt < attempts - 1) await new Promise((resolve) => setTimeout(resolve, 350 * (attempt + 1)))
    }
  }
  throw lastError
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [role, setRole] = useState<'user' | 'admin'>('user')
  const [loading, setLoading] = useState(isFirebaseConfigured)

  useEffect(() => {
    if (!isFirebaseConfigured) { setLoading(false); return }
    return onAuthStateChanged(auth, async (nextUser) => {
      setUser(nextUser)
      if (nextUser) {
        try {
          const token = await nextUser.getIdTokenResult()
          setRole(token.claims.admin === true ? 'admin' : 'user')
        } catch {
          setRole('user')
        }
      } else setRole('user')
      setLoading(false)
    })
  }, [])

  const value = useMemo<AuthContextValue>(() => ({
    user, role, loading, configured: isFirebaseConfigured,
    login: async (email, password) => { await signInWithEmailAndPassword(auth, email, password) },
    register: async (name, email, password) => {
      const credential = await createUserWithEmailAndPassword(auth, email, password)
      const userRef = doc(db, 'users', credential.user.uid)
      await Promise.allSettled([
        retry(() => updateProfile(credential.user, { displayName: name })),
        retry(async () => {
          if (!(await getDoc(userRef)).exists()) {
            await setDoc(userRef, { uid: credential.user.uid, name, email, role: 'user', createdAt: serverTimestamp() })
          }
        }),
      ])
    },
    logout: async () => { await signOut(auth) },
  }), [user, role, loading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const value = useContext(AuthContext)
  if (!value) throw new Error('useAuth must be used inside AuthProvider')
  return value
}
