import React, { createContext, useState } from 'react';

// Create a context
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    // Add a console.log here to check the user data
    //console.log('UserContext user:', user);
    //console.log('UserContext allUsers:', allUsers);

    return (
        <UserContext.Provider value={{
            user,
            setUser,
        }}>
            {children}
        </UserContext.Provider>
    );
};