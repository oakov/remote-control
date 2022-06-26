import robot from 'robotjs';
import Jimp from 'jimp';

export default async (x: number, y: number) => {
  const widthSize = 200;
  const heightSize = 200;
  const img = robot.screen.capture(
    x - widthSize / 2,
    y - heightSize / 2,
    widthSize,
    heightSize
  );

  // const jimp = new Jimp({
  //   data: img.image,
  //   width: img.width,
  //   height: img.height,
  // });

  // jimp.opacity(0);

  // const base64Img = await jimp.getBase64Async(Jimp.MIME_PNG);

  // const base64 = base64Img.split(',')[1];

  // var jimp = new Jimp(img.width, img.height);
  // for (var x = 0; x < img.width; x++) {
  //   for (var y = 0; y < img.height; y++) {
  //     var index = y * img.byteWidth + x * img.bytesPerPixel;
  //     var r = img.image[index];
  //     var g = img.image[index + 1];
  //     var b = img.image[index + 2];
  //     var num = r * 256 + g * 256 * 256 + b * 256 * 256 * 256 + 255;
  //     jimp.setPixelColor(num, x, y);
  //   }
  // }
  // const base64Img = await jimp.getBase64Async(Jimp.MIME_PNG);

  // const base64 = base64Img.split(',')[1];

  for (let i = 0; i < img.image.length; i++) {
    if (i % 4 == 0) {
      [img.image[i], img.image[i + 2]] = [img.image[i + 2], img.image[i]];
    }
  }

  // var jimg = new Jimp(img.width, img.height);
  // jimg.bitmap.data = img.image;

  const jimp = new Jimp({
    data: img.image,
    width: img.width,
    height: img.height,
  });

  const base64Img = await jimp.getBase64Async(Jimp.MIME_PNG);

  const base64 = base64Img.split(',')[1];

  return base64;
};
