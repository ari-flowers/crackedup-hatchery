every 1.day, at: '12:00 am' do
  runner "DragonVillageEgg.cleanup_old_entries"
end

every 1.hour do
  rake "eggs:update_data"
end
