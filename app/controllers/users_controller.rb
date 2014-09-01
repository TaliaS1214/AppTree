class UsersController < ApplicationController

  def show
    @user = user.find(params[:id])
    render json: @user.safe_info.to_json, status: 200
  end

  def logged
    if current_user
      render json: current_user.safe_info.to_json, status: 200
    else
      render nothing: true
    end
  end
  
end
