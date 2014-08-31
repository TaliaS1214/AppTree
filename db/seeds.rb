# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
# user = CreateAdminService.new.call
# puts 'CREATED ADMIN USER: ' << user.email

# users = [
#   { name: 'Najee Garder', email: 'najee.s.gardner@gmail.com', password: 'qwertyui', password_confirmation: 'qwertyui', phone_number: '1234567890' },
#   { name: 'Sean Talia', email: 'talias432@gmail.com', password: 'qwertyui', password_confirmation: 'qwertyui', phone_number: '1234567890' }
# ]

#
# genre_names = ["Books", "Business", "Catalogs", "Education", "Entertainment",
#   "Finance", "Food & Drink", "Games", "Health & Fitness", "Lifestyle", "Medical",
#   "Music", "Navigation", "News", "Newsstand", "Photo & Video", "Productivity",
#   "Reference", "Social Networking", "Sports", "Travel", "Utilities", "Weather"]
#
# genre_names.each do |name|
#   Genre.create!({
#     name: name
#   })
# end
#
# app_list = AppStore.search("evernote")[0..10] + AppStore.search("lexulous")[0..10] +
# AppStore.search("dark+sky")[0..10] + AppStore.search("things")[0..10] + AppStore.search("instagram")[0..10] +
# AppStore.search("twitter")[0..10] + AppStore.search("reeder")[0..10] + AppStore.search("hype+machine")[0..10] +
# AppStore.search("vine")[0..10] + AppStore.search("seatgeek")[0..10] + AppStore.search("threes")[0..10] +
# AppStore.search("letterpress")[0..10] + AppStore.search("vesper")[0..10] + AppStore.search("pocket")[0..10] +
# AppStore.search("splashtop")[0..10] + AppStore.search("alien+blue")[0..10]
#
# app_list.each do |app|
#
#   current_app = App.create(app)
#
#   current_app.tags.split(',').each do |tag|
#     if genre = Genre.find_by(name: tag)
#       current_app.genres << genre
#     end
#   end
#
# end

# App.all.each do |current_app|
#   current_app.upvote_count = (0..500).to_a.sample
#   current_app.save
# end

# users.each do |user|
#   current_user = User.create(user)
#
#   current_user.bookmarked_apps << App.all.sample
#   current_user.upvoted_apps << App.all.sample
# end
