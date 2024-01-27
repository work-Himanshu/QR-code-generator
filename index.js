import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

inquirer
  .prompt([
    {
      message: "Type in your URL: ",
      name: "URL",
    }
  ])
  .then((answers) => {
    const url = answers.URL;
    const qr_svg = qr.image(url, { type: 'png' });
    const output = fs.createWriteStream('qr_image.png');

    qr_svg.pipe(output);

    output.on('finish', () => {
      console.log('QR code generated successfully.');
    });

    output.on('error', (error) => {
      console.error('Error writing QR code:', error);
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.error('Prompt couldn\'t be rendered in the current environment');
    } else {
      console.error('Something else went wrong:', error);
    }
  });
