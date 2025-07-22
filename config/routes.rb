# config/routes.rb
Rails.application.routes.draw do
  devise_for :users, controllers: { 
    registrations: 'users/registrations' 
  }
  
  get 'home/top', as: :home_top
  root 'home#top'
end