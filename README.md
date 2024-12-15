# 実装で学ぶfullstack Web開発の学習用リポジトリ
書籍リンク：https://www.shoeisha.co.jp/book/detail/9784798179834

## 開発環境
- docker
- MySQL Workbench

## 環境の起動
1. docker Desktopを起動
2. 以下のコマンドを入力
```
cd dev
docker-compose up
```

## ディレクトリ構成
```
study_fullstack_dev
  |
  | - dev # sql練習用
  |    |
  |    | - docker-compose.yml
  | 
  | - sakila-db # sqlの公式dbの1つ
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