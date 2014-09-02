class SessionsController < ApplicationController

  def create
    @user = User.find_by(email: params[:email])
    if @user && @user.authenticate(params[:password])
      session[:current_user] = @user.id
      render json: @user.safe_info.to_json, status: 200
    end
  end

  def destroy
    if session[:current_user] == params[:id]
      session[:current_user] = nil
      render nothing: true
    end
  end

end
