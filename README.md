# Protein Data Ingestion and Visualiser
version: 1.1

by: Kevin Sullivan

## Project summary
This is a Django-React full stack web application that can take in CSV data and save it in a PostgreSQL database. Once information is stored in the database, the user will be able to view entries through the React UI in the browser.  

The "./front_end" directory holds the React source code. I used `npx create-react-app` to start the application, but have not included the "node modules" because it would bloat this zip file. I also used `npm run build` to build the user interface, which has been inserted into the Django application. 

Docker files can be found in "./container/app/", which is where the instructions below begin to build this project. 

## Instructions to Run (with Docker)
The project comes with **DockerFile** and **DockerCompose.yml**, with some others to support the environment, that will allow you to build and run a new container. If you clone the repository, you must also create an ".env.dev" file in the "django-react-protein/container/app" directory (with the Dockerfile) with the following environment variables:

```python
DEBUG=1
SECRET_KEY="CHOOSE_YOUR_OWN"
DJANGO_ALLOWED_HOSTS=localhost 127.0.0.1 [::1]
SQL_ENGINE=django.db.backends.postgresql
SQL_DATABASE=CHOOSE_YOUR_OWN
SQL_USER=CHOOSE_YOUR_OWN
SQL_PASSWORD=CHOOSE_YOUR_OWN
SQL_HOST=db
SQL_PORT=5432
```

> For the options to choose your own, you must ensure the database variable match the ones specified in the "docker-compose.yml" file. I've added some placeholders that fit the biology theme of the project, but it's strongly advised that you choose your own. 

Once the environment variables are set up:

 1. Open a terminal and navigate to the directory with the **DockerFile**. In this projects structure, it is "django-react-protein/container/app". 
 2. In the terminal, run the following command to build and launch the website. 
```
docker-compose up
```
 3. The terminal should tell you that the application has launched on http://0.0.0.0:8000/, but there are many 'unapplied migrations'. To run the migrations, press `ctrl+c` in the terminal to close the application. 
 4. Now, run the following command in the terminal to create the migrations
 ```
 docker-compose run web python manage.py makemigrations
 ```
 5. And then run the following command in the terminal to apply the migrations. 
```
docker-compose run web python manage.py migrate
```
 6. Once the migrations have been created and applied, start the application again with the following command...
```
docker-compose up
```
 7. When you are done with the application, press `ctrl+c` in the terminal to close it. The Docker container is setup with a volume to persist data within the database.
