class DropNewComments < ActiveRecord::Migration
  def change
    drop_table :new_comments
  end
end
