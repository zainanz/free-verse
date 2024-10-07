class PostSerializer
  include JSONAPI::Serializer
  attributes :id, :content, :user_id, :likes, :created_at, :updated_at
  attribute :user do |post|
    {
      id: post.user.id,
      username: post.user.username
    }
  end
end
