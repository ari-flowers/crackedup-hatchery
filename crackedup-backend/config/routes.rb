Rails.application.routes.draw do
  namespace :api do
    # Dragon Village Collection link viewer
    resources :dragon_village_eggs, only: [:index, :create] do
      delete 'destroy_by_link', on: :collection
    end
    # Dragon Cave hatchery
    resources :dragons, only: [:index, :update, :destroy] do
      collection do
        post 'add_all'
        delete 'remove_all'
      end
    end
  end
  # Dragon Cave user routes
  resources :users, only: [:show, :update] do
    get 'dashboard', on: :member
  end
  
  # OmniAuth routes for Dragon Cave
  get '/auth/:provider/callback', to: 'sessions#create'
  get '/auth/failure', to: 'sessions#failure'
  delete '/logout', to: 'sessions#destroy'
end
