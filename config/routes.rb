Rails.application.routes.draw do

  resources :users
  resources :purchases, only: [:create, :index]
  resources :items, only: [:index, :show]
  resources :sessions, only: [:create, :destroy]
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
