# GitHubEmbed Library

GitHubEmbed is a JavaScript library that allows you to easily embed GitHub repository information, including contributors and repository stats, into your web application.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Usage Example](#usage-example)
- [Examples](#examples)
- [Images](#images)
- [API Reference](#api-reference)
- [License](#license)

## Installation

You can include the library in your project using a CDN:

```html
<script src="https://cdn.jsdelivr.net/gh/akromicc/GithubEmbed@v1.0/GithubEmbed.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/akromicc/GithubEmbed@v1.0/GithubEmbed.css">
```

Alternatively, you can download the `GithubEmbed.js` and `GithubEmbed.css` files and include them in your project.

## Usage

To use the GitHubEmbed library, create an instance of the `GithubEmbed` class, passing the GitHub organization and repository name as arguments. Then, call the `render()` method to display the repository information.

```javascript
// Create an instance of the GitHubEmbed class
const githubEmbed = new GithubEmbed('organization', 'repository');

// Render the repository information
githubEmbed.render();
```

## Usage Example

Here is a full example demonstrating how to use the library in an HTML file:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GitHub Embed Example</title>
    <script src="https://cdn.jsdelivr.net/gh/akromicc/GithubEmbed@v1.0/GithubEmbed.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/akromicc/GithubEmbed@v1.0/GithubEmbed.css">
</head>
<body>
    <div id="github-container"></div>
    <script>
        // Create an instance of the GitHubEmbed class
        const githubEmbed = new GithubEmbed('facebook', 'react');
        
        // Render the repository information into the specified container
        githubEmbed.render(document.getElementById('github-container'));
    </script>
</body>
</html>
```

## Examples

### Example 1: Basic Usage

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GitHub Embed Example</title>
    <script src="https://cdn.jsdelivr.net/gh/akromicc/GithubEmbed@v1.0/GithubEmbed.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/akromicc/GithubEmbed@v1.0/GithubEmbed.css">
</head>
<body>
    <script>
        const githubEmbed = new GithubEmbed('facebook', 'react');
        githubEmbed.render();
    </script>
</body>
</html>
```

### Example 2: Customizing the Container

You can also customize where the GitHubEmbed component is rendered by specifying a container element:

```javascript
const container = document.getElementById('github-container');
const githubEmbed = new GithubEmbed('vuejs', 'vue');
githubEmbed.render(container);
```

```html
<div id="github-container"></div>
```

## Images

![GitHub Repository Card Example](https://github.com/akromicc/GithubEmbed/blob/main/example.png)

This image illustrates how the embedded GitHub repository card will appear, including the repository title, stats (stars, forks, issues), and contributor avatars.

## API Reference

### `constructor(user, repo)`

Creates a new instance of the `GithubEmbed` class.

- **Parameters**
  - `user` (string): The GitHub organization name.
  - `repo` (string): The GitHub repository name.

### `async fetchData()`

Fetches the repository and contributor data asynchronously.

### `async getRepo()`

Fetches data for the specified repository.

### `async getContributors()`

Fetches the contributors for the specified repository.

### `render()`

Renders the repository information in a newly created container element.

### `renderContributors(contributorsData, container)`

Renders the contributors' avatars.

## Sample Page

You can see a sample page using the GitHubEmbed library [here](https://akromicc.github.io/GithubEmbed).

## License

This project is licensed under the MIT License.
