# notes

## link http://manblax.ru/

## Установить npm пакеты
```
npm install
```
## Сбилдить образы проекта
```
docker-compose build
```
## Создать таблицы в БД
```
docker-compose run --rm api python manage.py migrate
```
## Создать пользователя с правами администратора
```
docker-compose run --rm api python manage.py createsuperuser
```
## Запустить проект
```
docker-compose up
```

### Использованные технологии и библиотеки
#### Notes (Frontend)
CSS Framework - Bulma https://bulma.io/ минималистичный CSS Фреймворк

Marked https://marked.js.org/ markdown редактор

vue-cropperjs https://github.com/Agontuk/vue-cropperjs Редактор изображений. Есть необходимый функционал и хорошая документация

Vue Final Modal https://vue-final-modal.org/ Модальное окно. Основана на https://github.com/euvl/vue-js-modal

wretch https://github.com/elbywan/wretch fetch wrapper

#### API (Backend)

Django https://www.djangoproject.com/

Django REST framework https://www.django-rest-framework.org/

djoser https://djoser.readthedocs.io/

django-cors-headers https://github.com/adamchainz/django-cors-headers

