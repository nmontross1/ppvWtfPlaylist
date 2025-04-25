export default class FileService {
  constructor(fs, path) {
    this.fs = fs;
    this.path = path;
  }

  /**
   * Saves M3U content to the M3U File folder.
   * @param {string} content - M3U playlist content.
   * @param {string} filename - The file name (e.g., 'playlist.m3u8').
   * @returns {string} Full path to the saved file.
   */
  saveM3uToProjectFolder(content, filename = "playlist.m3u8") {
    const dir = this.path.resolve(
      `/Users/montrossmac/ppv-wtf-automation/m3uFile`,
    );
    const filePath = this.path.join(dir, filename);

    if (!this.fs.existsSync(dir)) {
      this.fs.mkdirSync(dir, { recursive: true });
    }

    this.fs.writeFileSync(filePath, content, "utf-8");

    console.log(`✅ M3U file saved to: ${filePath}`);
    return filePath;
  }
}
