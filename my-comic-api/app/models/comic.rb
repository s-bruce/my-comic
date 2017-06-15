class Comic < ApplicationRecord
  belongs_to :comic_book
  has_many :panels
  accepts_nested_attributes_for :panels
end
