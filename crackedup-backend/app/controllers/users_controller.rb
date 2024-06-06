class UsersController < ApplicationController
  before_action :authenticate_user!

  def dashboard
    @user = current_user
    @dragons = fetch_user_dragons(@user.access_token)
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
    redirect_to root_path unless current_user
  end

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end
end
