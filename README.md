# 実装で学ぶfullstack Web開発の学習用リポジトリ
書籍リンク：https://www.shoeisha.co.jp/book/detail/9784798179834

## 開発環境
- docker
- MySQL Workbench
- Next.js(yarn)

## 起動
### sql練習用環境の起動
1. docker Desktopを起動
2. 以下のコマンドを入力
```
cd dev
docker-compose up
```

### フロントエンド
#### 環境構築
```
Dev Container: Open Folder in Container
(node.js & typescript)
yarn create next-app frontend --ts --eslint
mv frontend/* .
mv frontend/.* .
rmdir frontend/
yarn add @mui/material @emotion/react @emotion/styled
yarn add @mui/x-data-grid
yarn add axios
yarn add swr
```

#### 起動
```
yarn dev
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