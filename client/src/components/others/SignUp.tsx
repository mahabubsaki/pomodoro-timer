'use client';
import React, { useEffect, useRef } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const SignUp = () => {
    const formRef = useRef<HTMLFormElement>(null);


    // useEffect(() => {

    //     return () => {
    //         formRef.current?.reset();
    //     };
    // }, []);
    return (
        <form className='flex flex-col gap-4'>
            <Input type="text" name='text' placeholder="Name" required />
            <Input type="email" name='email' placeholder="Email" required />
            <Input type="file" name='file' required />

            <Input type="password" name='password' placeholder="Password" required />
            <Button type="submit">Sign Up</Button>
        </form>
    );
};

export default SignUp;