import { baseAxios } from '@/lib/useAxios';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '../ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';
import { Bar, BarChart, XAxis, YAxis } from 'recharts';

const chartConfig = {
    value: {
        label: "Focus Minutes",
        color: "hsl(var(--chart-1))",
    },
};

const DailySessionTime = () => {
    const x = useSession();
    const id = x.data?.user?.id;
    const [date, setDate] = React.useState(new Date());
    const { data } = useQuery({
        queryKey: ['daily', id, date],
        queryFn: async () => {
            const response = await baseAxios.get(`/focus/daily/${id}?time=${date.toISOString()}`);
            return response.data?.data || [];
        },
        enabled: !!id,
        initialData: [],
    });
    console.log(date, data);
    return (
        <div>
            <p className='text-center text-xl my-4'>Select A date to check daily Report</p>
            <Popover>
                <PopoverTrigger asChild>

                    <Button
                        variant={"outline"}
                        className={cn(
                            "w-[280px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        toDate={new Date()}
                    />
                </PopoverContent>
            </Popover>
            <Card>
                <CardHeader>
                    <CardTitle>Daily Progression</CardTitle>
                </CardHeader>
                <CardContent className='horizontal'>
                    <ChartContainer config={chartConfig}>
                        <BarChart
                            accessibilityLayer
                            data={data}
                            barSize={10}
                            layout="vertical"

                        // margin={{
                        //     left: -20,
                        // }}
                        >
                            <XAxis type="number" dataKey="value" hide />
                            <YAxis
                                dataKey="timeRange"
                                type="category"
                                interval={0}

                                tickLine={false}
                                // tickMargin={-10}
                                axisLine={false}

                            //   tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel />}
                            />
                            <Bar dataKey="value" fill="var(--color-desktop)" radius={5} />
                        </BarChart>
                    </ChartContainer>
                </CardContent>

            </Card>
        </div>
    );
};

export default DailySessionTime;