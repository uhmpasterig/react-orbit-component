import React, { useEffect, useRef, useState } from 'react';
import { useWindowSize } from 'src/hooks/useWindowSize';

export type OrbitPathTypes = 'circle';

interface OrbitPathProps {
  className?: string;
  children?: React.ReactNode;
  type: OrbitPathTypes;
  style?: React.CSSProperties;
}

/**
 * @description
 * OrbitPath is a component that creates a circular path for OrbitItems to follow.
 * @property width & height - Should be the same size.
 * @param className - Optional class name to add to the component.
 * @param children - The OrbitItems to be placed on the path.
 * @param type - The type of path to create.
 * @example <caption>Creating a circular path</caption>
 * <OrbitPath type="circle">
 *    <OrbitItem></OrbitItem>
 * </OrbitPath>
 */
export const OrbitPath: React.FC<OrbitPathProps> = ({ className, children, type, style }) => {
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
      } && style}
      className={className}
      ref={pathRef}
    >
      {newChildren}
    </div>
  );
};
