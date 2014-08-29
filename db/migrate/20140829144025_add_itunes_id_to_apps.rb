class AddItunesIdToApps < ActiveRecord::Migration
  def change
    add_column :apps, :itunes_id, :integer
  end
end
