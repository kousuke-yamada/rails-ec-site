# config/routes.rb
Rails.application.routes.draw do
  root to: "home#top"
  get "/mypage", to: "users#mypage"

  resources :products do
    collection do
    get :listing
    post :create  # これで /products POST が products#create にルーティング
    get :my_products
  end
  member do
    get :purchase
  end
    collection do
      get :listing
      get :my_products  # この行を追加
    end
  end

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/*
  get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker
  get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  devise_for :users, controllers: {
    registrations: "users/registrations"
  }
end
