class Api::DCDragonsController < ApplicationController
  before_action :authenticate_user!

  def index
    # Dummy data for testing
    @dragons = [
      { id: '1', name: 'Dragon 1', views: 100, unique_views: 80, clicks: 20, time_remaining: 3600 },
      { id: '2', name: 'Dragon 2', views: 200, unique_views: 150, clicks: 50, time_remaining: 7200 }
    ]
    render json: @dragons, status: :ok
  end

  def add_all
    # Dummy implementation for adding all dragons to the hatchery
    @dragons = dummy_dragons
    @dragons.each { |dragon| dragon[:in_hatchery] = true }
    render json: { message: 'All dragons added to the hatchery', dragons: @dragons }, status: :ok
  end

  def remove_all
    # Dummy implementation for removing all dragons from the hatchery
    @dragons = dummy_dragons
    @dragons.each { |dragon| dragon[:in_hatchery] = false }
    render json: { message: 'All dragons removed from the hatchery', dragons: @dragons }, status: :ok
  end

  def update
    # Dummy implementation for adding/removing a single dragon
    dragon = dummy_dragons.find { |d| d[:id] == params[:id] }
    if dragon
      dragon[:in_hatchery] = params[:in_hatchery]
      render json: { message: "Dragon #{params[:in_hatchery] ? 'added to' : 'removed from'} the hatchery", dragon: dragon }, status: :ok
    else
      render json: { error: 'Dragon not found' }, status: :not_found
    end
  end

  def destroy
    # Dummy implementation for removing a single dragon
    dragon = dummy_dragons.find { |d| d[:id] == params[:id] }
    if dragon
      dummy_dragons.delete(dragon)
      render json: { message: 'Dragon removed', dragon: dragon }, status: :ok
    else
      render json: { error: 'Dragon not found' }, status: :not_found
    end
  end

  private

  def dummy_dragons
    [
      { id: '1', name: 'Dragon 1', views: 100, unique_views: 80, clicks: 20, time_remaining: 3600, in_hatchery: false },
      { id: '2', name: 'Dragon 2', views: 200, unique_views: 150, clicks: 50, time_remaining: 7200, in_hatchery: false }
    ]
  end

  def authenticate_user!
    render json: { error: "Not authenticated" }, status: :unauthorized unless current_user
  end

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end
end
