class SessionsController < ApplicationController
  def create
    auth = request.env['omniauth.auth']
    user = User.find_or_create_by(dc_user_id: auth['uid']) do |u|
      u.username = auth['info']['username']
      u.access_token = auth['credentials']['token']
      u.refresh_token = auth['credentials']['refresh_token']
    end

    session[:user_id] = user.id
    redirect_to user_dashboard_path
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_path
  end
end
