class ComicSerializer < ActiveModel::Serializer
  attributes :id, :canvas_url, :comic_book_id
  has_many :panels
end
