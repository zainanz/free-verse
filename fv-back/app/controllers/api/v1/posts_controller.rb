module Api
  module V1
    class PostsController < ApplicationController
      before_action :authenticate_user, only: [ :create_post ]





      def all_post
        render json: { posts: (Post.all) }
      end

      def create_post
        post_params_data = permit_post_params
        if post_params_data["user_id"] != @user.id
          render json: { message: "Please validate your identity again." }, status: :unproccessable_entity
          return
        end
        post_create = Post.create(user: @user, content: post_params_data[:content])
        render json: {
          message: "Created Successfully",
          post:  post_create
        }, status: :ok
      end

      private

      def permit_post_params
        params.require(:post).permit(:user_id, :content)
      end
    end
  end
end
