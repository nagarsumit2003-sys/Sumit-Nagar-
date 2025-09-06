
import type { DimensionPreset } from './types';

export const SOCIAL_PRESETS: DimensionPreset[] = [
  { name: 'Instagram Post', width: 1080, height: 1080 },
  { name: 'Instagram Story', width: 1080, height: 1920 },
  { name: 'YouTube Thumbnail', width: 1280, height: 720 },
  { name: 'Facebook Post', width: 1200, height: 630 },
  { name: 'LinkedIn Post', width: 1200, height: 1200 },
];

export const DEVICE_PRESETS: DimensionPreset[] = [
  { name: 'Mobile', width: 390, height: 844 },
  { name: 'Tablet', width: 768, height: 1024 },
  { name: 'Laptop', width: 1366, height: 768 },
  { name: 'Desktop', width: 1920, height: 1080 },
];


export const DEFAULT_CODE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Preview</title>
  <style>
    /* Feel free to use any web fonts! */
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');

    body {
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: 'Poppins', sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      text-align: center;
      margin: 0;
      height: 100vh;
      box-sizing: border-box;
      overflow: hidden; /* Prevent scrollbars in preview */
    }

    .container {
      padding: 40px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(5px);
      -webkit-backdrop-filter: blur(5px);
      border: 1px solid rgba(255, 255, 255, 0.3);
    }

    h1 {
      font-size: 3rem;
      font-weight: 700;
      margin-bottom: 1rem;
    }

    p {
      font-size: 1.2rem;
      margin-bottom: 2rem;
    }

    button {
      background: #fff;
      color: #667eea;
      border: none;
      padding: 12px 24px;
      border-radius: 8px;
      font-weight: bold;
      cursor: pointer;
      transition: transform 0.2s;
    }

    button:hover {
      transform: scale(1.05);
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Hello, World!</h1>
    <p>This is a live preview of your code.</p>
    <button>Click Me</button>
  </div>
</body>
</html>
`;
