class ApplicationController < ActionController::API
  before_action :configure_permitted_parameters, if: :devise_controller?

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: %i[username])
    devise_parameter_sanitizer.permit(:account_update, keys: %i[username])
  end

  def authenticate_user
    begin
      token = request.headers["Authorization"].split(" ").last
      decoded = JWT.decode(token,  Rails.application.credentials.devise_jwt_secret_key!)
      @user = User.find(decoded[0]["user_id"])
      throw :ExpiredSignature unless @user.jti === decoded[0]["jti"]
    rescue JWT::ExpiredSignature
      render json: { message: "Token has expired" }, status: :unauthorized
    rescue => exception
      render json: { message: "No session was found" }, status: :unauthorized
    end
  end
end
