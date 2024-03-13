import React, { useEffect, useRef, forwardRef, useState } from 'react';
import { calculateCoordinatesOnCircle } from '../utils';
import { Props } from 'useful-react-types';

type OrbitItemDirection = 'clockwise' | 'counter-clockwise';
/* export type OldOrbitItemProps = {
  children?: React.ReactNode;
  radius?: number;
  anglePerStep?: number;
  timeBetweenSteps?: number;
  startAngle?: number;
  direction?: OrbitItemDirection;
  style?: React.CSSProperties;
  angle?: number;
} & React.HTMLAttributes<HTMLDivElement>; */

type OrbitItemProps = {
  radius?: number;
  config?: {
    anglePerStep?: number;
    timeBetweenSteps?: number;
    startAngle?: number;
    direction?: OrbitItemDirection;
    angle?: number;
  };
  style?: React.CSSProperties;
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * OrbitItem is a component that moves around a circle path.
 * @param className - The class name of the component.
 * @param children - The children of the component.
 * @param radius - The radius of the circle used by the parent component.
 * @param anglePerStep - The angle per step in degrees.
 * @param timeBetweenSteps - The time between steps in milliseconds.
 * @param startAngle - The start angle.
 * @param direction - The direction of the orbit.
 * @param style - The style of the component.
 * @param angle - The angle of the component.
 * @param ref - The ref of the component.
 * @returns The component.
 * @example
 * ```tsx
 * <OrbitItem direction="clockwise" startAngle={120} step={0.2} className={SHARED_CLASSNAME}>
 *   😀
 * </OrbitItem>
 */
export const OrbitItem = forwardRef<HTMLDivElement, OrbitItemProps & Props.HasChildren>(
  (
    {
      className,
      children,
      radius = 0,
      config: { anglePerStep = 0.1, timeBetweenSteps = 0.1, startAngle = 0, direction = 'clockwise', angle },
      style,
      ...rest
    },
    ref,
  ) => {
    const [angleState, setAngle] = useState(startAngle);
    const effectiveAngle = angle ?? angleState;
    const internalRef = useRef<HTMLDivElement>(null);
    const actualRef = (ref ?? internalRef) as React.MutableRefObject<HTMLDivElement>;

    useEffect(() => {
      const interval = setInterval(() => {
        setAngle((prevAngle) => (direction === 'clockwise' ? prevAngle + (anglePerStep % 360) : prevAngle - (anglePerStep % 360)));
      }, timeBetweenSteps);

      return () => clearInterval(interval);
    }, [anglePerStep, timeBetweenSteps]);

    const { x, y } = calculateCoordinatesOnCircle(radius, effectiveAngle, actualRef.current?.getBoundingClientRect() ?? new DOMRect());

    return (
      <div
        style={{
          position: 'absolute',
          top: `${y}px`,
          left: `${x}px`,
          pointerEvents: 'all',
          ...style,
        }}
        className={className}
        ref={actualRef}
        {...rest}
      >
        {children}
      </div>
    );
  },
);
