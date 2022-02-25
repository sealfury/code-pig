## CodePig

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Contributing](#contributing)

### About <a name = "about"></a>

CodePig is a local CLI-driven coding notebook for javascript, inspired by Jupyter Notebooks and Codepen _et al_.  
Currently only `js` and `jsx` are supported; watch this space for additional languages.
Code is automatically compiled, previewed, and saved.

[Link to the NPM package](https://www.npmjs.com/package/codepig) or search 'codepig' at [NPM](https://www.npmjs.com/)

### Getting Started <a name = "getting_started"></a>

Simply run the command `npx codepig serve` in your terminal in a chosen project folder and follow the instructions given by the CLI

#### Command Line Options include:

- `-p` || `--port` + `<PORT_NUMBER>`: your chosen local port on which to serve the app
- `filename`: the name of your file. Defaults to `notes.js`
- Example: `npx codepig serve -p 3007 demo.js` creates and opens the file 'demo.js' at http://localhost:3007
- File will be autosaved into project folder and will be reopened by passing filename to command line flag
- To resume work on a notebook file simply enter the filename with the serve command e.g. `npx codepig serve demo.js` reopens the 'demo.js' file previously created
- Port selection has no impact on a saved file's availability

### Usage <a name = "usage"></a>

- Use the `show()` function to print code output in the preview window
- The app remembers your declared variables, functions, and imports across code cells
- Here is a screenshot demonstrating some of what the app can do:
  ![screenshot](Images/codepig_screenshot_1.png)

### Contributing <a name = "contributing"></a>

- Thank you for your interest in helping CodePig grow!
- If you want to help style the app or add support for more languages, simply clone the repo and make a pull request!
- _NB: As this project uses [lerna](https://github.com/lerna/lerna) to manage the monorepo structure, **please familiarise yourself with how it works before making any changes.** For example, installing packages directly with NPM will most likely result in breaking changes_
