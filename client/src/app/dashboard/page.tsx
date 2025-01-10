'use client';

import Achievements from '@/components/others/Achievements';
import Barchart from '@/components/others/BarChart';
import Completed from '@/components/others/Completed';
import DailySessionTime from '@/components/others/DailySessionTime';
import Streak from '@/components/others/Streak';
import { useSession } from 'next-auth/react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';

import React, { useEffect } from 'react';
import { toast } from 'sonner';


const Dashboard = () => {

    const { setTheme } = useTheme();
    const id = useSession().data?.user?.id;
    const loading = useSession().status === 'loading';
    const router = useRouter();


    useEffect(() => {
        setTheme('light');
        if (!id) {
            toast('Please Login to Continue');
            router.push('/');
        };
    }, [id]);
    if (!id) return null;
    if (loading) return <div>Loading...</div>;
    return (
        <div className='flex flex-col gap-10'>
            <Barchart />
            <Completed />
            <DailySessionTime />
            <Streak />
            <Achievements />
        </div>
    );
};

export default Dashboard;