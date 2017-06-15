class ComicBookSerializer < ActiveModel::Serializer
  attributes :id, :title, :account_id
  has_many :comics
end
