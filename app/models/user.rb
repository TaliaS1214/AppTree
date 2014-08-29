class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable, :confirmable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :upvotes
  has_many :bookmarks

  has_many :bookmarked_apps, through: :bookmarks, as: :bookmarking_user #,source: :bookmarked_app, source_type: 'App'
  has_many :upvoted_apps, through: :upvotes, as: :upvoting_user #, source: :upvoted_app, source_type: 'App'
end
