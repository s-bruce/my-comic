Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :comics
      get '/usercomics/:id', to: 'comics#user_comics'
      resources :accounts
      post '/auth', to: 'auth#create'
      get '/auth', to: 'auth#show'
    end
  end
end
