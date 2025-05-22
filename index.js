import { formatInTimeZone } from "date-fns-tz";
import axios from "axios";
import fs from "fs";
import path from "path";
import ApiService from "./src/services/api-service.js";
import JsonToM3uService from "./src/services/json-to-m3u-service.js";
import FileService from "./src/services/file-service.js";
import PpvWtfAutomationRunnerService from "./src/services/ppv-wtf-automation-runner-service.js";

async function runAutomation() {
  console.log(
    `PPV WTF Automation function execution started at: ${formatInTimeZone(new Date(), "America/New_York", "yyyy-MM-dd'T'HH:mm:ssxxx")}`,
  );

  try {
    const apiService = new ApiService(axios, "https://ppv.wtf/api");
    const jsonToM3uService = new JsonToM3uService();
    const fileService = new FileService(fs, path);
    const ppvWtfAutomationRunnerService = new PpvWtfAutomationRunnerService(
      apiService,
      jsonToM3uService,
      fileService
    );

    await ppvWtfAutomationRunnerService.run();
  } catch (error) {
    console.error("❌ Error during automation:", error);
    process.exit(1); // Ensures GitHub Actions registers this as a failure
  } finally {
    console.log(
      `PPV WTF Automation function execution finished at: ${formatInTimeZone(new Date(), "America/New_York", "yyyy-MM-dd'T'HH:mm:ssxxx")}`,
    );
  }
}

runAutomation();
