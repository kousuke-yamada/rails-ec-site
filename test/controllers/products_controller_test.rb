require "test_helper"

class ProductsControllerTest < ActionDispatch::IntegrationTest
  test "should get listing" do
    get listing_products_path
    assert_response :success
  end

  test "should get new" do
    get new_product_path
    assert_response :success
  end

  test "should get index" do
    get products_path
    assert_response :success
  end

  test "should get show" do
    # テスト用のProductを作成
    product = Product.create!(
      name: "Test Product",
      price: 1000,
      condition_id: 1,
      shipping_fee_payer_id: 1,
      prefecture_id: 1,
      shipping_day_id: 1,
      category_id: 1,
      user_id: users(:one).id  # fixtureのユーザーを使用
    )
    get product_path(product)
    assert_response :success
  end

  test "should get edit" do
    # テスト用のProductを作成
    product = Product.create!(
      name: "Test Product",
      price: 1000,
      condition_id: 1,
      shipping_fee_payer_id: 1,
      prefecture_id: 1,
      shipping_day_id: 1,
      category_id: 1,
      user_id: users(:one).id  # fixtureのユーザーを使用
    )
    get edit_product_path(product)
    assert_response :success
  end

  test "should create product" do
    assert_difference('Product.count') do
      post products_path, params: { 
        product: { 
          name: "New Product",
          price: 1500,
          condition_id: 1,
          shipping_fee_payer_id: 1,
          prefecture_id: 1,
          shipping_day_id: 1,
          category_id: 1,
          user_id: users(:one).id
        } 
      }
    end
    assert_redirected_to product_path(Product.last)
  end

  test "should update product" do
    product = Product.create!(
      name: "Test Product",
      price: 1000,
      condition_id: 1,
      shipping_fee_payer_id: 1,
      prefecture_id: 1,
      shipping_day_id: 1,
      category_id: 1,
      user_id: users(:one).id
    )
    patch product_path(product), params: { 
      product: { 
        name: "Updated Product",
        price: 2000
      } 
    }
    assert_redirected_to product_path(product)
  end

  test "should destroy product" do
    product = Product.create!(
      name: "Test Product",
      price: 1000,
      condition_id: 1,
      shipping_fee_payer_id: 1,
      prefecture_id: 1,
      shipping_day_id: 1,
      category_id: 1,
      user_id: users(:one).id
    )
    assert_difference('Product.count', -1) do
      delete product_path(product)
    end
    assert_redirected_to products_path
  end
end