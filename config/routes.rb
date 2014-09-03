Rails.application.routes.draw do
  root to: 'application#index'

  get '/users/current'          => 'users#logged'
  get '/users/apps/upvoted'     => 'users#upvoted_apps'
  get '/users/apps/bookmarked'  => 'users#bookmarked_apps'
  resources :users

  resources :sessions, only: [:create, :destroy]

  resources :genres, only: [:index]

  get '/apps/search'      => 'apps#search'
  get '/apps/top'         => 'apps#top'
  get '/apps/:genre'      => 'apps#index'
  put '/apps/:id/upvote'  => 'apps#toggle_upvote'
  put '/apps/:id/send'    => 'apps#send_and_bookmark'
  resources :apps, only: [:new, :create, :show]

end
