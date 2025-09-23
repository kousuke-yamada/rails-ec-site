require "test_helper"

class ProductsControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  setup do
    @product = products(:three)
    @user = users(:one)
    sign_in @user
  end

  # test "should get listing" do
  # get listing_products_url
  # assert_response :success
  # end

  test "should get new" do
    get new_product_url
    assert_response :success
  end

  # test "should create product" do
  # assert_difference("Product.count") do
  # post products_url, params: { product: {
  # name: "Test Product",
  # price: 1000,
  # description: "Test description",
  # category: "electronics",
  # condition: "new",
  # shipping_fee_payer: "seller",
  # preparation_day: "1-2 days"
  # } }
  # end
  # assert_redirected_to product_url(Product.last)
  # end

  test "should get edit" do
    get edit_product_url(@product)
    assert_response :success
  end

  # test "should update product" do
  # patch product_url(@product), params: { product: {  # 修正
  # name: "Updated Name"
  # } }
  # assert_redirected_to product_url(@product)
  # end

  test "should destroy product" do
    assert_difference("Product.count", -1) do
      sign_in users(:one)
      delete product_url(@product)
    end
    assert_redirected_to my_products_products_url
  end
end
