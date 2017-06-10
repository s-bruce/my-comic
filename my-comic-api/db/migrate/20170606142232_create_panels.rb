class CreatePanels < ActiveRecord::Migration[5.1]
  def change
    create_table :panels do |t|
      t.integer :comic_id
      t.string :image_url
      t.string :text_url
      t.string :compressed_url

      t.timestamps
    end
  end
end
