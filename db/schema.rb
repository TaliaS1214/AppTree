# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140903183307) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "apps", force: true do |t|
    t.string   "name"
    t.string   "tags"
    t.text     "screenshot_urls"
    t.string   "release_date"
    t.string   "creator"
    t.decimal  "price"
    t.string   "small_avatar_url"
    t.string   "large_avatar_url"
    t.string   "track_view_url"
    t.text     "description"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "itunes_id"
    t.integer  "upvote_count"
    t.integer  "popularity_score"
  end

  create_table "apps_genres", force: true do |t|
    t.integer "app_id"
    t.integer "genre_id"
  end

  create_table "bookmarks", force: true do |t|
    t.integer "user_id"
    t.integer "app_id"
  end

  create_table "genres", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "name"
  end

  create_table "genres_users", force: true do |t|
    t.integer "genre_id"
    t.integer "user_id"
  end

  create_table "upvotes", force: true do |t|
    t.integer "app_id"
    t.integer "user_id"
  end

  create_table "users", force: true do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "email"
    t.text     "password_digest"
    t.string   "phone_number"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "username"
  end

end
