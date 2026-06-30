# GitHub Pages Commands Used

Date: 2026-06-30

## Local Preparation

```bash
mkdir -p 02_output/v17_20260619_github_pages_deployment/docs
cp 02_output/v17_20260619_static_web_deployment_package/tavr-calculator/index.html 02_output/v17_20260619_github_pages_deployment/docs/index.html
cp 02_output/v17_20260619_static_web_deployment_package/tavr-calculator/style.css 02_output/v17_20260619_github_pages_deployment/docs/style.css
cp 02_output/v17_20260619_static_web_deployment_package/tavr-calculator/app.js 02_output/v17_20260619_github_pages_deployment/docs/app.js
cp 02_output/v17_20260619_static_web_deployment_package/tavr-calculator/WebCalculator_logo.png 02_output/v17_20260619_github_pages_deployment/docs/WebCalculator_logo.png
cp 02_output/v17_20260619_static_web_deployment_package/tavr-calculator/KM_Device_Success_MACE_CN_web_no_risk_table.png 02_output/v17_20260619_github_pages_deployment/docs/KM_Device_Success_MACE_CN_web_no_risk_table.png
cp 02_output/v17_20260619_static_web_deployment_package/tavr-calculator/KM_Device_Success_MACE_EN_web_no_risk_table.png 02_output/v17_20260619_github_pages_deployment/docs/KM_Device_Success_MACE_EN_web_no_risk_table.png
touch 02_output/v17_20260619_github_pages_deployment/docs/.nojekyll
```

## Local Validation

```bash
node --check 02_output/v17_20260619_github_pages_deployment/docs/app.js
shasum -a 256 source-and-copied-js-css-files
cd 02_output/v17_20260619_github_pages_deployment/docs
python3 -m http.server 8090
```

Browser validation used Playwright CLI against:

```text
http://127.0.0.1:8090/?figure=1
```

## Git

```bash
cd 02_output/v17_20260619_github_pages_deployment
git init
git add .
git commit -m "Deploy TAVR CT Anatomy Score static calculator"
git branch -M main
git rev-parse HEAD
```

Resulting commit:

```text
34e8df99fb26e29919020348a7375e16c4fd2d7a
```

## GitHub Checks

```bash
gh --version
```

Result:

```text
gh: command not found
```

```bash
brew install gh
```

Result:

```text
Error: gh: no bottle available
```

GitHub plugin repository lookup:

```text
suoxinsuo/tavr-ct-anatomy-score-calculator -> 404 Not Found
```

Target Pages URL check:

```bash
curl -I --connect-timeout 20 https://suoxinsuo.github.io/tavr-ct-anatomy-score-calculator/
```

Result:

```text
curl: (35) OpenSSL SSL_connect: Connection reset by peer in connection to suoxinsuo.github.io:443
```

## Not Executed

Repository creation, push, and Pages enablement were not executed because no available tool in this session could create the missing repository and enable Pages.

