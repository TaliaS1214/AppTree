class User < ActiveRecord::Base

  validates :username, uniqueness: true
  validates :email, uniqueness: true

  has_secure_password

  has_and_belongs_to_many :genres
  has_many :upvotes
  has_many :bookmarks
  has_many :comments

  has_many :bookmarked_apps, through: :bookmarks, source: :app
  has_many :upvoted_apps, through: :upvotes, source: :app

  def safe_info
    {
      id: self.id,
      first_name: self.first_name,
      last_name: self.last_name,
      username: self.username,
      email: self.email,
      genres: self.genres.pluck(:name),
      sessionStatus: true,
      phone_number: self.phone_number
    }
  end

  def bookmarked_and_upvoted_apps
    {
      upvoted: self.upvoted_apps,
      bookmarks: self.bookmarked_apps
    }
  end
end
