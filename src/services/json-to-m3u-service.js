export default class JsonToM3uService {
  async convert(jsonData) {
    const referer = 'https://ppv.wtf/';
    const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36';
    const lines = ['#EXTM3U'];

    for (const item of jsonData) {
      if (item.m3u8) {
        const extinf = `#EXTINF:-1 tvg-id="${item.tag}" tvg-name="${item.name}" tvg-logo="${item.poster}" group-title="${item.category_name}",${item.name}`;
        lines.push(extinf);
        lines.push(`#EXTVLCOPT:http-referrer=${referer}`);
        lines.push(`#EXTVLCOPT:http-user-agent=${userAgent}`);
        lines.push(item.m3u8);
      }
    }

    return lines.join('\n');
  }
}

