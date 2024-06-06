class SessionsController < ApplicationController
  def create
    auth = request.env['omniauth.auth']
    user = User.find_or_create_by(dc_user_id: auth['uid']) do |u|
      u.username = auth['info']['username']
      u.access_token = auth['credentials']['token']
      u.refresh_token = auth['credentials']['refresh_token']
    end

    session[:user_id] = user.id
    render json: { user: user }, status: :ok
  end

  def failure
    render json: { error: "Authentication failed." }, status: :unauthorized
  end

  def destroy
    session[:user_id] = nil
    render json: { message: "Logged out successfully." }, status: :ok
  end
end
