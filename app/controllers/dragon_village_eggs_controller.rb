class DragonVillageEggsController < ApplicationController
  def index
    eggs = DragonVillageEgg.all
    render json: eggs
  end

  def create
    egg = DragonVillageEgg.new(egg_params)
    if egg.save
      render json: egg, status: :created
    else
      render json: egg.errors, status: :unprocessable_entity
    end
  end

  private

  def egg_params
    params.require(:dragon_village_egg).permit(:share_link, :image, :view_goal)
  end
end
