Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :comic_books
      resources :comics
      get '/usercomics/:id', to: 'comic_books#user_comics'
      resources :accounts
      post '/auth', to: 'auth#create'
      get '/auth', to: 'auth#show'
    end
  end
end
