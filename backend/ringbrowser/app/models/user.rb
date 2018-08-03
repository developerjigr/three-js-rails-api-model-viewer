class User < ApplicationRecord
  has_many :user_rings
  has_many :rings, through: :user_rings
end
