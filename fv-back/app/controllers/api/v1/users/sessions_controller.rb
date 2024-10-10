module Api
  module V1
      class Users::SessionsController < Devise::SessionsController
        before_action :retrieve_user_params, only:[ :create ]
        before_action :authenticate_user, only:[ :destroy ]
        respond_to :json
        def logout_user

        end
        def create
          user_params = retrieve_user_params
          user = User.find_by(username: user_params[:username])


          if user && user.valid_password?(user_params[:password])
            token = JWT.encode({ user_id: user.id, jti: user.jti }, Rails.application.credentials.devise_jwt_secret_key!, 'HS256')
            render json: { token: token, message: "Login successful!", user: user.to_json() }, status: :ok, content_type: :json
          else
            render json: { error: "Invalid username or password" }, status: :unauthorized
          end
        end
        def retrieve_user_params
          params.require(:user).permit(:username, :password)
        end
      end
  end
end
