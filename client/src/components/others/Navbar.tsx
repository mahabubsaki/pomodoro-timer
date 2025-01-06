
import React from 'react';
import LucideIcon from '../common/LucideIcon';
import NavList from '../common/NavList';
import ToolTip from '../common/ToolTip';
import NAVBAR_ENUMS from '@/configs/enums/navbar';
import ROOTENUMS from '@/configs/enums';


const Navbar = () => {
    return (
        <nav className=' px-3 sm:px-8 py-5'>
            <div className='flex justify-between items-center'>
                <h1 className='text-xl sm:text-2xl font-bold text-white flex items-center gap-2'><LucideIcon name='book-check' size={ROOTENUMS.BIGICONSIZE} />{NAVBAR_ENUMS.APPNAME}</h1>
                <ul className='flex gap-1 items-center '>
                    <NavList >
                        <LucideIcon name='circle-user' className='hidden sm:inline' size={ROOTENUMS.SMALLICONSIZE} />
                        <span className='hidden sm:inline'>{NAVBAR_ENUMS.SIGNIN}</span>
                        <div className='flex justify-center items-center sm:hidden'>
                            <ToolTip content={NAVBAR_ENUMS.SIGNIN}>
                                <LucideIcon name='circle-user' size={ROOTENUMS.SMALLICONSIZE} />
                            </ToolTip>
                        </div>
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
                </ul>
            </div>
        </nav>

    );
};

export default Navbar;