import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const response = await axios.post("/api/get-user-data", {}, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (response.data.success) {
                    setUser(response.data.success);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        loadUser();
    }, []);

    return (
        <UserContext.Provider value={{ user }}>
            {children}
        </UserContext.Provider>
    );
}

export default function useUser() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}
