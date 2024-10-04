class ApplicationController < ActionController::API
  before_action :configure_permitted_parameters, if: :devise_controller?
  # before_action :authenticate_user
  protected
  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: %i[username])
    devise_parameter_sanitizer.permit(:account_update, keys: %i[username])
  end
  # def authenticate_user
  # begin
  #   token = request.headers["Authorization"].split(" ").last
  # rescue => exception
  #   render json: { error: "User unknown" }, status: :unprocessabile_entity
  # end
  # end
end
