class Account < ApplicationRecord
  has_many :comics
  has_secure_password
end
