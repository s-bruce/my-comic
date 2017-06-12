class RemoveCanvasUrlFromPanels < ActiveRecord::Migration[5.1]
  def change
    remove_column :panels, :canvas_url
  end
end
