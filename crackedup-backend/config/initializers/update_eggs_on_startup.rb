require 'dragon_village_scraper'


Rails.application.config.after_initialize do
  Thread.new do
    ActiveRecord::Base.connection_pool.with_connection do
      DragonVillageEgg.find_each do |egg|
        scraper = DragonVillageScraper.new(egg.share_link)
        scraped_data = scraper.scrape

        if scraped_data
          egg.update(scraped_data)
        end
      end
    end
  end
end
