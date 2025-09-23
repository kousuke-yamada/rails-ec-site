require "test_helper"

class UsersControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  test "should get mypage" do
    sign_in users(:one)
    get mypage_url
    assert_response :success
  end
end