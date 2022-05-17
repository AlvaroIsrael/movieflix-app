<h1 align='center'>MovieFlix's</h1>

<div align="center">

[![CodeQLCI](https://github.com/AlvaroIsrael/ignews-app/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/AlvaroIsrael/ignews-app/actions/workflows/codeql-analysis.yml)
[![GitHub license](https://img.shields.io/github/license/AlvaroIsrael/ignews-app)](https://img.shields.io/github/license/AlvaroIsrael/ignews-app)
[![GitHub repo size](https://img.shields.io/github/repo-size/AlvaroIsrael/ignews-app)](https://img.shields.io/github/repo-size/AlvaroIsrael/ignews-app)
[![GitHub stars](https://img.shields.io/github/stars/AlvaroIsrael/ignews-app)](https://img.shields.io/github/stars/AlvaroIsrael/ignews-app)
[![GitHub forks](https://img.shields.io/github/forks/AlvaroIsrael/ignews-app)](https://img.shields.io/github/forks/AlvaroIsrael/ignews-app)
[![GitHub issues](https://img.shields.io/github/issues/AlvaroIsrael/ignews-app)](https://img.shields.io/github/issues/AlvaroIsrael/ignews-app)
[![GitHub contributors](https://img.shields.io/github/contributors/AlvaroIsrael/ignews-app)](https://img.shields.io/github/contributors/AlvaroIsrael/ignews-app)
[![GitHub last commit](https://img.shields.io/github/last-commit/AlvaroIsrael/ignews-app)](https://img.shields.io/github/last-commit/AlvaroIsrael/ignews-app)

> 📽 A simple typescript crud like movie app!

<p>
  <a href="#-technologies-used">Technologies Used</a> •
  <a href="#-how-to-use">How To Use</a> •
  <a href="#-contributing">Contributing</a> •
  <a href="#-license">License</a>
</p>

<br/>

<p>Made with ❤️ by Alvaro Israel 👏🏻 <a href="https://www.linkedin.com/in/alvaroisraeldesenvolvedor/">Get in Touch!</a></p>
<p>Hit the ⭐️ button if you like this project!</p>

</div>

<br/>

## 🏆 Technologies Used

- [Node.js](https://nodejs.org/en/) and [NPM](http://npmjs.com)
- [React](https://github.com/facebook/react/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [Jest](https://jestjs.io/)

## 💻 How to Use

### **Install system dependencies**

- Install [Git](https://git-scm.com).
- Install [Node.js](https://nodejs.org/en/download/), v17.9.0 recommended.

### **Clone**

In your command line:

```bash
$ git clone https://github.com/AlvaroIsrael/movieflix-app.git
$ cd movieflix-app
```

### **Frontend**

```bash
# Go into project folder
$ cd movieflix-frontend

# Install dependencies
$ yarn install

# Run the app
$ yarn start
```

### **Backend**

See [How to Run](/movieflix-backend/README.md#-how-to-run) inside the `movieflix-backend` project folder for more details.

```bash
# Go into backend folder
$ cd movieflix-backend

# Install dependencies
$ yarn install

# Install the mongodb database needed to run this program. See 'How to Run' above for more details.

# Run the app
$ yarn dev:server
```

### **TMDB Api**

> This application has a integration process to retrieve movies information from [themoviedb api](https://developers.themoviedb.org/3/getting-started/introduction).
In order for you to run this app you are going to need to request an api token as developer. Without this token the app will be pretty much useless, as all tmdb requests will fail.
Once you have the token, you should set it in the appropriate env variable into .env file using the `REACT_APP_TMDB_API_KEY` variable in frontend src folder.

## 🤝 Contributing

Fork this repository - click [fork][].

```bash
# Create your feature branch:
$ git checkout -b feature/myAwesomeFeature

# Commit your changes:
$ git commit -m 'feat: Added some new awesomeFeature'

# Push to the branch:
$ git push -u origin feature/myAwesomeFeature
```

Then go to [Pull Requests][] and make a new one.

Resources:

- Read more about commits in [conventional commits][].
- Read more about how to open a Pull Request from [GitHub official documentation][].

[fork]: https://github.com/AlvaroIsrael/ignews-app/fork

[Pull Requests]: https://github.com/AlvaroIsrael/ignews-app/pulls

[conventional commits]: https://www.conventionalcommits.org/en/v1.0.0/

[GitHub official documentation]: https://docs.github.com/en/github/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request

## 📝 License

This software is under MIT license. See [LICENSE](LICENSE.md) for more details.