module Api
  module V1
    class CustomUsersController < ApplicationController
      respond_to :json

      def verify_user
        begin
          token = request.headers["Authorization"].split(" ").last
          Rails.logger.info(token)

          decoded = JWT.decode(token,  Rails.application.credentials.devise_jwt_secret_key!, "HS256")
          user = User.find(decoded[0]["user_id"])
          render json: { user: user }, status: :ok
        rescue => exception
          render json: { error: exception }, status: :unprocessable_entity
        end
      end
    end
  end
end
