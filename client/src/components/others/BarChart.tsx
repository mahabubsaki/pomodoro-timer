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

const chartData = [
    { month: "January", desktop: 186 },
    { month: "February", desktop: 305 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 73 },
    { month: "May", desktop: 209 },
    { month: "June", desktop: 214 },
];


const Barchart = () => {
    const x = useSession();
    const id = x.data?.user?.id;
    const { data } = useQuery({
        queryKey: ['barchart', id],
        queryFn: async () => {
            const response = await baseAxios.get(`/focus/get/${id}`);
            console.log(response);
        },
        enabled: !!id
    });
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Bar Chart</CardTitle>
                    <CardDescription>January - June 2024</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig}>
                        <BarChart accessibilityLayer data={chartData}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="date"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel />}
                            />
                            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8} />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
                <CardFooter className="flex-col items-start gap-2 text-sm">
                    <div className="flex gap-2 font-medium leading-none">
                        Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                    </div>
                    <div className="leading-none text-muted-foreground">
                        Showing total visitors for the last 6 months
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Barchart;