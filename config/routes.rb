Rails.application.routes.draw do
  root to: 'images#index'
  get 'images', to: 'images#index'

  post 'images/saveImage', to: 'images#saveImage'
  post 'images/uploadPhoto', to: 'images#uploadPhoto'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
