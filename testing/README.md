# Testing Platform

## Playwright

### Languages supported

- NodeJS (JS/TS)
- Python
- Java
- C#

### Browsers supported

- Chromium
- WebKit(Safari)
- Firefox (headed / headless)

### OS supported

- Windows
- MacOS
- Linux
- Support CI Runs

### Features

- Free & open source
- Multi browser / Language / OS
- Easy setup / configuration
- functional, api accessibility testing
- Built-in reporters, custom reports
- CI, CD, Docker
- Parallel testing
- Auto wait
- Built-in assertions
- Multi tab / window
- Frames, shadow dom
- Test parameter
- Emulate mobile devices
- Fast

### install

- install vscode extension
  - Playwright Test for VSCode
- (vscode) ctrl+shift+p
  - type `install playwright`
  - confirm browser installed

- setup playwright project  

```bash
# init project
> npm init playwright@latest -- --quiet --browser-chromium --browser=firefox --browser=webkit

# install browser
> npx playwright install

# check version 
> npm playwright -v

```

### simulation / record

- codegen

```bash
> npx playwright codegen
```

## Ref

- [playwright](https://playwright.dev/)
- [ortoniKC/playwright-ts-lambdatest](https://github.com/ortoniKC/playwright-ts-lambdatest)
- [Complete Playwright Testing Tutorial | An End to End Playwright with TypeScript Course](https://www.youtube.com/watch?v=wawbt1cATsk)
- [Playwright Introduction](https://www.youtube.com/playlist?list=PLUDwpEzHYYLsw33jpra65LIvX1nKWpp7-)