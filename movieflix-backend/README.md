<h1 align='center'>MovieFlix's Backend</h1>

<div align='center'>
  <a href='#-show-your-support'>Show your support</a> •
  <a href='#-how-to-run'>How To Run</a> •
  <a href='#-how-to-test'>How To Test</a> •
  <a href='#-contributing'>Contributing</a> •
  <a href='#-technologies-used'>Technologies Used</a> •
  <a href='#-license'>License</a>
</div>

<h4 align='center'>Made with ❤️ by Alvaro Israel 👏🏻 <a href='https://www.linkedin.com/in/alvaroisraeldesenvolvedor/'>
Get in Touch!</a></h4>

## ⭐️ Show your support

Hit the ⭐️ button if you like this project!

## 💻 How to Run

To clone and run this application, you'll need [Git](https://git-scm.com)
and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer.

From your command line:

```bash
# Clone this repository
$ git clone https://github.com/AlvaroIsrael/movieflix-app.git

# Go into the main app folder
$ cd movieflix-app

# Go into backend folder
$ cd movieflix-backend

# Install dependencies
$ yarn install

# Install the mongo database needed to run this program. See 'How To' below.

# Run the app
$ yarn start
```

This application will require mongo database in order to work properly:

- [MongoDb](https://www.mongodb.com/)

Frist you will need to install mongo database on your local machine and, after that, configure the databases using
both ```.env``` and ```ormconfig.json``` files which can be located in the ```src``` folder. The installation of that
database can be done in a variety of ways, but I personally believe the simplest one is to use docker. So I will
provide a brief guide on how to install then using docker and bitnami images.

Frist, download and install docker in your local machine:

- [Docker](https://www.docker.com/)

Once docker is up and running, you can them install each database service using the following comands:

- [MongoDb](https://github.com/bitnami/bitnami-docker-mongodb)

```bash
docker run -d --name mongodb -e MONGODB_DATABASE=myLegendaryDatabase -p 99999:55555 bitnami/mongodb:latest

# The flag '--name' represents the name of your container, so in this case '--name mongodb' will name the container 'mongodb'.
# myLegendaryDatabase - Can be any string without quotes representing the name of your database.
# The flah '-p' maps the container port 99999 to your local machine port number 55555.
# You can choose whenever value you want, but keep in mind the ports must be available and default mongodb port is 27017.

# After that you can simply run the container by typing:
docker start mongodb
```

Once that is done you will need to configure mongo database in the application by changing the following files:

- ```ormconfig.json.example``` which should be renamed to ```ormconfig.json```

After that the following fields must be changed according to the database you just installed and set up.

```json
[
  {
    "name": "mongo",
    "type": "mongodb",
    "host": "localhost",
    "port": 55555,
    "database": "anthorflix",
    "useUnifiedTopology": true,
    "entities": [
      "./src/modules/**/infra/typeorm/schemas/*.ts"
    ]
  }
]
```

- ```.env.example``` which should be renamed to ```.env```

## 🤝 Contributing

Fork this repository: https://github.com/AlvaroIsrael/movieflix-app/movieflix-backend/fork

```bash
# Create your feature branch:
$ git checkout -b feature/myAewsomeFeature

# Commit your changes:
$ git commit -m 'feat: Added some new aewsomeFeature'

# Push to the branch:
$ git push origin feature/myAewsomeFeature

# Create a new pull request
```

## 🎯 How to Test

```bash
# Open up terminal and run
$ yarn test
```

Code coverage html report can be found at:

```
./movieflix-backend/coverage/lcov-report/index.html
```

- Read more about commits in [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/).
- Read more about how to open a Pull Request from
  [GitHub official documentation](
  https://docs.github.com/en/github/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request
  ).

## 🏆 Technologies Used

- [Node](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [JestJs](https://jestjs.io/)

## 📝 License

This software is under MIT license. See [LICENSE](LICENSE.md) for more details.
