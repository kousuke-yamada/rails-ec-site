FROM ruby:3.2.8-slim

# 必要なパッケージをインストール
RUN apt-get update -qq && apt-get install -y \
  curl \
  gnupg \
  build-essential \
  default-libmysqlclient-dev \
  libyaml-dev

# Node.js 18.x をインストール
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

# Yarnの公式APTリポジトリを追加
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN apt-get update -qq && apt-get install -y yarn

# 作業ディレクトリ作成
WORKDIR /app

# Yarn/Node/JSパッケージ
COPY package.json yarn.lock ./

# Gemfile をコピーして bundle install
COPY Gemfile Gemfile.lock ./
RUN bundle install

# 残りのアプリケーションをコピー
COPY . .

# ポート解放
EXPOSE 3000

# デフォルトコマンド
CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0"]
