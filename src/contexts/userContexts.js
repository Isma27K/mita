import React, { createContext, useState } from 'react';

// Create a context
export const UserContext = createContext(null); // Use null instead of passing undefined parameters

// Create a provider component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [content, setContent] = useState(1);

    // Add a console.log here to check the user data
    //console.log('UserContext user:', user);
    //console.log('UserContext content:', content);

    return (
        <UserContext.Provider value={{
            user,
            setUser,
            content,
            setContent,
        }}>
            {children}
        </UserContext.Provider>
    );
};