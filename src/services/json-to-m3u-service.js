export default class JsonToM3uService {
  async convert(jsonData) {
    const lines = ['#EXTM3U'];

    for (const item of jsonData) {
      if (item.m3u8) {
        const extinf = `#EXTINF:-1 tvg-id="${item.tag}" tvg-name="${item.name}" tvg-logo="${item.poster}" group-title="${item.category_name}",${item.name}`;
        lines.push(extinf);
        lines.push(item.m3u8);
      }
    }

    return lines.join('\n');
  }
}
