const DEGREE_TO_RADIAN_FACTOR = Math.PI / 180;

export const calculateCoordinatesOnCircle = (radius: number, angle: number, boundingClientRect: DOMRect): { x: number; y: number } => {
  const angleInRadians = angle * DEGREE_TO_RADIAN_FACTOR;
  const { width, height } = boundingClientRect;
  const x = radius + (radius * Math.cos(angleInRadians));
  const y = radius + (radius * Math.sin(angleInRadians));
  const centerX = x - width / 2;
  const centerY = y - height / 2;
  return {
    x: centerX,
    y: centerY,
  };
};
