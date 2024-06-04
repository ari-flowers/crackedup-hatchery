namespace :eggs do
  desc "Update Dragon Village eggs data"
  task update_data: :environment do
    DragonVillageEgg.find_each do |egg|
      scraper = DragonVillageScraper.new(egg.share_link)
      scraped_data = scraper.scrape

      if scraped_data
        egg.update(scraped_data)
      end
    end
  end
end
