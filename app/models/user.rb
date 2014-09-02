class User < ActiveRecord::Base

  has_secure_password

  has_and_belongs_to_many :genres
  has_many :upvotes
  has_many :bookmarks

  has_many :bookmarked_apps, through: :bookmarks, source: :app
  has_many :upvoted_apps, through: :upvotes, source: :app

  def safe_info
    {
      id: self.id,
      first_name: self.first_name,
      last_name: self.last_name,
      email: self.email,
      genres: self.genres.pluck(:name)
    }
  end
end
