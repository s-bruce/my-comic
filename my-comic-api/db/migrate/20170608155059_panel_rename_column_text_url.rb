class PanelRenameColumnTextUrl < ActiveRecord::Migration[5.1]
  def change
    rename_column :panels, :text_url, :text
  end
end
