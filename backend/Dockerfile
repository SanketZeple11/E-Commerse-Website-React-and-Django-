FROM python:3.10

RUN mkdir /app

WORKDIR /app

COPY requirements.txt .

RUN pip3 install --upgrade pip

COPY . .

RUN python manage.py makemigrations
RUN python manage.py migrate

CMD python manage.py runserver

