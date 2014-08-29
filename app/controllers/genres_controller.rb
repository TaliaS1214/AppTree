class GenresController < ApplicationController

  def index
    @genres = Genre.all
  end

  def show
    @genre = Genre.find(params[:id])
  end

  def new
  end

  def create
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
