import imagemin from "imagemin";
import imageminWebp from "imagemin-webp";
import sharp from "sharp";
import { globby } from "globby";
import fs from "fs";
import path from "path";

const MAX_SIZE = 5000; // 최대 너비 제한
let warnedFiles: string[] = [];

const imageminSharp = ({
  chainSharp,
}: {
  chainSharp: (sharpInstance: sharp.Sharp) => Promise<sharp.Sharp>;
}) => {
  return async (input: Uint8Array) => {
    const sharpInstance = sharp(input);
    const modifiedSharpInstance = await chainSharp(sharpInstance);
    return await modifiedSharpInstance.toBuffer();
  };
};

/**
 * 특정 이미지 파일들을 최적화하거나 webp로 변환하는 함수
 * @param files 변환할 이미지 파일 경로 배열
 * @param plugin 사용할 플러그인 : 'sharp' | 'webp'
 */

export async function optimizeImages(files: string[], plugin: string) {
  const promises = files.map(async (filePath) => {
    const ext = path.extname(filePath).toLowerCase();
    if (![".jpg", ".png", ".jpeg"].includes(ext)) {
      console.log(`${filePath}은 지원하지 않는 파일 형식입니다.`);
      return;
    }

    const outputFolder =
      plugin === "webp"
        ? path.join(path.dirname(filePath), "webp")
        : path.dirname(filePath);

    fs.mkdirSync(outputFolder, { recursive: true });

    try {
      if (plugin === "sharp") {
        return await imagemin([filePath], {
          destination: outputFolder,
          plugins: [
            imageminSharp({
              chainSharp: async (sharpInstance) => {
                const metadata = await sharpInstance.metadata();
                if (metadata.width && metadata.width > MAX_SIZE) {
                  const fileName = path.basename(filePath);
                  if (!warnedFiles.includes(fileName)) {
                    warnedFiles.push(fileName);
                  }
                }
                return sharpInstance;
              },
            }),
          ],
        });
      } else if (plugin === "webp") {
        return await imagemin([filePath], {
          destination: outputFolder,
          plugins: [imageminWebp({ quality: 75 })],
        });
      }
    } catch (error) {
      console.error(`Error processing file: ${filePath}`, error);
    }
  });

  return Promise.all(promises);
}

/**
 * 특정 폴더 내의 이미지를 최적화하거나 WebP로 변환
 * @param folderPath 이미지 파일들이 위치한 폴더 경로
 * @param plugin 사용할 플러그인: 'sharp' 또는 'webp'
 */

export async function optimizeFolder(folderPath: string, plugin: string) {
  warnedFiles = [];

  if (!fs.existsSync(folderPath)) {
    throw new Error(`폴더가 존재하지 않습니다: ${folderPath}`);
  }

  const files = await globby(path.join(folderPath, "**/*.{jpg,png,jpeg}"));

  if (files.length === 0) {
    console.warn(`🚧 No supported image files found in '${folderPath}'.`);
    return;
  }

  await optimizeImages(files, plugin);

  if (warnedFiles.length > 0) {
    const fileListString = warnedFiles.join(", ");
    console.warn(
      `주의: 너비가 ${MAX_SIZE}px를 초과하는 이미지가 있습니다. (${fileListString})`
    );
  }
}
