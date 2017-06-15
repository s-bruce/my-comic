class ComicBook < ApplicationRecord
  belongs_to :account
  has_many :comics
  accepts_nested_attributes_for :comics
end
