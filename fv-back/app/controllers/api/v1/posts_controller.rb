module Api
  module V1
    class PostsController < ApplicationController
      before_action :authenticate_user, only: [ :create_post, :update_post, :like_post, :unlike_post ]

      def update_post
        begin

          edit_data = permit_edit_params
          post = Post.find(edit_data[:post_id])
          post.update!(content: edit_data[:updatedContent])
          render json: {
            message: "Successfully updated your post",
            status: :ok,
            post: post
          }
        rescue => exception
          render json: { message: "Something unexpected happened" }, status: :unproccessable_entity
        end
      end

      def all_post
        @posts = Post.includes(:user).limit(50)

        render json: { posts: PostSerializer.new(@posts).serializable_hash }
      end

      def unlike_post
        PostLike.where(post)
      end

      def like_post
      end

      def create_post
        post_params_data = permit_post_params
        if post_params_data["user_id"] != @user.id
          render json: { message: "Please validate your identity again." }, status: :unproccessable_entity
          return
        end
        post_create = Post.create(user: @user, content: post_params_data[:content])
        response_data = post_create.attributes.merge(
          user: {
            id: @user.id,
            username: @user.username
          }
        )
        render json: {
          post: response_data
        }, status: :ok
      end

      private

      def permit_like_unlike_params

      end

      def permit_edit_params
        params.require(:post).permit(:updatedContent, :post_id)
      end

      def permit_post_params
        params.require(:post).permit(:user_id, :content)
      end
    end
  end
end
