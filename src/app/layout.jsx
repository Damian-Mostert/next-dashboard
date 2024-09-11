"use client";

import { SessionProvider } from "next-auth/react";
import Modal from "@portal/lib/components/global/modal"
import { ThemeProvider } from "@src/lib/js/use-theme";
import { UserProvider } from "@src/lib/js/use-user";
import { Suspense } from "react";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <Suspense fallback={<>Please wait...</>}>    
            <SessionProvider>
                <ThemeProvider>
                    <UserProvider>
                        <body>
                            {children}
                            <Modal/>
                        </body>
                    </UserProvider>
                </ThemeProvider>
            </SessionProvider>
            </Suspense>
        </html>
    );
}
