import { useId } from 'react';
import clsx from 'clsx';

// @todo replace these with FontAwesome to reduce LOC in our code
import { InstallationIcon } from '@/components/icons/InstallationIcon';
import { LightbulbIcon } from '@/components/icons/LightbulbIcon';
import { PresetsIcon } from '@/components/icons/PresetsIcon';
import { WarningIcon } from '@/components/icons/WarningIcon';
import { Nozzle } from '@/components/icons/Nozzle';

const icons = {
  installation: InstallationIcon,
  presets: PresetsIcon,
  lightbulb: LightbulbIcon,
  warning: WarningIcon,
  nozzle: Nozzle,
};

const iconStyles = {
  blue: '[--icon-foreground:theme(colors.slate.900)] [--icon-background:theme(colors.white)]',
  amber: '[--icon-foreground:theme(colors.amber.900)] [--icon-background:theme(colors.amber.100)]',
};

export function Icon ({ icon, color = 'blue', className, ...props }) {
  let id = useId();
  let IconComponent = icons[icon];

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 32 32"
      fill="none"
      className={clsx(className, iconStyles[color])}
      {...props}
    >
      <IconComponent id={id} color={color} />
    </svg>
  );
}

const gradients = {
  blue: [
    { stopColor: '#0ea5e9' },
    { stopColor: '#22d3ee', offset: '.527' },
    { stopColor: '#818cf8', offset: 1 },
  ],
  amber: [
    { stopColor: '#fde68a', offset: '.08' },
    { stopColor: '#f59e0b', offset: '.837' },
  ],
};

export function Gradient ({ color = 'blue', ...props }) {
  return (
    <radialGradient
      cx={0}
      cy={0}
      r={1}
      gradientUnits="userSpaceOnUse"
      {...props}
    >
      {gradients[color].map((stop, stopIndex) => (
        <stop key={stopIndex} {...stop} />
      ))}
    </radialGradient>
  );
}

export function LightMode ({ className, ...props }) {
  return <g className={clsx('dark:hidden', className)} {...props} />;
}

export function DarkMode ({ className, ...props }) {
  return <g className={clsx('hidden dark:inline', className)} {...props} />;
}
