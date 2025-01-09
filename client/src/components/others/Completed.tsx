import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import { baseAxios } from '@/lib/useAxios';

const chartConfig = {
    completedSessions: {
        label: "Completed Session",
        color: "hsl(var(--chart-1))",
    },
};

const Completed = () => {
    const x = useSession();
    const id = x.data?.user?.id;
    const { data } = useQuery({
        queryKey: ['completed', id],
        queryFn: async () => {
            const response = await baseAxios.get(`/focus/completed/${id}`);
            return response.data?.data || [];
        },
        enabled: !!id,
        initialData: [],
    });
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Your Completed Sessions on Last 7 Days</CardTitle>
                    <CardDescription>{data?.[0]?.date} - {data?.[data?.length - 1]?.date}</CardDescription>
                    <CardDescription>You Completed {data.reduce((pre, cur) => pre + cur.completedSessions, 0)} Session on Last 7 days</CardDescription>
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

                                    return value.slice(0, 3) + " " + value.split(" ")[1] + " ";
                                }}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel />}
                            />
                            <Bar dataKey="completedSessions" fill="var(--color-desktop)" radius={8} />
                        </BarChart>
                    </ChartContainer>}
                </CardContent>

            </Card>
        </div>
    );
};

export default Completed;