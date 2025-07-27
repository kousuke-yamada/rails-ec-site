# app/models/user.rb
class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  # nameカラムを必須にするバリデーションを追加
  validates :name, presence: true

  # phoneカラムはデータベースで null: true なので、presence: true は不要ですが、
  # もしアプリケーションで必須にしたい場合は以下の行を追加してください
  # validates :phone, presence: true
end
