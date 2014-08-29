Rails.application.routes.draw do
  root to: 'application#index'
  devise_for :users

  resources :genres do
    resources :apps
  end

  get '/sms' => 'twilio#index'

end
