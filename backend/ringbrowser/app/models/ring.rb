class Ring < ApplicationRecord
  has_many :user_rings
  has_many :users, through: :user_rings
end
