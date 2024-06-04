require 'dragon_village_scraper'

module Api
  class DragonVillageEggsController < ApplicationController
    skip_before_action :verify_authenticity_token

    def index
      eggs = DragonVillageEgg.all
      render json: eggs
    end

    def create
      Rails.logger.debug "Received create request with params: #{egg_params}"

      if valid_dragon_village_link?(egg_params[:share_link])
        Rails.logger.debug "Valid Dragon Village link: #{egg_params[:share_link]}"

        scraped_data = DragonVillageScraper.scrape(egg_params[:share_link])
        Rails.logger.debug "Scraped data: #{scraped_data}"

        if scraped_data[:error] == 'invalid_link'
          Rails.logger.error "Invalid Dragon Village link: #{egg_params[:share_link]}"
          return render json: { error: 'Invalid Dragon Village link' }, status: :unprocessable_entity
        end

        fallback_image_url = "/images/default_redwyvern.png"
        fallback_view_count = 0

        # Check for scraping issues and set fallback values if needed
        if scraped_data.nil?
          scraped_data = { image: fallback_image_url, view_count: fallback_view_count }
          Rails.logger.error "Scraping failed, using fallback values: #{scraped_data}"
        else
          scraped_data[:image] ||= fallback_image_url
          scraped_data[:view_count] ||= fallback_view_count
        end

        egg = DragonVillageEgg.find_or_initialize_by(share_link: egg_params[:share_link])
        Rails.logger.debug "Found or initialized egg: #{egg.inspect}"

        egg.assign_attributes(egg_params.merge(scraped_data))
        Rails.logger.debug "Assigned attributes to egg: #{egg.inspect}"

        if egg.save
          Rails.logger.debug "Successfully saved egg: #{egg.inspect}"
          render json: egg, status: :created
        else
          Rails.logger.error "Failed to save egg: #{egg.errors.full_messages}"
          render json: egg.errors, status: :unprocessable_entity
        end
      else
        Rails.logger.error "Invalid Dragon Village link: #{egg_params[:share_link]}"
        render json: { error: 'Invalid Dragon Village link' }, status: :unprocessable_entity
      end
    rescue ActiveRecord::RecordNotUnique => e
      Rails.logger.error "Duplicate entry error: #{e.message}"
      render json: { error: 'Duplicate entry. This share link already exists.' }, status: :unprocessable_entity
    end

    def destroy_by_link
      share_link = params[:share_link]
      decoded_share_link = CGI.unescape(share_link)
      egg = DragonVillageEgg.find_by(share_link: decoded_share_link)
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
