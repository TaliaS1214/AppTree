Rails.application.routes.draw do
  root to: 'application#index'
  devise_for :users

  get '/users/current' => 'users#logged'
  resources :users, only: [:show]

  resources :genres, only: [:index]

  get '/apps/search' => 'apps#search'
  get '/apps/:genre' => 'apps#index'
  resources :apps, only: [:new, :create, :show]
end
