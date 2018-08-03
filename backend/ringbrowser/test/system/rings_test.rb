require "application_system_test_case"

class RingsTest < ApplicationSystemTestCase
  setup do
    @ring = rings(:one)
  end

  test "visiting the index" do
    visit rings_url
    assert_selector "h1", text: "Rings"
  end

  test "creating a Ring" do
    visit rings_url
    click_on "New Ring"

    fill_in "Description", with: @ring.description
    fill_in "Image Url", with: @ring.image_url
    fill_in "Model", with: @ring.model
    fill_in "Model Url", with: @ring.model_url
    fill_in "Name", with: @ring.name
    click_on "Create Ring"

    assert_text "Ring was successfully created"
    click_on "Back"
  end

  test "updating a Ring" do
    visit rings_url
    click_on "Edit", match: :first

    fill_in "Description", with: @ring.description
    fill_in "Image Url", with: @ring.image_url
    fill_in "Model", with: @ring.model
    fill_in "Model Url", with: @ring.model_url
    fill_in "Name", with: @ring.name
    click_on "Update Ring"

    assert_text "Ring was successfully updated"
    click_on "Back"
  end

  test "destroying a Ring" do
    visit rings_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Ring was successfully destroyed"
  end
end
