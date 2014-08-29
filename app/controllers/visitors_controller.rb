class VisitorsController < ApplicationController

  def index
    @genres = Genre.all
  end

end
