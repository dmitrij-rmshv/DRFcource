from python:3.8.6

RUN apt-get update && apt-get install -y postgresql postgresql-contrib libpq-dev python3-dev

RUN pip3 install --upgrade pip

COPY ./todo/ ./
RUN pip3 install -r requirements.txt
RUN pip3 install gunicorn

COPY wait-for-postgres.sh .
RUN chmod +x wait-for-postgres.sh
