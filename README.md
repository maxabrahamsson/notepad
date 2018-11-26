[![CircleCI](https://circleci.com/gh/ayildirim/notepad.svg?style=svg)](https://circleci.com/gh/ayildirim/notepad)

### Deployment

- Set MONGOLAB_URI environment variable with your Mongo DB credentials and path
- Run Deploy step described in the CircleCI configuration file on your server
- Initialize the API server using PM2: "pm2 start node -- ./server/index.js --watch"

### Development environment

- Visual Studio Code is the configured tool for the project
- Configuration of vscode settings & extensions are in the /.vscode/settings.json

### JS Dev Utilities and Code Hygiene

- Yarn for dependency management
- Eslint for code syntax
- Prettier for code formatting
- Flow for data type safety
- Husky precommit hooks for running tests locally prior to commits made locally
