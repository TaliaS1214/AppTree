Rails.application.routes.draw do
  root to: 'application#index'
  devise_for :users

  resources :genres, only: [:index]

  get '/:genre/apps'  => 'apps#index'

  resources :apps, only: [:new, :create, :show]
end
