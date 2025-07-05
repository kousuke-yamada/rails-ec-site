class ProductsController < ApplicationController
  before_action :set_product, only: [ :show, :edit, :update, :destroy, :purchase ]

  def index
    @products = Product.all.order(created_at: :desc)
  end

  def listing
    @product = Product.new
  end

  def my_products
    # 実際のアプリでは current_user.products を使用
    @products = Product.all.order(created_at: :desc)
    # @products = current_user.products.order(created_at: :desc) if user_signed_in?
  end

  def purchase
    # @product = Product.find(params[:id])
  end

  def new
    @product = Product.new
  end

  def create
    @product = Product.new(product_params)

    if @product.save
      redirect_to @product, notice: "商品が正常に出品されました。"
    else
      render :listing, status: :unprocessable_entity
    end
  end

  def show
    # 関連商品を取得（同じカテゴリーの他の商品）
    @related_products = Product.where(category_id: @product.category_id)
                              .where.not(id: @product.id)
                              .limit(4)
                              .order(created_at: :desc)
  end

  def edit
  end

  def update
    if @product.update(product_params)
      redirect_to @product, notice: "商品情報が更新されました。"
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @product.destroy
    redirect_to my_products_products_path, notice: "商品を削除しました。"
  end

  private

  def set_product
    @product = Product.find(params[:id])
  end

  def product_params
    params.require(:product).permit(:name, :description, :price, :condition_id,
                                     :shipping_fee_payer_id, :prefecture_id,
                                     :shipping_day_id, :category_id, :user_id,
                                     images: [])
  end
end
