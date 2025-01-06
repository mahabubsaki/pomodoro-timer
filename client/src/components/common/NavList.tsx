import React, { ReactNode } from 'react';

const NavList = ({ children }: { children: ReactNode; }) => {
    return (
        <li className=' text-sm text-white bg-white/30 px-3 py-1.5 text-white/80 cursor-pointer hover:text-white/100 flex rounded-md items-center gap-1'>{children}
        </li>
    );
};

export default NavList;