import db from "@src/lib/config/db";
import { Document } from "mongoose";

// Define a more specific user type if possible
interface User extends Document {
    email: string;
    password: string;
    crud: {
        create: boolean;
        read: boolean;
        update: boolean;
        delete: boolean;
    };
}

const mongoDbClient: any = {
    name: "credentials",
    credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
    },
    async authorize({ email, password }: { email: string; password: string }) {
        try {
            // Explicitly select password and crud fields to ensure they are included
            const user: User | null = await db.models.users.findOne({ email }).select('email password crud');

            if (!user) {
                throw new Error("User not found");
            }

            if (user.password !== password) {
                throw new Error("Invalid password");
            }

            if (!user.crud.read) {
                throw new Error("User unautherized");
            }

            return user;
        } catch (error) {
            console.error("MongoDB login error:", error instanceof Error ? error.message : error);
            return null; // Return null if login failed
        }
    },
};

export default mongoDbClient;
