import React from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import TABSENUM from '@/configs/enums/tabs';
import Link from 'next/link';
import Focus from './Focus';
import Break from './Break';

const Timer = ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined; }; }) => {
    const { route } = searchParams;

    return (

        <Tabs defaultValue={Array.isArray(route) ? route[0] : route ? route : TABSENUM.FOCUS} className="w-full px-4" >
            <TabsList >
                <TabsTrigger value={TABSENUM.FOCUS} ><Link href={`?route=${TABSENUM.FOCUS}`}>
                    {TABSENUM.FOCUS}</Link>
                </TabsTrigger>
                <TabsTrigger value={TABSENUM.BREAK}><Link href={`?route=${TABSENUM.BREAK}`}>
                    {TABSENUM.BREAK}</Link></TabsTrigger>
            </TabsList>
            <TabsContent value={TABSENUM.FOCUS}><Focus /></TabsContent>
            <TabsContent value={TABSENUM.BREAK}><Break /></TabsContent>
        </Tabs>
    );
};

export default Timer;

;