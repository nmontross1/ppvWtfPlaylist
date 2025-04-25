export default class ApiService {
  constructor(httpClient, baseURL) {
    this.httpClient = httpClient;
    this.baseURL = baseURL;
  }

  async executeApiRequest(endpoint, config = {}) {
    const response = await this.httpClient.get(
      `${this.baseURL}${endpoint}`,
      config,
    );
    return response.data;
  }

  async getStreams() {
    return await this.executeApiRequest("/streams");
  }

  async getStreamById(id) {
    return await this.executeApiRequest(`/streams/${id}`);
  }
}
