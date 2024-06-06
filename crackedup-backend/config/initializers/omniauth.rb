Rails.application.config.middleware.use OmniAuth::Builder do
  provider :dragon_cave, ENV['DRAGON_CAVE_CLIENT_ID'], ENV['DRAGON_CAVE_CLIENT_SECRET'], scope: 'user'
end
