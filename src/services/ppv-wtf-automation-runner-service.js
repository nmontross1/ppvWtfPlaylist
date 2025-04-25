export default class PpvWtfAutomationRunnerService {
  constructor(apiService, jsonToM3uService, fileService, githubService) {
    this.apiService = apiService;
    this.jsonToM3uService = jsonToM3uService;
    this.fileService = fileService;
    this.githubService = githubService;
  }

  async run() {
    const ppvWtfJsonFile = await this.apiService.getStreams();
    const stream = await this.apiService.getStreamById(ppvWtfJsonFile[0]);
    console.log(stream);
    const m3uFile = this.jsonToM3uService.convert(ppvWtfJsonFile);
    console.log(m3uFile);
    const m3uFilePath = this.fileService.saveM3uToProjectFolder(m3uFile);
    const githubReponse =
      await this.githubService.commitAndPushToGithub(m3uFilePath);
    return githubReponse;
  }
}
