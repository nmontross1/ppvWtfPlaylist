export default class JsonToM3uService {
  async convert(jsonData) {
    const lines = ["#EXTM3U"];

    for (const item of jsonData) {
        const extinf = `\n#EXTINF:-1 tvg-id="${item.tag}" tvg-name="${item.name}" tvg-logo="${item.poster}" group-title="${item.category_name}",${item.name}`;
        lines.push(extinf);
        lines.push("#EXTVLCOPT:http-origin=https://ppvs.su");
        lines.push("#EXTVLCOPT:http-referrer=https://ppvs.su/");
        lines.push(
          "#EXTVLCOPT:http-user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:138.0) Gecko/20100101 Firefox/138.0",
        );
        lines.push(item?.m3u8);
    }

    return lines.join("\n");
  }
}
