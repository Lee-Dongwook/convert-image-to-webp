/**
 * 특정 이미지 파일들을 최적화하거나 webp로 변환하는 함수
 * @param files 변환할 이미지 파일 경로 배열
 * @param plugin 사용할 플러그인 : 'sharp' | 'webp'
 */
export declare function optimizeImages(files: string[], plugin: string): Promise<(import("imagemin").Result[] | undefined)[]>;
/**
 * 특정 폴더 내의 이미지를 최적화하거나 WebP로 변환
 * @param folderPath 이미지 파일들이 위치한 폴더 경로
 * @param plugin 사용할 플러그인: 'sharp' 또는 'webp'
 */
export declare function optimizeFolder(folderPath: string, plugin: string): Promise<void>;
