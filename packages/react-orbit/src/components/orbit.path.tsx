import React, { useEffect, useRef, useState } from 'react';
import { useWindowSize } from 'src/hooks/useWindowSize';

export type OrbitPathTypes = 'circle';

interface OrbitPathProps {
  className?: string;
  children?: React.ReactNode;
  type: OrbitPathTypes;
}

export const OrbitPath: React.FC<OrbitPathProps> = ({ className, children, type }) => {
  const pathRef = useRef<HTMLDivElement>(null);
  const [newChildren, setNewChildren] = useState<React.ReactNode[]>([]);
  const size = useWindowSize();

  useEffect(() => {
    if (!pathRef.current) return;

    const { offsetHeight: height, offsetWidth: width } = pathRef.current;

    if (width !== height) {
      console.error('OrbitPath must be a circle with equal height and width.');
      return;
    }

    const radius = height / 2;
    const childrenArray = React.Children.toArray(children);

    const updatedChildren = childrenArray.map((child, index) => {
      const childElement = child as React.ReactElement;
      const newProps = { ...childElement.props, radius };

      return React.cloneElement(childElement, { ...newProps, key: index });
    });

    setNewChildren(updatedChildren);
  }, [children, size]);

  return (
    <div
      style={{
        pointerEvents: 'none',
      }}
      className={className}
      ref={pathRef}
    >
      {newChildren}
    </div>
  );
};
