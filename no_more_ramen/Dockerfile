FROM python:3.9.7
ENV PYTHONUNBUFFERED 1

RUN mkdir /code
WORKDIR /code

RUN pip3 install --upgrade pip3RUN apt-get -y update

COPY requirements.txt /code/
RUN pip3 install --upgrade pip3
RUN pip3 install -r requirements.txt

COPY . /code/

EXPOSE 8000