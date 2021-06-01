FROM python:3.9.5

RUN pip install \
    django \
    djangorestframework \
    djoser \
    django-cors-headers

WORKDIR /api

COPY . .

EXPOSE 8000
