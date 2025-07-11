class HomeController < ApplicationController
  def index
    # 表示する商品数を制限（例：8件）
    @products = Product.limit(24).order(:created_at)
    
    # または特定の条件で絞り込む場合
    # @featured_products = Product.where(featured: true).limit(8)
    # @products = Product.where(status: 'active').limit(8)
  end
end
