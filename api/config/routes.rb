Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :reports, only: [:index, :create] do
    collection do
        match '', via: :options, action: 'options'
    end
  end
end
