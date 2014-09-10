Rails.application.routes.draw do
  root to: 'application#index'

  # User Routes
  get '/users/current'          => 'users#logged'
  get '/users/apps/upvoted'     => 'users#upvoted_apps'
  get '/users/apps/bookmarked'  => 'users#bookmarked_apps'
  resources :users
  resources :sessions, only: [:create, :destroy]

  # Genre Routes
  resources :genres, only: [:index]

  # App Routes
  get '/:genre/apps'              => 'apps#index'
  get '/apps/search'              => 'apps#search'
  get '/apps/top'                 => 'apps#top'
  put '/apps/:id/upvote'          => 'apps#toggle_upvote'
  put '/apps/:id/send'            => 'apps#send_and_bookmark'
  resources :apps, only: [:new, :create, :show]

  # Comment Routes
  get '/apps/:id/comments'        => 'comments#index'
  post '/apps/:id/comments'       => 'comments#create'
  put '/apps/comments/:id'        => 'comments#update'


end
