class Comic < ApplicationRecord
  has_many :panels
  accepts_nested_attributes_for :panels
end
