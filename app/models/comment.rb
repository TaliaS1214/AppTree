class Comment < ActiveRecord::Base

  belongs_to :user
  belongs_to :app

  def as_json(option)
    super.tap do |hash|
      hash['user'] = hash['user']['first_name'] + ' ' + hash['user']['last_name']
      hash['created_at'] = hash['created_at'].strftime('%H:%M %m-%d')
    end
  end
end
