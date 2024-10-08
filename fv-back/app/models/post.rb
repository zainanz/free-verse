class Post < ApplicationRecord
  belongs_to :user
  has_many :post_likes
  validates :user, :content, presence: true
end
