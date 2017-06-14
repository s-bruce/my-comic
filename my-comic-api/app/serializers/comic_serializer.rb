class ComicSerializer < ActiveModel::Serializer
  attributes :id, :title, :canvas_url, :account_id
  has_many :panels
end
