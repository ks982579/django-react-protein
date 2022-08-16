# pull official base image
FROM python:3.9.13-alpine

# set work directory
WORKDIR /usr/src/app

# set environment variables
## prevent python writing pyc files to disc
ENV PYTHONDONTWRITEBYTECODE 1 
## prevent python from buffering stdout and stderr
ENV PYTHONUNBUFFERED 1

# install psycopg2 dependencies
RUN apk update && apk add postgresql-dev gcc python3-dev musl-dev

# install dependencies
RUN pip install --upgrade pip
COPY ./requirements.txt /usr/src/app
RUN pip install -r requirements.txt

# copy project
COPY . /usr/src/app 