class ChangeAppPriceToDecimal < ActiveRecord::Migration
  def change
    change_column :apps, :price, :decimal
  end
end
