Rails.application.routes.draw do
  namespace :api do
    resources :dragon_village_eggs, only: [:index, :create] do
      delete 'destroy_by_link', on: :collection
    end 
  end
end
