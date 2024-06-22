module Api
  class DcDragonsController < ApplicationController
    def index
      # Return the dummy data
      dummy_data = [
        {
          id: 1,
          name: "Dragon 1",
          image: "/images/default_cupifriend.png",
          view_count: 100,
          unique_view_count: 50,
          clicks: 10,
          time_remaining: "3 days"
        },
        {
          id: 2,
          name: "Dragon 2",
          image: "/images/default_cupifriend.png",
          view_count: 200,
          unique_view_count: 100,
          clicks: 20,
          time_remaining: "2 days"
        }
      ]
      render json: dummy_data
    end
  end
end
