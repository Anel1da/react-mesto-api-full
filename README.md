# Проект «Mesto»

Интерактивная страница, позволяющая пользователям делиться фотографиями посещенных мест, удалять и ставить лайки карточкам.

### 🔧 Функционал:
- страница адаптивна под популярные разрешения экрана (от 320px до 1280px);
-  реализована авторизация, регистрация, редактирование профиля пользователя;
-  реализовано добавление и удаление карточек;
- реализован предпросмотр изображения по клику на карточку;
- реализована валидация запросов;


### 🔧 Используемые технологии:

<img alt="JavaScript" src="https://img.shields.io/badge/javascript-%23323330.svg?&style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"/> <img alt="React" src="https://img.shields.io/badge/react-%2320232a.svg?&style=for-the-badge&logo=react&logoColor=%2361DAFB"/> <img alt="NodeJS" src="https://img.shields.io/badge/node.js-%2343853D.svg?&style=for-the-badge&logo=node.js&logoColor=white"/> <img alt="Express.js" src="https://img.shields.io/badge/express.js-%23404d59.svg?&style=for-the-badge"/> <img alt="MongoDB" src ="https://img.shields.io/badge/MongoDB-%234ea94b.svg?&style=for-the-badge&logo=mongodb&logoColor=white"/> <img alt="HTML5" src="https://img.shields.io/badge/html5-%23E34F26.svg?&style=for-the-badge&logo=html5&logoColor=white"/> <img alt="CSS3" src="https://img.shields.io/badge/css3-%231572B6.svg?&style=for-the-badge&logo=css3&logoColor=white"/>
<img alt="Visual Studio Code" src="https://img.shields.io/badge/VisualStudioCode-0078d7.svg?&style=for-the-badge&logo=visual-studio-code&logoColor=white"/> <img alt="Git" src="https://img.shields.io/badge/git-%23F05033.svg?&style=for-the-badge&logo=git&logoColor=white"/> <img alt="Postman" src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=red" /> <img alt="Figma" src="https://img.shields.io/badge/figma-%23F24E1E.svg?&style=for-the-badge&logo=figma&logoColor=white"/>
____

### 🔧 Запуск проекта:
Репозиторий включает фронтенд и бэкенд части приложения. </br>
Бэкенд расположите в директории backend/, а фронтенд - в frontend/.
- npm run start — запускает сервер
- npm run dev — запускает сервер с hot-reload
### 🔧 Методы API:
Репозиторий для  Бэкенд части приложения Movies Explorer. </br>
| Метод  | Путь  | Описание | Требует авторизации |
|--------|-------|-----------|---------------------|
|  POST  | `/signup`| Cоздаёт пользователя с переданными в теле email, password и name и about|  false |
|  POST  | `/signin`| Проверяет переданные в теле почту и пароль, возвращает JWT,  сохраняет его в Cookie  |  false |
|  POST  | `/signout`| Удаляет JWT из Cookie  |  false |
|   GET  | `/cards`| Возвращает карточки всех пользователей |  true  |
|   POST| `/cards`| Создает карточку с переданной в теле ссылкой на изображение и подписью|  true  |
|  DELETE | `/cards/cardId`| Удаляет созданные пользователем карточки по id |  true  |
|   PUT| `/cards/:cardId/likes`| Ставит лайк карточкам пользователей|  true  |
|  DELETE| `/cards/:cardId/likes`| Удаляет лайк|  true  |
|   GET  | `/users`| Возвращает всех зарегистрированных пользователей|  true  |
|   GET  | `/users/:userId`| Осуществляет поиск пользователя по id|  true  |
|   GET  | `/users/me`| Возвращает информацию о текущем пользователе |  true  |
|  PATCH | `/users/me`| Редактирует профиль пользователя (name, about) |  true  |
|  PATCH | `/users/me/avatar`| Редактирует аватар пользователя |  true  |

