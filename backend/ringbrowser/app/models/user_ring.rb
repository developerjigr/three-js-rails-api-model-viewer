class UserRing < ApplicationRecord
  belongs_to :ring
  belongs_to :user
end
