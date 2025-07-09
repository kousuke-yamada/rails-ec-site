# 概要

Rails での EC サイト構築
iiii

---

# 環境構築

1. まずは docker の導入

https://github.com/shotaimai66/readme-develop/blob/main/Docker%E3%81%AE%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB.md

2. docker の導入ができたら、以下のコマンドを打ち込んでいく。(アプリのディレクトリ内に cd コマンドで移動してから)

```
# イメージのビルド
docker-compose build

# bundle intall
docker-compose run --rm app bundle install

# db:setup（DB作成・構築・初期データ投入が一括で済む）
docker-compose run --rm app bin/rails db:setup

# railsサーバー起動
docker-compose up
```

---

# 開発コマンド

```
# コンテナ起動
docker-compose up

# コンテナ起動(バックグラウンド起動):byebugを使うときに実行
docker-compose up -d

# コンテナのlogを出力(byebugの操作を行う)
docker attach ho_ren_so_app

# コンテナ停止
docker-compose down

# 挙動がおかしくなった時、一度docker-composeコマンドで作成したリソースを削除するコマンド
docker-compose down --rmi all --volumes --remove-orphans

# bundle install
docker-compose run --rm app bundle install

# rails db:create
docker-compose run --rm app bin/rails db:create

# rails db:migrate
docker-compose run --rm app bin/rails db:migrate

# rails db:seed
docker-compose run --rm app bin/rails db:seed

# rails db:seed_fu
docker-compose run --rm app bin/rails db:seed_fu

# その他のrails系コマンド（rails generate や rails routes など）にも共通する点
docker-compose run --rm app bin/*****
↑このDockerコマンドをrails系コマンドの「前」に加えて実行して下さい。↑

```
# 構文チェックコマンド
```
# rubocop実行（全実行）全ての.rbファイルが対象
docker-compose run --rm app bundle exec rubocop

# rubocop実行（個別実行）例：app/models/user.rbのみチェックしたい場合
docker-compose run --rm app bundle exec rubocop app/models/user.rb

# rubocop（自動整形）
docker-compose run --rm app bundle exec rubocop -a

```

