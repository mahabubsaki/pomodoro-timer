'use client';

import Barchart from '@/components/others/BarChart';
import Completed from '@/components/others/Completed';
import DailySessionTime from '@/components/others/DailySessionTime';
import Streak from '@/components/others/Streak';
import { useTheme } from 'next-themes';

import React, { useEffect } from 'react';


const Dashboard = () => {

    const { setTheme } = useTheme();


    useEffect(() => {
        setTheme('light');
    }, []);
    return (
        <div className='flex flex-col gap-10'>
            <Barchart />
            <Completed />
            <DailySessionTime />
            <Streak />
        </div>
    );
};

export default Dashboard;