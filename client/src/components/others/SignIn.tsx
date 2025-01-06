'use client';
import React, { useEffect, useRef } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const SignIn = () => {
    const formRef = useRef<HTMLFormElement>(null);


    // useEffect(() => {

    //     return () => {
    //         formRef.current?.reset();
    //     };
    // }, []);
    return (
        <form ref={formRef} className='flex flex-col gap-4'>
            <Input type="email" placeholder="Email" required />
            <Input type="password" placeholder="Password" required />
            <Button type="submit">Sign In</Button>
        </form>
    );
};

export default SignIn;