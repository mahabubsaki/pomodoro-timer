import { baseAxios } from "@/lib/useAxios";
import { AxiosError } from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface Message {
    message: string;
}


const handler = NextAuth({
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials: Record<"email" | "password", string> | undefined) {
                try {

                    if (!credentials) throw new Error('Credentials not provided');
                    console.log(credentials, 'in authorize');

                    const response = await baseAxios.post(`/auth/findByEmail`, {
                        email: credentials.email,
                        password: credentials.password
                    });
                    console.log(response.data, 'in authorize');

                    const user = response.data.data;

                    return user || null;
                } catch (error) {

                    console.error('Error in authorize function:', (error as AxiosError));
                    throw new Error(((error as AxiosError)?.response?.data as Message)?.message || 'An error occurred');

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
        async session({ session }) {

            const fullUser = await baseAxios.get(`/auth/getUser?email=${session.user?.email}`);
            //@ts-expect-error :  Assign values to session.user
            session.user.avatarUrl = fullUser.data.data.avatarUrl;
            //@ts-expect-error :  Assign values to session.user
            session.user.id = fullUser.data.data.id;


            console.log(session, 'in session');
            return session;

        },
    },

});
export { handler as GET, handler as POST };
