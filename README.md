# Figma Remove Background Plugin

Enhance your design workflow in Figma by automatically removing image backgrounds with a single click, powered by Pixcleaner
This plugin leverages the advanced capabilities of Pixcleaner.com to provide quick and accurate background removal directly within your Figma projects.
<p align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg" alt="Figma Logo" width="64"/>
</p>

## Getting Started

### Installation
The Pixcleaner.com Plugin for Figma can be installed directly from the Figma Plugin Library. 
Access it here and add it to your Figma toolkit for an enhanced design experience.

### Usage
Once installed, using the Pixcleaner Plugin is straightforward:

1. Select the image layer you wish to process.
2. Navigate to Plugins -> Pixcleaner.
3. Choose either Run to remove the background or Set API Key if it's your first time using the plugin or if you need to update your API key.

### Development
Interested in contributing or customizing the plugin? Set up your development environment with these steps:

### Prerequisites

- Node.js installed on your machine.
- A Figma account and the Figma Desktop App.

Start by cloning the repository to your local machine:
```shell
git clone https://github.com/pixcleaner/remove-bg-figma-plugin.git
cd figma-remove-bg
```

Install dependencies & build files
```shell
npm install
npm run build
```
For development purposes, you can use the watch mode to automatically rebuild the plugin as you make changes:
```shell
npm run dev
```

### Load the Plugin in Figma
To test or develop the plugin within Figma:

Open the Figma Desktop App and navigate to a project.
1. Go to Plugins -> Development -> New Plugin.
2. Choose manifest.json from the cloned plugin directory when prompted.
3. You're all set! The plugin is now available under Plugins -> Development for testing and further development.

### Feedback and Contributions

We welcome contributions and feedback on how we can improve the Figma pixcleaner.com Plugin. 
Feel free to open an issue or submit a pull request on our GitHub repository.
