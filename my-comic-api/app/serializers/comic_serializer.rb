class ComicSerializer < ActiveModel::Serializer
  attributes :id, :title
  has_many :panels
end
