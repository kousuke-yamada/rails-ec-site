require "test_helper"

class LoginsControllerTest < ActionDispatch::IntegrationTest
    fixtures :users
  test "should get new" do
    user = users(:one)
    get new_user_session_url
    assert_response :success
  end
end
