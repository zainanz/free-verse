module Api
  module V1
    class CustomUsersController < ApplicationController
      before_action :authenticate_user, only: [ :verify_user, :get_profile, :logout ]
      respond_to :json

      def logout
        @user.update!(jti: SecureRandom.uuid) if @user.present?
        render json: { message: "Logout successful" }, status: :ok
      end

      def get_profile
        user = User.find_by(username: get_username_params)
        @user_posts = user.posts
        render json: {
          user: user,
          user_posts: ProfileSerializer.new(@user_posts, { params: { user: @user } }).serializable_hash
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
