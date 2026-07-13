"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.optimizeImages = optimizeImages;
exports.optimizeFolder = optimizeFolder;
const imagemin_1 = __importDefault(require("imagemin"));
const imagemin_webp_1 = __importDefault(require("imagemin-webp"));
const sharp_1 = __importDefault(require("sharp"));
const globby_1 = require("globby");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const MAX_SIZE = 5000; // 최대 너비 제한
let warnedFiles = [];
const imageminSharp = ({ chainSharp, }) => {
    return (input) => __awaiter(void 0, void 0, void 0, function* () {
        const sharpInstance = (0, sharp_1.default)(input);
        const modifiedSharpInstance = yield chainSharp(sharpInstance);
        return yield modifiedSharpInstance.toBuffer();
    });
};
/**
 * 특정 이미지 파일들을 최적화하거나 webp로 변환하는 함수
 * @param files 변환할 이미지 파일 경로 배열
 * @param plugin 사용할 플러그인 : 'sharp' | 'webp'
 */
function optimizeImages(files, plugin) {
    return __awaiter(this, void 0, void 0, function* () {
        const promises = files.map((filePath) => __awaiter(this, void 0, void 0, function* () {
            const ext = path_1.default.extname(filePath).toLowerCase();
            if (![".jpg", ".png", ".jpeg"].includes(ext)) {
                console.log(`${filePath}은 지원하지 않는 파일 형식입니다.`);
                return;
            }
            const outputFolder = plugin === "webp"
                ? path_1.default.join(path_1.default.dirname(filePath), "webp")
                : path_1.default.dirname(filePath);
            fs_1.default.mkdirSync(outputFolder, { recursive: true });
            try {
                if (plugin === "sharp") {
                    return yield (0, imagemin_1.default)([filePath], {
                        destination: outputFolder,
                        plugins: [
                            imageminSharp({
                                chainSharp: (sharpInstance) => __awaiter(this, void 0, void 0, function* () {
                                    const metadata = yield sharpInstance.metadata();
                                    if (metadata.width && metadata.width > MAX_SIZE) {
                                        const fileName = path_1.default.basename(filePath);
                                        if (!warnedFiles.includes(fileName)) {
                                            warnedFiles.push(fileName);
                                        }
                                    }
                                    return sharpInstance;
                                }),
                            }),
                        ],
                    });
                }
                else if (plugin === "webp") {
                    return yield (0, imagemin_1.default)([filePath], {
                        destination: outputFolder,
                        plugins: [(0, imagemin_webp_1.default)({ quality: 75 })],
                    });
                }
            }
            catch (error) {
                console.error(`Error processing file: ${filePath}`, error);
            }
        }));
        return Promise.all(promises);
    });
}
/**
 * 특정 폴더 내의 이미지를 최적화하거나 WebP로 변환
 * @param folderPath 이미지 파일들이 위치한 폴더 경로
 * @param plugin 사용할 플러그인: 'sharp' 또는 'webp'
 */
function optimizeFolder(folderPath, plugin) {
    return __awaiter(this, void 0, void 0, function* () {
        warnedFiles = [];
        if (!fs_1.default.existsSync(folderPath)) {
            throw new Error(`폴더가 존재하지 않습니다: ${folderPath}`);
        }
        const files = yield (0, globby_1.globby)(path_1.default.join(folderPath, "**/*.{jpg,png,jpeg}"));
        if (files.length === 0) {
            console.warn(`🚧 No supported image files found in '${folderPath}'.`);
            return;
        }
        yield optimizeImages(files, plugin);
        if (warnedFiles.length > 0) {
            const fileListString = warnedFiles.join(", ");
            console.warn(`주의: 너비가 ${MAX_SIZE}px를 초과하는 이미지가 있습니다. (${fileListString})`);
        }
    });
}
