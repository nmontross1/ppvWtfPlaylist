export default class GithubService {
  constructor({ fs, path, exec }) {
    this.fs = fs;
    this.path = path;
    this.exec = exec;
  }

  commitAndPushToGithub(filePath) {
    return new Promise((resolve, reject) => {
      this.exec("git status --porcelain", (statusErr, stdout) => {
        if (statusErr) return reject(`Git status failed: ${statusErr.message}`);
        if (!stdout.trim()) {
          console.log("ℹ️ No changes to commit.");
          return resolve(); // nothing to do
        }

        this.exec("git add .", (addErr) => {
          if (addErr) return reject(`Git add failed: ${addErr.message}`);

          this.exec('git commit -m "Update M3U file"', (commitErr) => {
            if (commitErr) return reject(`Git commit failed: ${commitErr.message}`);

            this.exec("git push origin main", (pushErr) => {
              if (pushErr) return reject(`Git push failed: ${pushErr.message}`);
              console.log("✅ M3U file pushed to GitHub");
              resolve();
            });
          });
        });
      });
    });
  }
}
