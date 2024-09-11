import CredentialsProvider from "next-auth/providers/credentials";
import mongoDbClient from "./mongodb-client";

const providers = [
	CredentialsProvider(mongoDbClient),
]
export default providers;
