class RenameUpvotesToUpvoteCount < ActiveRecord::Migration
  def change
    rename_column :apps, :upvotes, :upvote_count
  end
end
