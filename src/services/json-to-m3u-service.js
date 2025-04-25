export default class JsonToM3uService {
  convert(enrichedStreams) {
    if (!Array.isArray(enrichedStreams) || enrichedStreams.length === 0) return "";

    let m3u = "#EXTM3U\n";

    enrichedStreams.forEach((stream) => {
      const { name, tag, poster, m3u8, category_name } = stream;
      m3u += `#EXTINF:-1 tvg-id="${tag}" tvg-name="${name}" tvg-logo="${poster}" group-title="${category_name}",${name}\n`;
      m3u += `${m3u8}\n`;
    });

    return m3u;
  }
}
