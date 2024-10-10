Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      devise_for :users, path: "", path_names: {
        sign_in: "login",
        sign_out: "logout",
        registration: "signup"
      },
      controllers: {
        sessions: "api/v1/users/sessions",  # Full namespace is specified here
        registrations: "api/v1/users/registrations"  # Ensure this is correct as well
      }

      get "/verify_user", to: "custom_users#verify_user"
      get "/profile/:username", to: "custom_users#get_profile"
      delete "/signout", to: "custom_users#logout"
      get "/posts", to: "posts#all_post"
      post "/create_post", to: "posts#create_post"
      patch "update_post", to: "posts#update_post"
      get "like_post/:post_id", to: "posts#like_post"
      delete "unlike_post/:post_id", to: "posts#unlike_post"
    end
  end
end
