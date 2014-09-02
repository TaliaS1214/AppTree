class AppsController < ApplicationController

  def index
    genre = Genre.find_by(name: params[:genre])
    apps = genre.apps.order(upvote_count: :desc)
    apps.each { |app| app.upvotable_status(current_user) }
    render json: apps.to_json, status: 200
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

  def upvote
    app = App.find(params[:id])
    app.upvote_count += 1
    current_user.upvoted_apps << app
    if app.save
      render json: app.to_json, status: 200
    end
  end

  def send_and_bookmark
    current_app = App.find(params[:id])
    bookmark(current_app)
    send_text_message(current_app)
    render nothing: true
  end

  private

  def app_params
    params.require(:app).permit(:name, :tags, :screenshot_urls, :releast_date, :creator, :price, :small_avatar_url, :large_avatar_url, :track_view_url, :description, :itunes_id)
  end

  def bookmark(app)
    current_user.bookmarked_apps << app
  end

  def send_text_message(app)
    number_to_send_to = "+1#{current_user.phone_number}"

    twilio_sid = ENV["TWILIO_SID"]
    twilio_token = ENV["TWILIO_TOKEN"]
    twilio_phone_number = "6463627277"

    twilio_client = Twilio::REST::Client.new twilio_sid, twilio_token

    twilio_client.account.sms.messages.create(
    :from => "+1#{twilio_phone_number}",
    :to => number_to_send_to,
    :body => "#{app.name}\n\nDownload Link: #{app.track_view_url}"
    )
  end

end
