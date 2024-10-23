import { AxeRequest, AxeResponse, IoCService, RedisAdaptor } from "axe-api";
import { captureError } from "../Services/ErrorService";
import svg2img from "svg2img";

// Function to generate random alphanumeric characters (A-Z, 0-9)
const getRandomCharacter = () => {
  const characters = "ABCDEFGHJKLMNOPQRSTUVWXYZ0123456789";
  return characters.charAt(Math.floor(Math.random() * characters.length));
};

// Function to generate random color in hexadecimal format
const getRandomColor = () => {
  const letters = "01234567";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 8)];
  }
  return color;
};

const toPNG = async (svgContent: any): Promise<Buffer> => {
  return new Promise((resolve) => {
    svg2img(svgContent, function (error: any, buffer: any) {
      resolve(buffer);
    });
  });
};

// Function to generate random integer within a range
const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export default async (req: AxeRequest, res: AxeResponse) => {
  try {
    const redis = await IoCService.use<RedisAdaptor>("Redis");

    const width = 300;
    const height = 80;

    // Generate 6 random characters
    const characters = Array.from({ length: 8 }, () => getRandomCharacter());
    const code = characters.join("");

    // Keep it only ten minute
    redis.set(`LastCaptchaCode:${req.original.agentId}`, code, 60 * 10);

    // Generate 4 random lines
    const lines = Array.from({ length: 8 }, () => {
      return {
        x1: getRandomInt(0, width),
        y1: getRandomInt(0, height),
        x2: getRandomInt(0, width),
        y2: getRandomInt(0, height),
        color: getRandomColor(),
        strokeWidth: getRandomInt(1, 6),
      };
    });

    // Start building the SVG content
    let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">`;

    // Add lines to SVG
    lines.forEach((line) => {
      svgContent += `<line x1="${line.x1}" y1="${line.y1}" x2="${line.x2}" y2="${line.y2}" stroke="${line.color}" stroke-width="${line.strokeWidth}" />`;
    });

    // Add characters to SVG
    characters.forEach((char, index) => {
      const x = 20 + index * 30; // Position the characters with some spacing
      const y = getRandomInt(40, 80); // Randomize the vertical position of characters
      const fontSize = getRandomInt(30, 40); // Randomize font size
      const color = getRandomColor(); // Randomize color for each character
      const rotation = getRandomInt(0, 30); // Random rotation between 0-90 degrees

      // Apply rotation and random position to the text
      svgContent += `<text x="${x}" y="${y}" font-size="${fontSize}" fill="${color}" font-family="Arial" transform="rotate(${rotation}, ${x}, ${y})">${char}</text>`;
    });

    svgContent += "</svg>";

    const buffer: Buffer = await toPNG(svgContent);
    const base64Image = buffer.toString("base64");
    const imgBuffer = Buffer.from(base64Image, "base64");

    res.original.setHeader("Content-Type", "image/png");
    res.original.setHeader("x-code", code);
    res.original.end(imgBuffer);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
    captureError(error);
  }
};
