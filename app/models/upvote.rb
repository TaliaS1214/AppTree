class Upvote < ActiveRecord::Base
  belongs_to :user, polymorphic: true
  belongs_to :app, polymorphic: true
end
