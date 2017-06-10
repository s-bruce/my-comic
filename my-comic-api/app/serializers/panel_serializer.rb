class PanelSerializer < ActiveModel::Serializer
  attributes :id, :comic_id, :text, :image_url, :canvas_url
  belongs_to :comic
end
