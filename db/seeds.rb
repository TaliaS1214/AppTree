# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
# user = CreateAdminService.new.call
# puts 'CREATED ADMIN USER: ' << user.email

genre_names = ["Books", "Business", "Catalogs", "Education", "Entertainment",
  "Finance", "Food & Drink", "Games", "Health & Fitness", "Lifestyle", "Medical",
  "Music", "Navigation", "News", "Newsstand", "Photo & Video", "Productivity",
  "Reference", "Social Networking", "Sports", "Travel", "Utilities", "Weather"]

genre_names.each do |name|
  Genre.create!({
    name: name
  })
end
