'use client';
import React, { useEffect, useRef } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';
const SignIn = () => {
    const formRef = useRef<HTMLFormElement>(null);


    useEffect(() => {

        return () => {
            formRef.current?.reset();
        };
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        const result = await signIn('credentials', {
            redirect: false,
            email: data.email,
            password: data.password,
        });
        if (!result?.ok) {
            console.log(result);
            toast.error(result?.error || 'An error occurred');
        }
        console.log(result);


    };
    return (
        <form ref={formRef} onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <Input type="email" name='email' placeholder="Email" required />
            <Input type="password" name='password' placeholder="Password" required />
            <Button type="submit">Sign In</Button>
        </form>
    );
};

export default SignIn;