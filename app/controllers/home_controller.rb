# app/controllers/home_controller.rb
class HomeController < ApplicationController
  # ユーザーがログインしていないとTOPページにアクセスできないようにする場合
  before_action :authenticate_user! # 必要であればこの行を追加

  def top # ★ここを index から top に変更します★
    # 表示する商品数を制限（例：8件）
    

    # または特定の条件で絞り込む場合
    # @featured_products = Product.where(featured: true).limit(8)
    # @products = Product.where(status: 'active').limit(8)
  end
end