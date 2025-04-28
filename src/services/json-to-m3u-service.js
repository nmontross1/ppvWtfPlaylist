export default class JsonToM3uService {
  async convert(jsonData) {
    const headerString = '|Referer=https://ppv.wtf/&User-Agent=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F123.0.0.0%20Safari%2F537.36';
    const lines = ['#EXTM3U'];
  
    for (const item of jsonData) {
      if (item.streams && item.streams.length > 0) {
        const streamDetail = item.streams[0];
        const m3u8Url = streamDetail.stream_url + headerString;
        const extinf = `#EXTINF:-1 tvg-id="${item.league}" tvg-name="${item.name}" tvg-logo="${item.icon}" group-title="${item.league}",${item.name}`;
        lines.push(extinf);
        lines.push(m3u8Url);
      }
    }
  
    return lines.join('\n');
  }
  
}
