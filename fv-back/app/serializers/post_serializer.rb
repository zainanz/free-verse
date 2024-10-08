class PostSerializer
  include JSONAPI::Serializer
  attributes :id, :content, :user_id, :likes, :created_at, :updated_at
  attribute :user do |post|
    {
      id: post.user.id,
      username: post.user.username
    }
  end
  attribute :post_liked_by_current_user do |post, params|
    current_user = params[:user]
    Rails.logger.info(params)
    Rails.logger.info(@instance_options)
    Rails.logger.info(current_user)
    Rails.logger.info(post)
    post.post_likes.exists?(user: current_user)
  end
end
