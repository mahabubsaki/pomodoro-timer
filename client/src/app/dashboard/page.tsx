'use client';

import Achievements from '@/components/others/Achievements';
import Barchart from '@/components/others/BarChart';
import Completed from '@/components/others/Completed';
import DailySessionTime from '@/components/others/DailySessionTime';
import Streak from '@/components/others/Streak';
import { useSession } from 'next-auth/react';
import { useTheme } from 'next-themes';


import React, { useEffect } from 'react';

export interface MockObjectWithId {
    id: string;
}

const Dashboard = () => {

    const { setTheme } = useTheme();
    const id = ((useSession().data?.user) as MockObjectWithId)?.id;
    const autehnticated = useSession().status === 'authenticated';
    const loading = useSession().status === 'loading';



    useEffect(() => {
        setTheme('light');


    }, [id]);
    if (!id) return <div>Please Login to Continue</div>;
    if (loading || (!id && autehnticated)) return <div>Loading...</div>;
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