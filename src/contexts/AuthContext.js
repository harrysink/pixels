import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const AuthContext = React.createContext();

export function useAuth() {
   return useContext(AuthContext)
}

export function AuthProvider({ children}) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])

    const value = {
        login,
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
