class AppsController < ApplicationController

  def index
    genre = Genre.find_by(name: params[:genre].capitalize)
    render json: genre.apps.to_json, status: 200
  end

  def show
  end

  def new
  end

  def create
  end

  def search
    @results = AppStore.search(search_term)
    render json: @results.to_json, status: 200
  end

  private

  def app_params
    params.require(:app).permit(:name, :tags, :screenshot_urls, :release_date, :creator, :price, :small_avatar_url, :large_avatar_url, :track_view_url, :description, :user_id)
  end
end
