class ChangeCompressedUrlType < ActiveRecord::Migration[5.1]
  def change
    change_column :panels, :compressed_url, :text
  end
end
