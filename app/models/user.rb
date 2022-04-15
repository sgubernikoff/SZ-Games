class User < ApplicationRecord

    has_many :purchases
    has_many :items, through: :purchases

    validates :name, presence: true
    validates :username, uniqueness: true
end
