import robot from 'robotjs';

export default (x: number, y: number, width: number, height: number) => {
  robot.mouseToggle('down');
  for (let i = 0; i <= width; i++) robot.dragMouse(x + i, y);
  for (let i = 0; i <= height; i++) robot.dragMouse(x + width, y + i);
  for (let i = 0; i <= width; i++) robot.dragMouse(x + width - i, y + height);
  for (let i = 0; i <= height; i++) robot.dragMouse(x, y + height - i);
  robot.mouseToggle('up');
};
