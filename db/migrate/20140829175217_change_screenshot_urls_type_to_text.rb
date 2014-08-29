class ChangeScreenshotUrlsTypeToText < ActiveRecord::Migration
  def change
    change_column :apps, :screenshot_urls, :text
  end
end
