class CreateGenresUsers < ActiveRecord::Migration
  def change
    create_table :genres_users do |t|
      t.references :genre
      t.references :user
    end
  end
end
