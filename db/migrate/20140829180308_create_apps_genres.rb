class CreateAppsGenres < ActiveRecord::Migration
  def change
    create_table :apps_genres do |t|
      t.references :app
      t.references :genre
    end
  end
end
