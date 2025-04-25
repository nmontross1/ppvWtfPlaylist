import { formatInTimeZone } from "date-fns-tz";
// import cron from 'node-cron';
import axios from "axios";
import fs from "fs";
import path from "path";
import { exec } from "child_process";
import ApiService from "./src/services/api-service.js";
import JsonToM3uService from "./src/services/json-to-m3u-service.js";
import FileService from "./src/services/file-service.js";
import GithubService from "./src/services/github-service.js";
import PpvWtfAutomationRunnerService from "./src/services/ppv-wtf-automation-runner-service.js";

(async function runAutomation() {
  console.log(
    `PPV WTF Automation function execution started at: ${formatInTimeZone(new Date(), "America/New_York", "yyyy-MM-dd'T'HH:mm:ssxxx")}`,
  );

  try {
    const apiService = new ApiService(axios, "https://ppv.wtf/api");
    const jsonToM3uService = new JsonToM3uService();
    const fileService = new FileService(fs, path);
    const githubService = new GithubService({ fs, path, exec });
    const ppvWtfAutomationRunnerService = new PpvWtfAutomationRunnerService(
      apiService,
      jsonToM3uService,
      fileService,
      githubService,
    );

    await ppvWtfAutomationRunnerService.run();
  } catch (error) {
    console.error("❌ Error during automation:", error);
    throw error;
  } finally {
    console.log(
      `PPV WTF Automation function execution finished at: ${formatInTimeZone(new Date(), "America/New_York", "yyyy-MM-dd'T'HH:mm:ssxxx")}`,
    );
  }
})();