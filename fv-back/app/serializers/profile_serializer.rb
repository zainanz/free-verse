class ProfileSerializer
  include JSONAPI::Serializer
  attributes :id, :content, :user_id, :likes, :created_at, :updated_at
  attribute :post_liked_by_current_user do |post, params|
    current_user = params[:user]
    post.post_likes.exists?(user: current_user)
  end
end
