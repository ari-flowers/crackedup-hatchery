class UsersController < ApplicationController
  before_action :authenticate_user!

  def show
    @user = User.find(params[:id])
    render json: { user: @user }, status: :ok
  end

  def update
    @user = User.find(params[:id])
    if @user.update(user_params)
      render json: { user: @user, message: "Profile updated successfully." }, status: :ok
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def dashboard
    @user = current_user
    @dragons = fetch_user_dragons(@user.access_token)
    render json: { user: @user, dragons: @dragons }, status: :ok
  end

  private

  def fetch_user_dragons(token)
    response = HTTParty.get("https://dragcave.net/api/#{ENV['DRAGON_CAVE_API_KEY']}/json/user_young", headers: { 'Authorization' => "Bearer #{token}" })
    if response.success?
      response.parsed_response['dragons']
    else
      []
    end
  end

  def authenticate_user!
    render json: { error: "Not authenticated" }, status: :unauthorized unless current_user
  end

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def user_params
    params.require(:user).permit(:username)
  end
end
