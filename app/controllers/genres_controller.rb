class GenresController < ApplicationController

  def index
    render json: Genre.all.order(:name).to_json, status: 200
  end

  def show
    @genre = Genre.find(params[:id])
  end

  def edit
    @genre = Genre.find(params[:id])
  end

  def update
    @genre = Genre.find(params[:id])
  end

  private
  
  def genre_params
    params.require(:genre).permit(:name)
  end

end
