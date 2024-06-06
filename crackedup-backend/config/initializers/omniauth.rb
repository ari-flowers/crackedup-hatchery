# TO DO: remove conditional when I get API access

if ENV['DRAGON_CAVE_CLIENT_ID'].present? && ENV['DRAGON_CAVE_CLIENT_SECRET'].present?
  Rails.application.config.middleware.use OmniAuth::Builder do
    provider :dragon_cave, ENV['DRAGON_CAVE_CLIENT_ID'], ENV['DRAGON_CAVE_CLIENT_SECRET']
  end
end
