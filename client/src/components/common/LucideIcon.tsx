import dynamic from 'next/dynamic';
import { LucideProps as Props } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';

interface IconProps extends Props {
    name: keyof typeof dynamicIconImports;
}

const LucideIcon = ({ name, ...props }: IconProps) => {
    const LucideIcon = dynamic(dynamicIconImports[name]);

    return <LucideIcon {...props} />;
};

export default LucideIcon;