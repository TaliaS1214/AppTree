class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable, :confirmable,
         :recoverable, :rememberable, :trackable, :validatable

  has_and_belongs_to_many :genres
  has_many :upvotes
  has_many :bookmarks

  has_many :bookmarked_apps, through: :bookmarks, source: :app
  has_many :upvoted_apps, through: :upvotes, source: :app

  def safe_info
    {
      id: self.id,
      name: self.name,
      email: self.email,
      genres: self.genres.pluck(:name)
    }
  end
end
