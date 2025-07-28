require "test_helper"

class HomeControllerTest < ActionDispatch::IntegrationTest
 include Devise::Test::IntegrationHelpers  # 追加

  setup do
    @user = users(:one) # fixtures などで定義済のユーザーを利用
    sign_in @user       #  Deviseでログイン
  end

  test "should get top" do
    get root_url
    assert_response :success
  end
end
