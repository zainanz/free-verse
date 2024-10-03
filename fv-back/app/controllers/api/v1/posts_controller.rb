module Api
  module V1
    class PostsController < ApplicationController
      def all_post
        render json: { posts: (Post.all) }
      end
    end
  end
end
