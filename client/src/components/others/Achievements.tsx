import { baseAxios } from '@/lib/useAxios';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import React from 'react';
import { Progress } from '../ui/progress';

const Achievements = () => {
    const session = useSession();
    const id = session.data?.user?.id;

    const { data: achievements } = useQuery({
        queryKey: ['achievements', id],
        enabled: !!id,
        queryFn: async () => {
            const response = await baseAxios.get(`/focus/achievements/${id}`);
            return response.data?.data || [];
        },
        initialData: [],
    });
    return (
        <section className="p-8 ">
            <h2 className="text-3xl font-bold text-center mb-8">Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {achievements.map((achievement, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">

                        <div  >
                            <h3 className="text-xl font-semibold mb-2">{achievement.title}</h3>
                            <p className="text-gray-600">{achievement.description}</p>
                        </div>
                        <Progress value={achievement.percentage} />
                        Completed : {achievement.completed} / {achievement.target}
                    </div>
                ))}
            </div>
        </section>
    );;
};

export default Achievements;