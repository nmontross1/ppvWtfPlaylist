import fs from "fs";
import path from "path";

export default class FileService {
  saveM3uToProjectFolder(m3uContent, filename = "playlist.m3u8") {
    const dir = path.resolve(process.cwd(), "m3u8File");

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const filePath = path.join(dir, filename);
    fs.writeFileSync(filePath, m3uContent, "utf8");
  }
}
