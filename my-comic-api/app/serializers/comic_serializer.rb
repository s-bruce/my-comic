class ComicSerializer < ActiveModel::Serializer
  attributes :id, :title, :canvas_url
  has_many :panels
end
