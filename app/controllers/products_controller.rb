class ProductsController < ApplicationController
  def listing
  end
  
  def purchase
    # @product = Product.find(params[:id]) # 実際のデータを使う場合
  end

  def new
  end

  def create
  end

  def show
  end

  def edit
  end

  def update
  end

  def destroy
  end

  def index
    # 商品一覧ページ
    @products = [] # 実際のデータがある場合は Product.all など
  end

end
