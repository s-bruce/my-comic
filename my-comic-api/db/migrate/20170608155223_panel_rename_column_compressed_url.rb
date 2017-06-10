class PanelRenameColumnCompressedUrl < ActiveRecord::Migration[5.1]
  def change
    rename_column :panels, :compressed_url, :canvas_url
  end
end
