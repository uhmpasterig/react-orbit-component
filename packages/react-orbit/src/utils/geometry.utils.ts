const DEGREE_TO_RADIAN_FACTOR = Math.PI / 180;

export const calculateCoordinatesOnCircle = (radius: number, angle: number): { x: number; y: number } => {
  const angleInRadians = angle * DEGREE_TO_RADIAN_FACTOR;

  return {
    x: radius + (radius * Math.cos(angleInRadians)),
    y: radius + (radius * Math.sin(angleInRadians)),
  };
};
