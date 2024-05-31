Rails.application.routes.draw do
  namespace :api do
    resources :dragon_village_eggs, only: [:index, :create]
    delete 'dragon_village_eggs', to: 'dragon_village_eggs#destroy', param: :share_link
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
