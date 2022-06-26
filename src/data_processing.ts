import robot from 'robotjs';
import drawCircle from './circle';

export default async (data: string) => {
  const [command, param1, param2] = data.split(' ');
  console.log(command, param1, param2);
  const { x, y } = robot.getMousePos();
  switch (command) {
    case 'mouse_position':
      return `mouse_position ${x},${y} \0`;
    case 'mouse_left':
      robot.moveMouse(-param1 + x, y);
      return `mouse_left \0`;
    case 'mouse_right':
      robot.moveMouse(+param1 + x, y);
      return `mouse_right \0`;
    case 'mouse_down':
      robot.moveMouse(x, +param1 + y);
      return `mouse_down \0`;
    case 'mouse_up':
      robot.moveMouse(x, -param1 + y);
      return `mouse_up \0`;
    case 'draw_circle':
      drawCircle(x, y, +param1);
      return 'draw_circle \0';
    default:
      return 'FFFFFFFF';
  }
};
