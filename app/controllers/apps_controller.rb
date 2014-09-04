class AppsController < ApplicationController

  def index
    genre = Genre.find_by(name: params[:genre])
    apps = genre.apps.order(upvote_count: :desc)
    apps.each { |app| app.upvotable_status(current_user) }
    render json: apps.to_json, status: 200
  end

  def top
    apps = App.all.order(upvote_count: :desc)[0...10]
    apps.each { |app| app.upvotable_status(current_user) }
    render json: apps.to_json, status: 200
  end

  def show
    app = App.find(params[:id])
    app.upvotable_status(current_user)
    render json: app.to_json, status: 200
  end

  def create
    app = App.new(app_params)
    app.upvote_count = 1

    if app.save
      current_user.upvoted_apps << app
      app.add_genres
      render json: app.upvotable_status(current_user).to_json, status: 200
    end
  end

  def search
    results = AppStore.search(params[:search_term])
    results.each { |app| app.upvotable_status(current_user) }
    render json: results.to_json, status: 200
  end

  def toggle_upvote
    app = App.find(params[:id])

    if current_user.upvoted_apps.include?(app)
      app.upvote_count -= 1
      app.upvotes.find_by(user_id: current_user.id).destroy
    else
      app.upvote_count += 1
      current_user.upvoted_apps << app
    end

    if app.save
      app.upvotable_status(current_user)
      render json: app.to_json, status: 200
    end
  end

  def send_and_bookmark()
    current_app = App.find(params[:id])
    bookmark(current_app)
    TwilioMod.send_text(current_app, current_user.phone_number)
    render nothing: true
  end

  def user_apps
    render json: current_user.bookmarked_and_upvoted_apps.to_json, status: 200
  end

  private

  def app_params
    params.require(:app).permit(:name, :tags, :screenshot_urls, :releast_date, :creator, :price, :small_avatar_url, :large_avatar_url, :track_view_url, :description, :itunes_id)
  end

  def bookmark(app)
    current_user.bookmarked_apps << app
  end

end
