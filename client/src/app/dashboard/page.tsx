'use client';

import Barchart from '@/components/others/BarChart';
import { useTheme } from 'next-themes';

import React, { useEffect } from 'react';


const Dashboard = () => {

    const { setTheme } = useTheme();


    useEffect(() => {
        setTheme('light');
    }, []);
    return (
        <div>Dashboard
            <Barchart />
        </div>
    );
};

export default Dashboard;