import robot from 'robotjs';

export default (x: number, y: number, r: number) => {
  robot.mouseToggle('down');
  for (let i = 0; i <= Math.PI * 2 + 0.05; i += 0.05) {
    const nextX = x + r * (1 - Math.cos(i));
    const nextY = y + r * Math.sin(i);
    robot.dragMouse(nextX, nextY);
  }
  robot.mouseToggle('up');
};
