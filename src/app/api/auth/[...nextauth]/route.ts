// imports
import NextAuth from "next-auth";
import providers from "./providers";

const root = process.env.NEXT_PUBLIC_NEXT_URL+"/"

const handler = NextAuth({
  debug: true,
  providers,
  pages: {
    signIn: root,
    signOut: root,
    error:root
  },
  callbacks: {
    
    async session({ session, token }:any) {
      session.user.id = token.sub;
      return session;
    }
  },
});

export { handler as GET, handler as POST };
