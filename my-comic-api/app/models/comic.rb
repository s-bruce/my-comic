class Comic < ApplicationRecord
  has_many :panels
  belongs_to :account
  accepts_nested_attributes_for :panels
end
