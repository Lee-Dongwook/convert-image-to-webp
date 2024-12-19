# convert-image-to-webp

****
Effortlessly convert your images to WebP format for optimized performance and reduced file sizes.

📦 Installation

Install the library via npm:

npm install convert-image-to-webp

🚀 Features

Converts .jpg, .png, .jpeg files to WebP format.

Optimizes image quality for web performance.

Supports folder-level and file-level conversion.

Easy-to-use API with minimal setup.

🛠️ Usage

Example: Convert a Folder of Images to WebP

```
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

Example: Convert Specific Files

```
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

📂 API Reference

optimizeFolder(folderPath: string, plugin: string): Promise<void>

Optimizes and converts all supported images in a folder to WebP format.

folderPath: Path to the folder containing images.

plugin: Use "webp" to convert images to WebP.

optimizeImages(files: string[], plugin: string): Promise<void>

Optimizes and converts specific image files to WebP format.

files: Array of file paths to convert.

plugin: Use "webp" to convert images to WebP.

⚙️ Configuration

This library uses the following defaults:

Supported formats: .jpg, .png, .jpeg

Output quality: WebP quality set to 75.

Max Width: Images larger than 5000px will trigger a warning but will not be resized.

⚠️ Notes

Images with unsupported formats will be skipped.

Warnings will be displayed for images exceeding the maximum width.

👨‍💻 Development

To contribute or set up the project locally:

Clone the repository:

git clone <https://github.com/yourusername/convert-image-to-webp.git>

Install dependencies:

npm install

Build the project:

npm run build

📄 License

This project is licensed under the MIT License.

Made with ❤️ by Lee-DongWook
