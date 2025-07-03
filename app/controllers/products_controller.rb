class ProductsController < ApplicationController
  before_action :set_product, only: [ :show, :edit, :update, :destroy, :purchase ]

  def index
    @products = Product.all
  end

  def listing
    @product = Product.new
  end

  def my_products
    @products = Product.all
  end

  def purchase
    # @product = Product.find(params[:id]) # 実際のデータを使う場合
  end

  def new
    @product = Product.new
  end

  def create
  @product = Product.new(product_params)

  if @product.save
      redirect_to @product, notice: "Product was successfully created."
  # または
  # redirect_to product_path(@product), notice: 'Product was successfully created.'
  else
      render :new
  end
  end

  def show
  end

  def edit
  end

  def update
    if @product.update(product_params)
      redirect_to @product, notice: "Product was successfully updated."
    else
      render :edit
    end
  end

  def destroy
    @product.destroy
    redirect_to products_path, notice: "Product was successfully deleted."
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
