module Api
  module V1
    class CustomUsersController < ApplicationController
      before_action :authenticate_user, only: [ :verify_user ]
      respond_to :json

      def verify_user
        render json: { user: @user }, status: :ok
      end
    end
  end
end
