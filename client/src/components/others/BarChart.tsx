'use client';
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';


import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { useQuery } from '@tanstack/react-query';
import { baseAxios } from '@/lib/useAxios';
import { useSession } from 'next-auth/react';
import { MockObjectWithId } from '@/app/dashboard/page';
const chartConfig = {
    focusMinutes: {
        label: "Focus Minutes",
        color: "hsl(var(--chart-1))",
    },
};


interface FocusData {
    date: string;
    focusMinutes: number;
}
const Barchart = () => {
    const x = useSession();
    const id = (x.data?.user as MockObjectWithId)?.id;
    const { data } = useQuery({
        queryKey: ['barchart', id],
        queryFn: async () => {
            const response = await baseAxios.get(`/focus/get/${id}`);
            return (response.data?.data as FocusData[]) || [];
        },
        enabled: !!id,
        initialData: []
    });
    console.log(data);
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Your Focus Minutes on Last 7 Days</CardTitle>
                    <CardDescription>{data?.[0]?.date} - {data?.[data?.length - 1]?.date}</CardDescription>
                    <CardDescription>You Took {data.reduce((pre, cur) => pre + cur.focusMinutes, 0)}  Minutes of Focus Session on Last 7 Days</CardDescription>
                </CardHeader>
                <CardContent>
                    {id && data && <ChartContainer config={chartConfig}>
                        <BarChart accessibilityLayer data={data}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="date"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => {

                                    return value.slice(0, 3) + " " + value.split(" ")[1];
                                }}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel />}
                            />
                            <Bar dataKey="focusMinutes" fill="var(--color-desktop)" radius={8} />
                        </BarChart>
                    </ChartContainer>}
                </CardContent>

            </Card>
        </div>
    );
};

export default Barchart;