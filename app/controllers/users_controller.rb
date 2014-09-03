class UsersController < ApplicationController

  def index
  end

  def new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      session[:current_user] = @user.id
      render json: @user.safe_info.to_json, status: 200
    end
  end

  def show
    @user = User.find(params[:id])
    render json: @user.safe_info.to_json, status: 200
  end

  def edit
  end

  def update
  end

  def destroy
  end

  def logged
    if current_user
      render json: current_user.safe_info.to_json, status: 200
    else
      render nothing: true
    end
  end

  def upvoted_apps
    render json: current_user.upvoted_apps.reverse.to_json, status: 200
  end

  def bookmarked_apps
    apps = current_user.bookmarked_apps
    apps.each { |app| app.upvotable_status(current_user) }
    render json: apps.reverse.to_json, status: 200
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation, :phone_number)
  end

end
