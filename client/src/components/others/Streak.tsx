import { baseAxios } from '@/lib/useAxios';
import { useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

const Streak = () => {
    const queryClient = useQueryClient();
    const session = useSession();

    const id = session.data?.user?.id;

    const [data, setData] = useState({});

    useEffect(() => {
        if (!id) return;
        (async function () {
            const data = await queryClient.fetchQuery({
                queryKey: ['streak', id],
                queryFn: async () => {
                    const data = queryClient.getQueryData(['streak', id]);
                    if (data) return data;
                    const response = await baseAxios.get(`/focus/streak/${id}`);
                    return response.data?.data || {};
                },

            });
            setData(data);
        })();
    }, [id]);
    return (
        <div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-2xl font-bold'>
                <div className='flex flex-col justify-center items-center text-4xl'>
                    <h1>Current Streak</h1>
                    <h1>{data.streakCount}</h1>
                </div>
                <div className='flex flex-col justify-center items-center text-4xl'>
                    <h1>Longest Streak</h1>
                    <h1>{data.longestStreak}</h1>
                </div>
                <div className='flex flex-col justify-center items-center text-4xl'>
                    <h1>Total Sessions</h1>
                    <h1>{data.sessionNo}</h1>
                </div>

            </div>
            <p className='text-center my-4 font-xl'>Great job! You&apos;re on a {data?.streakCount || 1}-day streak!</p>
        </div>
    );
};

export default Streak;