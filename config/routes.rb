# config/routes.rb
Rails.application.routes.draw do
  root to: "home#top"
  get "login", to: "sessions#new"
  post "login", to: "sessions#create"
  delete "logout", to: "sessions#destroy"
  get "/mypage", to: "users#mypage"
  
  get "profile", to: "users#profile"
  patch "profile", to: "users#update_profile", as: "update_profile"
  patch "profile/password", to: "users#update_password", as: "update_password"


  resources :products do  # only制限を削除してすべてのアクションを有効化
    member do
      get :purchase
    end
    collection do
      get :listing
      get :my_products 
    end
  end

  get "up" => "rails/health#show", as: :rails_health_check
  get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker
  get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  devise_for :users, controllers: {
    registrations: "users/registrations"
  }
end