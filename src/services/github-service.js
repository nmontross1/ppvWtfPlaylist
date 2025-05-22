export default class GithubService {
  constructor({ fs, path, exec }) {
    this.fs = fs;
    this.path = path;
    this.exec = exec;
  }

  commitChanges(filePath = ".") {
    return new Promise((resolve, reject) => {
      this.exec("git status --porcelain", (statusErr, stdout) => {
        if (statusErr) return reject(`Git status failed: ${statusErr.message}`);
        if (!stdout.trim()) {
          console.log("ℹ️ No changes to commit.");
          return resolve(); // nothing to do
        }

        this.exec(`git add ${filePath}`, (addErr) => {
          if (addErr) return reject(`Git add failed: ${addErr.message}`);

          this.exec('git commit -m "🤖 Update playlist [skip ci]"', (commitErr) => {
            if (commitErr) return reject(`Git commit failed: ${commitErr.message}`);
            console.log("✅ Changes committed. Push will be handled by GitHub Actions.");
            resolve();
          });
        });
      });
    });
  }
}
