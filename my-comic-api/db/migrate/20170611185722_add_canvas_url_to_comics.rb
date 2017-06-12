class AddCanvasUrlToComics < ActiveRecord::Migration[5.1]
  def change
    add_column :comics, :canvas_url, :text
  end
end
