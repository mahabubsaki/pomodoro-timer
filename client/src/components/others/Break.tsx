'use client';
import React, { useEffect, useState } from 'react';
import { AspectRatio } from '../ui/aspect-ratio';

import { CircleCheck, LockIcon, Pause, Play, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';
import useSound from 'use-sound';
import { useMediaQuery } from "@uidotdev/usehooks";
import { AnimatePresence, motion } from 'motion/react';
import NumberFlow from '@number-flow/react';
import { useTheme } from 'next-themes';
import { useSession } from 'next-auth/react';



const Break = () => {
    const [time, setTime] = useState(5 * 60);
    const session = useSession();
    const user = session.data?.user;
    const [isRunning, setIsRunning] = useState(false);

    const [playComplete] = useSound('https://ucarecdn.com/a8cecdaa-5776-4c8b-965b-ab83a4f1a37a/done.mp3');
    const [playStart] = useSound('https://ucarecdn.com/adf2265a-b9d6-4944-99c3-4f7a05256e25/togglebuttonon166329.mp3');
    const [playPause] = useSound('https://ucarecdn.com/b602d533-d98f-4edb-af82-407b6e6c48e9/togglebuttonoff166328.mp3');
    const [playDone] = useSound('https://ucarecdn.com/3db6cbb4-6839-406d-891d-2eb3a0f14c1b/soundalertdeviceturnonturnoffwindonechakongaudio174892.mp3');
    const [playRestart] = useSound('https://ucarecdn.com/c6e975fc-2bb7-4112-87f3-30b2d8e2740d/switchclickandbeep001a11602.mp3');

    const { setTheme } = useTheme();

    useEffect(() => {
        setTheme('light');
    }, []);
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isRunning) {
            interval = setInterval(() => {
                setTime((prevTime) => {
                    if (prevTime === 0) {
                        clearInterval(interval);
                        toast.success('Completed the Session, Well Done', {
                            id: 'time-up',
                        });
                        playComplete();
                        setTime(1 * 10);
                        setIsRunning(false);

                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const handleDone = () => {
        if (!isRunning) return;
        playDone();
        toast.success('Finished the Counting', {
            id: 'time-up',
        });
        setTime(1 * 10);
        setIsRunning(false);
    };
    const handleRestart = () => {
        if (time - 1 * 10 === 0) return;
        playRestart();
        toast.info('Restarted the Counting', {
            id: 'time-up',
        });
        setTime(1 * 10);
        setIsRunning(false);
    };
    const isMediumDevice = useMediaQuery(
        "only screen and (min-width : 700px)"
    );
    return (
        <div className='w-full sm:w-3/4 xl:w-1/2 mx-auto relative'>
            <div className=" bg-white/10 backdrop-blur-sm mx-4 sm:mx-0 rounded-md p-4">
                <AspectRatio ratio={isMediumDevice ? 16 / 9 : 12 / 10} className='flex justify-center gap-16 items-center flex-col' >
                    <span className='text-5xl md:text-8xl font-bold'>
                        <NumberFlow prefix={minutes > 9 ? undefined : `0`} value={minutes} />  : <NumberFlow prefix={time % 60 > 9 ? undefined : `0`} value={seconds} /> </span>

                    <div className='flex items-center gap-4'>
                        <button className='bg-white/20 p-5 group rounded-full overflow-hidden' onClick={() => {
                            setIsRunning((pre) => {
                                if (!pre) {
                                    playStart();
                                } else {
                                    playPause();
                                }
                                return !pre;
                            });
                        }}>

                            {isRunning ? (

                                <Pause className='group-hover:text-yellow-500 text-white duration-300' size={isMediumDevice ? 40 : 24} />

                            ) : (

                                <Play className='group-hover:text-blue-500 text-white duration-300' size={isMediumDevice ? 40 : 24} />

                            )}




                        </button>
                        <AnimatePresence>
                            {isRunning && <motion.button initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} onClick={handleDone} className='bg-white/20 p-5 group rounded-full overflow-hidden'>

                                <CircleCheck className='group-hover:text-green-500 text-white duration-300' size={isMediumDevice ? 40 : 24} />


                            </motion.button>}
                        </AnimatePresence>

                        <button onClick={handleRestart} className='bg-white/20 p-5 group rounded-full overflow-hidden'>

                            <RotateCcw className='group-hover:text-red-500 text-white duration-300' size={isMediumDevice ? 40 : 24} />


                        </button>


                    </div>


                </AspectRatio>
            </div>

            <blockquote className='mt-4 text-sm md:text-lg font-semibold text-center italic'>Take a break, refresh your mind and start again with full energy.</blockquote>
            <AnimatePresence>

                {!user && <motion.div initial={{
                    opacity: 0
                }} animate={{
                    opacity: 1
                }} exit={{
                    opacity: 0
                }} transition={{
                    delay: 0.5
                }} className='absolute inset-0 bg-white/10 backdrop-blur z-30 rounded-md flex justify-center items-center flex-col gap-4'>
                    <LockIcon size={100} />
                    <p className='text-2xl'>Login to Use this feature</p>
                </motion.div>}
            </AnimatePresence>
        </div>
    );
};

export default Break;