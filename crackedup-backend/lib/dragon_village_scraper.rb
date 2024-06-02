class DragonVillageScraper
  def self.scrape(url)
    response = HTTParty.get(url)
    if response.code == 200
      body = response.body
      doc = Nokogiri::HTML(body)

      # Check if the link is invalid
      if invalid_link?(doc)
        puts "The provided link is not available: #{url}"
        return { error: 'invalid_link' }
      end

      # Extract view count
      view_count = extract_view_count(doc)
      unless view_count
        puts "Unable to extract view count"
        return { error: 'view_count_not_found' }
      end

      # Extract image URL
      image_url = extract_image_url(doc)
      if image_url.nil?
        puts "Unable to extract image URL"
        return { image: nil, view_count: view_count }
      end

      { image: image_url, view_count: view_count }
    else
      puts "Failed to scrape the URL: #{url}"
      nil
    end
  end

  def self.invalid_link?(doc)
    invalid_message_element = doc.at_css(".dragonNickname.textOutline.alignCenter.textSizeLarge")
    invalid_message_element && invalid_message_element.text == "This link is not available."
  end

  def self.extract_view_count(doc)
    view_count_element = doc.at_css(".viewText span")
    view_count_element ? view_count_element.text.to_i : nil
  end

  def self.extract_image_url(doc)
    high_quality_image_element = doc.at_css(".drgaonIllust img")
    return nil if high_quality_image_element.nil?

    high_quality_image_url = high_quality_image_element['src']
    return nil if high_quality_image_url.nil?

    # Extract dragon identifier from high-quality URL
    dragon_identifier = high_quality_image_url.match(/\/([^\/]+)\.png$/)[1]
    return nil if dragon_identifier.nil?

    # Generate potential sprite URLs
    sprite_urls = generate_sprite_urls(dragon_identifier)

    # Check which sprite URL is valid
    sprite_urls.each do |sprite_url|
      return sprite_url if check_image_url(sprite_url)
    end

    # Fallback to high-quality image URL if no sprite URL is valid
    high_quality_image_url
  end

  def self.generate_sprite_urls(dragon_identifier)
    # Assuming the dragon identifier format gives us the parts needed
    base_url = "https://res.dvc.land/dvc-web/res/dragon/dot/"
    [
      "#{base_url}#{dragon_identifier}.png",
      "#{base_url}#{dragon_identifier}_m_hatchling.png",
      "#{base_url}#{dragon_identifier}_f_hatchling.png",
      "#{base_url}#{dragon_identifier}_hatch.png"
    ]
  end

  def self.check_image_url(url)
    response = HTTParty.head(url)
    response.code == 200
  end
end
