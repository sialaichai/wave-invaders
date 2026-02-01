declare module 'lucide-react' {
  import * as React from 'react';
  
  interface IconProps {
    color?: string;
    size?: string | number;
    strokeWidth?: string | number;
    className?: string;
    style?: React.CSSProperties;
  }
  
  type Icon = React.FC<IconProps>;
  
  export const Check: Icon;
  export const X: Icon;
  export const HelpCircle: Icon;
  export const Rocket: Icon;
  export const Target: Icon;
  export const Brain: Icon;
  export const Zap: Icon;
  export const ChevronRight: Icon;
  export const RotateCcw: Icon;
  export const Trophy: Icon;
  export const Star: Icon;
}
