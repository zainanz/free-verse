module Api
  module V1
    class PostsController < ApplicationController
      before_action :authenticate_user, only: [ :create_post ]
      def all_post
        render json: { posts: (Post.all) }
      end
      def create_post

      end
    end
  end
end
