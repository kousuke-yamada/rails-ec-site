require "test_helper"

class UsersControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers  # この行を追加

  test "should get mypage" do
    sign_in users(:one)  # ログイン処理を追加
    get mypage_url
    assert_response :success
  end
end
