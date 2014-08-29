class CreateApps < ActiveRecord::Migration
  def change
    create_table :apps do |t|
      t.string :name
      t.string :tags
      t.string :screenshot_urls
      t.string :release_date
      t.string :creator
      t.integer :price
      t.string :small_avatar_url
      t.string :large_avatar_url
      t.string :track_view_url
      t.text :description
      t.timestamps
    end
  end
end
