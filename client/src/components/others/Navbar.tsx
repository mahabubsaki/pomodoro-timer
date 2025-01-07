'use client';
import React from 'react';
import LucideIcon from '../common/LucideIcon';
import NavList from '../common/NavList';
import ToolTip from '../common/ToolTip';
import NAVBAR_ENUMS from '@/configs/enums/navbar';
import ROOTENUMS from '@/configs/enums';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';



const Navbar = () => {
    const x = useSession();
    const user = x?.data?.user;
    return (
        <nav className=' px-3 sm:px-8 py-5'>
            <div className='flex justify-between items-center'>
                <h1 className='text-xl sm:text-2xl font-bold text-white flex items-center gap-2'><LucideIcon name='book-check' size={ROOTENUMS.BIGICONSIZE} />{NAVBAR_ENUMS.APPNAME}</h1>
                <ul className='flex gap-1 items-center '>




                    {user ? <>

                        <Avatar>
                            <AvatarImage src={user.avatarUrl} alt="@shadcn" />
                            <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <NavList>
                            <button onClick={() => signOut({})}>
                                <LucideIcon name='log-out' className='hidden sm:inline' size={ROOTENUMS.SMALLICONSIZE} />
                                <span className='hidden sm:inline'>{NAVBAR_ENUMS.LOGOUT}</span>
                                <div className='flex justify-center items-center sm:hidden'>
                                    <ToolTip content={NAVBAR_ENUMS.LOGOUT}>
                                        <LucideIcon name='log-out' size={ROOTENUMS.SMALLICONSIZE} />
                                    </ToolTip>
                                </div>
                            </button>
                        </NavList>
                        <NavList >
                            <LucideIcon name='layout-dashboard' className='hidden sm:inline' size={ROOTENUMS.SMALLICONSIZE} />
                            <span className='hidden sm:inline'>{NAVBAR_ENUMS.DASHBOARD}</span>
                            <div className='flex justify-center items-center sm:hidden'>
                                <ToolTip content={NAVBAR_ENUMS.DASHBOARD}>
                                    <LucideIcon name='layout-dashboard' size={ROOTENUMS.SMALLICONSIZE} />
                                </ToolTip>
                            </div>
                        </NavList>
                    </> : <> <Dialog>
                        <DialogTrigger asChild>
                            <li className=' text-sm text-white bg-white/30 px-3 py-1.5 text-white/90 cursor-pointer hover:text-white/100 flex rounded-md items-center gap-1 hover:brightness-125'>

                                <LucideIcon name='circle-user' className='hidden sm:inline' size={ROOTENUMS.SMALLICONSIZE} />
                                <span className='hidden sm:inline'>{NAVBAR_ENUMS.SIGNIN}</span>
                                <div className='flex justify-center items-center sm:hidden'>
                                    <ToolTip content={NAVBAR_ENUMS.SIGNIN}>
                                        <LucideIcon name='circle-user' size={ROOTENUMS.SMALLICONSIZE} />
                                    </ToolTip>
                                </div>
                            </li>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle>Welcome to Pomodoro</DialogTitle>

                            </DialogHeader>
                            <Tabs defaultValue="signIn" className="w-full">
                                <TabsList>
                                    <TabsTrigger value="signIn">Sign In</TabsTrigger>
                                    <TabsTrigger value="signUp">Sign Up</TabsTrigger>
                                </TabsList>
                                <TabsContent value="signIn">
                                    <SignIn />
                                </TabsContent>
                                <TabsContent value="signUp">
                                    <SignUp />
                                </TabsContent>
                            </Tabs>
                        </DialogContent>
                    </Dialog>




                    </>}
                </ul>
            </div>
        </nav>

    );
};

export default Navbar;