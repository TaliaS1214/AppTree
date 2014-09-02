Rails.application.routes.draw do
  root to: 'application#index'

  get '/users/current' => 'users#logged'
  resources :users

  resources :genres, only: [:index]

  get '/apps/search' => 'apps#search'
  get '/apps/:genre' => 'apps#index'

  put '/apps/:id/upvote' => 'apps#upvote'
  put '/apps/:id/send' => 'apps#send_and_bookmark'

  resources :apps, only: [:new, :create, :show]

  resources :sessions, only: [:create, :destroy]
end
