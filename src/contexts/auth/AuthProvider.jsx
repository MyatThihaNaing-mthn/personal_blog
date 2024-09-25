import { useEffect, useMemo, useState } from "react";
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { AuthContext } from "./authContext";
import PropTypes from 'prop-types';


export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setUserLoggedIn(!!user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = useMemo(() => ({
        currentUser,
        userLoggedIn,
        loading
    }), [currentUser, userLoggedIn, loading]);

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,  
};