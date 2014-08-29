class App < ActiveRecord::Base
  has_and_belongs_to_many :genres

  has_many :upvotes
  has_many :bookmarks

  has_many :bookmarking_users, through: :bookmarks, source: :user
  has_many :upvoting_users, through: :upvotes, source: :user

  validates :itunes_id, uniqueness: true
end
