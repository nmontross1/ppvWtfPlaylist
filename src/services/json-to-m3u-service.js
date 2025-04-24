export default class JsonToM3uService {
  convert(json) {
    if (!json?.streams) return "";

    let m3u = "#EXTM3U\n";

    json.streams.forEach((category) => {
      category.streams.forEach((stream) => {
        const { name, tag, poster, iframe, category_name } = stream;
        m3u += `#EXTINF:-1 tvg-id="${tag}" tvg-name="${name}" tvg-logo="${poster}" group-title="${category_name}",${name}\n`;
        m3u += `${iframe}\n`;
      });
    });

    return m3u;
  }
}
