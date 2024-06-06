Rails.application.routes.draw do
  namespace :api do
    resources :dragon_village_eggs, only: [:index, :create] do
      delete 'destroy_by_link', on: :collection
    end
  end

  # OmniAuth routes for Dragon Cave
  get '/auth/:provider/callback', to: 'sessions#create'
  get '/auth/failure', to: 'sessions#failure'
  delete '/logout', to: 'sessions#destroy'
  
  # User routes
  resources :users, only: [:show, :update] do
    get 'dashboard', on: :member
  end
end
