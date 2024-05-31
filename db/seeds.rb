# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
# db/seeds.rb

DragonVillageEgg.create([
  {
    share_link: 'http://example.com/dragon1',
    image: 'https://via.placeholder.com/150',
    view_goal: 100,
    view_count: 0,
    submission_time: Time.now
  },
  {
    share_link: 'http://example.com/dragon2',
    image: 'https://via.placeholder.com/150',
    view_goal: 200,
    view_count: 0,
    submission_time: Time.now
  }
])
