import React, { useEffect } from 'react';
import { calculateCoordinatesOnCircle } from '../utils';

type OrbitItemDirection = 'clockwise' | 'counter-clockwise';
export type OrbitItemProps = {
  className?: string;
  children?: React.ReactNode;

  radius?: number;

  step?: number;
  delay?: number;
  startAngle?: number;
  direction?: OrbitItemDirection;
  style?: React.CSSProperties;
} & React.HTMLAttributes<HTMLDivElement>;

export const OrbitItem = ({
  className,
  children,
  radius = 0,
  step = 0.1,
  delay = 10,
  startAngle = 0,
  direction = 'clockwise',
  style,
  ...rest
}: OrbitItemProps) => {
  const [angle, setAngle] = React.useState(startAngle);

  useEffect(() => {
    const interval = setInterval(() => {
      setAngle((prevAngle) => (direction === 'clockwise' ? prevAngle + (step % 360) : prevAngle - (step % 360)));
    }, delay);

    return () => clearInterval(interval);
  }, [step, delay]);

  const { x, y } = calculateCoordinatesOnCircle(radius, angle);

  return (
    <div
      style={{
        position: 'absolute',
        top: `${y}px`,
        left: `${x}px`,
        transform: `translate(-50%, -50%)`,
        pointerEvents: 'all',
        ...style,
      }}
      className={className}
      {...rest}
    >
      {children}
    </div>
  );
};
