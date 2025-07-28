require "test_helper"

class UsersControllerTest < ActionDispatch::IntegrationTest
  test "should get mypage" do
    get mypage_url
    assert_response :success
  end
end
