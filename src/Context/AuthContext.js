import React, { createContext, useState, useEffect } from 'react';
import AuthService from '../Services/AuthService';

// provider
export const AuthContext = createContext(); // Minden ami eléri a providert, az eléri a globalstatet - > Ezen keresztül lehet elérni a contexteket

export default ({ children }) => { // Children gyakorlatilag az <App /> component -> Az app comp. eléri az providerben beírt valuekat, mint global stateket ( user, isAuthed )
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        AuthService.isAuthenticated().then(data => {
            setUser(data.user);
            setIsAuthenticated(data.isAuthenticated);
            setIsLoaded(true);
        })
    }, [])

    // consumer 
    return (
        <div>
            {!isLoaded ? <h1>Loading</h1> :
                <AuthContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated }}> 
                    {children}
                </AuthContext.Provider>}
        </div>
    )
}