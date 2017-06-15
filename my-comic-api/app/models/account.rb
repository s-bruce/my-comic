class Account < ApplicationRecord
  has_many :comic_books
  has_secure_password
end
