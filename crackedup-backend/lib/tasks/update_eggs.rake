namespace :eggs do
  desc "Update Dragon Village eggs data"
  task update_data: :environment do
    DragonVillageEgg.find_each do |egg|
      scraped_data = DragonVillageScraper.scrape(egg.share_link)

      if scraped_data
        egg.update(scraped_data)
      end
    end
  end
end
