Rails.application.routes.draw do
  namespace :api do
    resources :dragon_village_eggs, only: [:index, :create]
    delete 'dragon_village_eggs', to: 'dragon_village_eggs#destroy_by_link'
  end
end
