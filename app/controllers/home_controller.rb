# app/controllers/home_controller.rb
class HomeController < ApplicationController
  # ユーザーがログインしていないとTOPページにアクセスできないようにする場合
  # before_action :authenticate_user! # この行をコメントアウト

  def top
    # 実際の商品データを取得してトップページに表示
    @products = Product.includes(:user, images_attachments: :blob)
                      .order(created_at: :desc)
                      .limit(12)
  end
end
