import { baseAxios } from "@/lib/useAxios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


const handler = NextAuth({
    secret: 'mysecret',
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                try {

                    const response = await baseAxios.post(`/auth/findByEmail`, {
                        email: credentials.email,
                        password: credentials.password
                    });

                    const user = response.data.data;
                    console.log(user, 'in auth');
                    return user || null;
                } catch (error) {
                    console.error('Error in authorize function:', error.response.data);
                    throw new Error(error.response.data.message);

                }
            },
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token }) {
            return token;

        },
        async session({ session, token }) {

            const fullUser = await baseAxios.get(`/auth/getUser?email=${session.user?.email}`);
            session.user.avatarUrl = fullUser.data.data.avatarUrl;

            console.log(session, 'in session');
            return session;

        },
    },

});
export { handler as GET, handler as POST };
