'use client';
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';



import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { useQuery } from '@tanstack/react-query';
import { baseAxios } from '@/lib/useAxios';
import { useSession } from 'next-auth/react';
const chartConfig = {
    focusMinutes: {
        label: "Focus Minutes",
        color: "hsl(var(--chart-1))",
    },
};



const Barchart = () => {
    const x = useSession();
    const id = x.data?.user?.id;
    const { data } = useQuery({
        queryKey: ['barchart', id],
        queryFn: async () => {
            const response = await baseAxios.get(`/focus/get/${id}`);
            return response.data?.data || [];
        },
        enabled: !!id
    });
    console.log(data);
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Your Focus Minutes on Last 7 Days</CardTitle>
                    <CardDescription>{data?.[0]?.date} - {data?.[data?.length - 1]?.date}</CardDescription>
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