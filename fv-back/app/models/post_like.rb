class PostLike < ApplicationRecord
  after_create :increment_post_like
  after_destroy :decrement_post_like
  belongs_to :post
  belongs_to :user
  validates :user, uniqueness: true

  def increment_post_like
    post.increment!(:likes)
  end
  def decrement_post_like
    post.decrement!(:likes)
  end
end
