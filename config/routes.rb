Rails.application.routes.draw do
  root to: 'application#index'

  devise_scope :user do
    get    '/users/sign_in'           => 'sessions#new', as: 'new_user_session'
    post   '/users/sign_in'           => 'sessions#create', as: 'user_session'
    delete '/users/sign_out'          => 'sessions#destroy', as: 'destroy_user_session'
    post   '/users/password'          => 'passwords#create', as: 'user_password'
    get    '/users/password/new'      => 'passwords#new', as: 'new_user_password'
    get    '/users/password/edit'     => 'passwords#edit', as: 'edit_user_password'
    patch  '/users/password'          => 'passwords#update'
    put    '/users/password'          => 'passwords#update'
    get    '/users/cancel'            => 'registrations#cancel', as: 'cancel_user_registration'
    post   '/users'                   => 'registrations#create', as: 'user_registration'
    get    '/users/sign_up'           => 'registrations#new', as: 'new_user_registration'
    get    '/users/edit'              => 'registrations#edit', as: 'edit_user_registration'
    patch  '/users'                   => 'registrations#update'
    put    '/users'                   => 'registrations#update'
    delete '/users'                   => 'registrations#destroy'
    post   '/users/confirmation'      => 'confirmations#create', as: 'user_confirmation'
    get    '/users/confirmation/new'  => 'confirmations#new', as: 'new_user_confirmation'
    get    '/users/confirmation'      => 'confirmations#show'
  end

  # devise_for :users

  get '/users/current' => 'users#logged'
  resources :users, only: [:show]

  resources :genres, only: [:index]

  get '/apps/search' => 'apps#search'
  get '/apps/:genre' => 'apps#index'
  resources :apps, only: [:new, :create, :show]
end
