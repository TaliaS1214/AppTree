class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable, :confirmable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :upvotes
  has_many :bookmarks

  has_many :bookmarked_apps, through: :bookmarks, source: :app
  has_many :upvoted_apps, through: :upvotes, source: :app
end
