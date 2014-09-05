class App < ActiveRecord::Base
  has_and_belongs_to_many :genres

  has_many :upvotes
  has_many :bookmarks

  has_many :bookmarking_users, through: :bookmarks, source: :user
  has_many :upvoting_users, through: :upvotes, source: :user

  validates :itunes_id, uniqueness: true

  # before_save :join_screenshot_urls

  attr_accessor :upvotable

  def upvotable_status(user)
    @upvotable = user && !user.upvoted_apps.include?(self) ? true : false
    self
  end

  def as_json(options)
    super(methods: [:upvotable])
  end

  def add_genres
    self.tags.split(',').each do |tag|
      if genre = Genre.find_by(name: tag)
        self.genres << genre
      end
    end
  end

  # def join_screenshot_urls
  #   self.screenshot_urls = self.screenshot_urls.join(',')
  # end
end
