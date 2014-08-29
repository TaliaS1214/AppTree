class AddUpvotesToApps < ActiveRecord::Migration
  def change
    add_column :apps, :upvotes, :integer
  end
end
