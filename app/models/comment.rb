class Comment < ActiveRecord::Base

  belongs_to :user
  belongs_to :app

  def as_json(option)
    super.tap do |hash|
      hash['user'] = hash['user']['username']
      hash['created_at'] = hash['created_at'].strftime('%l:%M%P on %b. %d, %Y')
    end
  end
end
