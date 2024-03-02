import React, { useEffect, useRef, useState } from 'react';

export type OrbitPathTypes = 'circle';

interface OrbitPathProps {
  className?: string;
  children?: React.ReactNode;
  type: OrbitPathTypes;
}

export const OrbitPath: React.FC<OrbitPathProps> = ({ className, children, type }) => {
  const pathRef = useRef<HTMLDivElement>(null);
  const [newChildren, setNewChildren] = useState<React.ReactNode[]>([]);

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
  }, [children]);

  return (
    <div className={className} ref={pathRef}>
      {newChildren}
    </div>
  );
};
