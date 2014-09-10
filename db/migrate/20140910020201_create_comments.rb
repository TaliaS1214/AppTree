class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.text :content
      t.references :user_id
      t.references :app_id
      t.timestamps
    end
  end
end
