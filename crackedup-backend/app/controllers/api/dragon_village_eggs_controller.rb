module Api
  class DragonVillageEggsController < ApplicationController
    skip_before_action :verify_authenticity_token

    def index
      eggs = DragonVillageEgg.all
      render json: eggs
    end

    def create
      if valid_dragon_village_link?(egg_params[:share_link])
        egg = DragonVillageEgg.new(egg_params)
        if egg.save
          render json: egg, status: :created
        else
          render json: egg.errors, status: :unprocessable_entity
        end
      else
        render json: { error: 'Invalid Dragon Village link' }, status: :unprocessable_entity
      end
    rescue ActiveRecord::RecordNotUnique => e
      render json: { error: 'Duplicate entry. This share link already exists.' }, status: :unprocessable_entity
    end

    def destroy_by_link
      egg = DragonVillageEgg.find_by(share_link: params[:share_link])
      if egg
        egg.destroy
        head :no_content
      else
        render json: { error: 'Egg not found' }, status: :not_found
      end
    end  

    private

    def egg_params
      params.require(:dragon_village_egg).permit(:share_link, :view_goal, :image, :view_count, :submission_time)
    end

    def valid_dragon_village_link?(link)
      link =~ /^https:\/\/dragon\.dvc\.land\/view\/[a-zA-Z]+(\?id=[a-zA-Z0-9]+)?$/
    end
  end
end
