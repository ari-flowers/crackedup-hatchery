require "test_helper"

class DragonVillageEggsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get dragon_village_eggs_index_url
    assert_response :success
  end

  test "should get create" do
    get dragon_village_eggs_create_url
    assert_response :success
  end
end
