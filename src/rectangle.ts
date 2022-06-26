import robot from 'robotjs';

export default (x: number, y: number, width: number, height: number) => {
  robot.mouseToggle('down');
  robot.moveMouseSmooth(x + width, y);
  robot.moveMouseSmooth(x + width, y + height);
  robot.moveMouseSmooth(x, y + height);
  robot.moveMouseSmooth(x, y);
  robot.mouseToggle('up');
};
