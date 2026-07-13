# convert-image-to-webp

[![npm version](https://img.shields.io/npm/v/convert-image-to-webp.svg)](https://www.npmjs.com/package/convert-image-to-webp)
[![license](https://img.shields.io/npm/l/convert-image-to-webp.svg)](./LICENSE)

Effortlessly convert your images to **WebP** for optimized performance and reduced file sizes — folder-level or file-level, with a minimal async API.

## 📦 Installation

```bash
npm install convert-image-to-webp
```

## 🚀 Features

- Converts `.jpg`, `.png`, `.jpeg` files to WebP
- Optimizes image quality for the web (WebP quality `75` by default)
- Folder-level and file-level conversion
- Warns about oversized images (width > 5000px)
- Minimal, promise-based API

## 🛠️ Usage

### Convert a folder of images

Converted files are written to a `webp/` subfolder next to each source image.

```ts
import { optimizeFolder } from "convert-image-to-webp";

async function main() {
  try {
    await optimizeFolder("./images", "webp");
    console.log("Images converted to WebP successfully!");
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

main();
```

### Convert specific files

```ts
import { optimizeImages } from "convert-image-to-webp";

async function main() {
  try {
    const files = ["./images/image1.jpg", "./images/image2.png"];
    await optimizeImages(files, "webp");
    console.log("Specific images converted to WebP successfully!");
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

main();
```

## 📂 API Reference

### `optimizeFolder(folderPath: string, plugin: string): Promise<void>`

Recursively finds and converts all supported images in a folder.

| Parameter    | Type     | Description                                            |
| ------------ | -------- | ------------------------------------------------------ |
| `folderPath` | `string` | Path to the folder containing images.                  |
| `plugin`     | `string` | `"webp"` to convert to WebP, or `"sharp"` to optimize. |

Throws if `folderPath` does not exist.

### `optimizeImages(files: string[], plugin: string): Promise<void>`

Converts a specific list of image files.

| Parameter | Type       | Description                                            |
| --------- | ---------- | ------------------------------------------------------ |
| `files`   | `string[]` | Array of file paths to convert.                        |
| `plugin`  | `string`   | `"webp"` to convert to WebP, or `"sharp"` to optimize. |

## ⚙️ Configuration

Current defaults (not yet configurable):

| Setting           | Value                                                     |
| ----------------- | --------------------------------------------------------- |
| Supported formats | `.jpg`, `.png`, `.jpeg`                                   |
| WebP quality      | `75`                                                      |
| Max width         | Images wider than `5000px` trigger a warning (no resize). |

## ⚠️ Notes

- Unsupported file formats are skipped with a console message.
- Warnings are printed for images exceeding the maximum width; they are **not** resized.

## 👨‍💻 Development

```bash
# Clone
git clone https://github.com/Lee-Dongwook/convert-image-to-webp.git
cd convert-image-to-webp

# Install
npm install

# Build
npm run build
```

Contributions are welcome — feel free to open an [issue](https://github.com/Lee-Dongwook/convert-image-to-webp/issues) or a pull request.

## 📄 License

Licensed under the [MIT License](./LICENSE).
