import initialization from './../../Pages/Authentication/firebase/firebase.init';
import { getAuth, updateProfile, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from 'react';

initialization();

const useFirebase = () => {
    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')
    const [isAdmin, setAdmin] = useState(false)
    const auth = getAuth();
    console.log('isAmin', isAdmin)
    console.log(user);
    const GoogleSignIn = () => {
        setIsLoading(true)
        const GoogleProvider = new GoogleAuthProvider();
        signInWithPopup(auth, GoogleProvider)
            .then((result) => {
                const user = result.user
                setError('')
            })
            .catch((error) => {
                setError(error.message);
            }).finally(() => setIsLoading(false))
    }

    const userRegistration = (email, password, userName) => {
        setIsLoading(true)
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                const newUser = { email, displayName: userName }
                setUser(newUser)
                saveUser(userName, email)
                updateProfile(auth.currentUser, {
                    displayName: userName
                }).then(() => {

                }).catch((error) => {

                });
                setError('')
            })
            .catch((error) => {
                setError(error.message);
            }).finally(() => setIsLoading(false))
    }

    const userLogin = (email, password, navigate, location) => {
        setIsLoading(true)
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                const destination = location?.state?.from || '/';
                navigate(destination)
                setError('')
            })
            .catch((error) => {
                setError(error.message);
            }).finally(() => setIsLoading(false))
    }

    const userLogOut = () => {
        setIsLoading(true)
        signOut(auth).then(() => {
            setError('')
        }).catch((error) => {
            setError(error.message);
        }).finally(() => setIsLoading(false))
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
            } else {
                setUser({})
            }
            setIsLoading(false)
        });
        return () => unsubscribe

    }, [])

    // admin validation......................
    useEffect(() => {
        fetch(`https://obscure-waters-41987.herokuapp.com/isadmin/${user.email}`)
            .then(res => res.json())
            .then(data => setAdmin(data.admin))
    }, [user.email])


    const saveUser = (name, email) => {
        const user = { name, email }
        fetch('https://obscure-waters-41987.herokuapp.com/user', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => console.log(data))
    }

    return {
        GoogleSignIn,
        userRegistration,
        userLogin,
        userLogOut,
        user,
        isLoading,
        error,
        isAdmin
    }
}
export default useFirebase;