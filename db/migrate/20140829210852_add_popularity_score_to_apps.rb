class AddPopularityScoreToApps < ActiveRecord::Migration
  def change
    add_column :apps, :popularity_score, :integer
  end
end
