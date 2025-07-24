require "test_helper"

class LoginsControllerTest < ActionDispatch::IntegrationTest
    fixtures :users
  test "should get new" do
    user = users(:one)
    get logins_new_url
    assert_response :success
  end
end
