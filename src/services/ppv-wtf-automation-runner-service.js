export default class PpvWtfAutomationRunnerService {
  constructor(apiService, jsonToM3uService, fileService, githubService) {
    this.apiService = apiService;
    this.jsonToM3uService = jsonToM3uService;
    this.fileService = fileService;
    this.githubService = githubService;
  }

  async run() {
    const json = await this.apiService.getStreams();
    const enrichedStreams = await this.fetchEnrichedStreams(
      json,
      this.apiService.getStreamById.bind(this.apiService)
    );

    const m3uFile = await this.jsonToM3uService.convert(enrichedStreams);
    console.log(m3uFile);
    const m3uFilePath = this.fileService.saveM3uToProjectFolder(m3uFile);

    const githubResponse = await this.githubService.commitAndPushToGithub(m3uFilePath);
    return githubResponse;
  }

  async fetchEnrichedStreams(json, getStreamById) {
    if (!json?.streams) return [];
  
    const enrichedStreams = [];
  
    for (const category of json.streams) {
      for (const stream of category.streams) {
        try {
          const detailed = await getStreamById(stream.id);
          if (detailed?.data?.m3u8) {
            let m3u8Url = detailed.data.m3u8;
  
            enrichedStreams.push({
              id: stream.id,
              name: stream.name,
              tag: stream.tag,
              poster: stream.poster,
              category_name: stream.category_name,
              m3u8: m3u8Url,
            });
          }
        } catch (error) {
          console.warn(`Failed to enrich stream ${stream.id}`, error);
        }
      }
    }
  
    return enrichedStreams;
  }
  
}
