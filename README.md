# 実装で学ぶfullstack Web開発の学習用リポジトリ
書籍リンク：https://www.shoeisha.co.jp/book/detail/9784798179834

## 開発環境
- docker
- MySQL Workbench
- Next.js(yarn, typescript)
- Django(python)

## 起動
### sql練習用環境の起動
1. docker Desktopを起動
2. 以下のコマンドを入力
```
$ cd dev
$ docker-compose up
```

### フロントエンド
#### 環境構築
```
Dev Container: Open Folder in Container
(node.js & typescript)
$ yarn create next-app frontend --ts --eslint
$ mv frontend/* .
$ mv frontend/.* .
$ rmdir frontend/
$ yarn add @mui/material @emotion/react @emotion/styled
$ yarn add @mui/x-data-grid
$ yarn add axios
$ yarn add swr
```

### バックエンド
#### 環境構築
```
Dev Container: Open Folder in Container
(python3)
$ echo -e 'djangorestframework\nmysqlclient' > requirements.txt
$ pip3 install -r requirements.txt
$ pip3 freeze > requirements.lock

----- devcontainer.json ----------------------------------
add "postCreateCommand": "pip3 install -r requirements.lock"
----------------------------------------------------------

Dev Container: Container Rebuild

$ django-admin startproject config . 
$ echo '__pycache__/' > .gitignore
$ mkdir config/settings
$ mv config/settings.py config/settings/base.py
$ echo 'from .base import *' > config/settings/development.py
```

#### 起動
```
$ yarn dev
```

## ディレクトリ構成
```
study_fullstack_dev
  |
  | - dev # DB
  |    |
  |    | - docker-compose.yml
  | 
  | - sakila-db # sqlの公式DBの1つ
  |
  | - src
       |
       | - dev
            |
            | - app
                 |
                 | - backend
                 | - frontend
```