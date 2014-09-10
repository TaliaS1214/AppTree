class CreateNewComments < ActiveRecord::Migration
  def change
    create_table :new_comments do |t|
      t.references :user
      t.references :app

      t.timestamps
    end
  end
end
