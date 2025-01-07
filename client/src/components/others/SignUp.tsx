'use client';
import React, { useEffect, useRef } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import axios from 'axios';
import useAxios from '@/lib/useAxios';
const apiKey = '28f7e689e78cbdf683b41d414ebda692';
const SignUp = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const axiosCustom = useAxios();
    const { mutate, isPending } = useMutation({
        mutationFn: async (data: any) => {
            const formData = new FormData();
            const { file, ...rest } = data;
            formData.append('image', file);
            const imgbb = await axios.post(`https://api.imgbb.com/1/upload?key=${apiKey}`, formData);
            const imgUrl = imgbb?.data?.data?.url;
            const user = await axiosCustom.post('/auth/register', {
                ...rest,
                avatarUrl: imgUrl
            });
            return user.data;
        },
        onError: (error) => {
            console.log(error?.response?.data?.message);
            toast.error(error?.response?.data?.errors?.[0]?.msg || error?.response?.data?.message || 'An error occurred');
        },
        onSuccess: (data) => {
            console.log(data);
            toast.success('Signed Up Successfully, Please Sign In');
            formRef.current?.reset();
        }
    });


    useEffect(() => {

        return () => {
            formRef.current?.reset();
        };
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        mutate(data);

    };
    return (
        <form className='flex flex-col gap-4' onSubmit={handleSubmit} ref={formRef}>
            <Input type="text" name='name' placeholder="Name" required />
            <Input type="email" name='email' placeholder="Email" required />
            <Input type="file" name='file' required />

            <Input type="password" name='password' placeholder="Password" required />
            <Button type="submit">Sign Up</Button>
        </form>
    );
};

export default SignUp;