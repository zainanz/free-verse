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
        begin
          token = request.headers["Authorization"].split(" ").last
          decoded = JWT.decode(token,  Rails.application.credentials.devise_jwt_secret_key!, "HS256")
          @user = User.find(decoded[0]["user_id"])
          render json: { posts: PostSerializer.new(@posts, {params: { user: @user }}).serializable_hash }
        rescue => exception
          render json: { posts: PostSerializer.new(@posts).serializable_hash }
        end
      end

      def unlike_post
        begin
          post_id = permit_post_id
          post = Post.find(post_id)
          liked_post = PostLike.find_by(post: post, user: @user)
          liked_post.destroy!
          render json:{ post_id: post_id}, status: :ok
        rescue => exception
          render status: :unproccessable_entity
        end
      end

      def like_post
        begin
          post_id = permit_post_id
          post = Post.find(post_id)
          PostLike.create!(post: post, user: @user)
          render json:{ post_id: post_id}, status: :ok
        rescue => exception
          render status: :unproccessable_entity
        end
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

      def permit_post_id
        params.require(:post_id)
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
