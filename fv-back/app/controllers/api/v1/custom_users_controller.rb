module Api
  module V1
    class CustomUsersController < ApplicationController
      before_action :authenticate_user, only: [ :verify_user, :get_profile ]
      respond_to :json

      def get_profile
        @user = User.find_by(username: get_username_params)
        @user_posts = @user.posts
        render json: {
          user: @user,
          user_posts: @user_posts
        }
      end

      def verify_user
        render json: { user: @user }, status: :ok
      end

      private
      def get_username_params
        params.require(:username)
      end
    end
  end
end
