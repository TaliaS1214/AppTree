class App < ActiveRecord::Base

  has_and_belongs_to_many :genres

  has_many :upvotes
  has_many :bookmarks

  has_many :bookmarking_users, through: :bookmarks, as: :user
  has_many :upvoting_users, through: :upvotes, as: :user
end
