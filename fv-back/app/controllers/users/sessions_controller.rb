class Users::SessionsController < Devise::SessionsController
  include ActionController::Cookies
  before_action :retrieve_user_params, only:[ :create]
  respond_to :json
  def create
    user_params = retrieve_user_params
    user = User.find_by(username: user_params[:username])


    if user && user.valid_password?(user_params[:password])
      token = JWT.encode({ user_id: user.id }, Rails.application.credentials.devise_jwt_secret_key!, 'HS256')
      cookies[:token] = {
        value: token,
        httponly: true,
        secure:  Rails.env.production?,
        expires: 30.minutes.from_now,
        same_site: :none
      }
      render json: { message: 'Login successful!' }, status: :ok, content_type: :json
    else
      render json: { error: "Invalid username or password" }, status: :unauthorized
    end
  end
  def retrieve_user_params
    params.require(:user).permit(:username, :password)
  end
end
