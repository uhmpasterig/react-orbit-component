const DEGREE_TO_RADIAN_FACTOR = Math.PI / 180;

export const calculateCoordinatesOnCircle = (radius: number, angle: number): { x: number; y: number } => {
  const angleInRadians = angle * DEGREE_TO_RADIAN_FACTOR;

  return {
    x: radius * (1 + Math.cos(angleInRadians)),
    y: radius * (1 + Math.sin(angleInRadians)),
  };
};
