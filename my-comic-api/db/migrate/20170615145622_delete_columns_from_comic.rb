class DeleteColumnsFromComic < ActiveRecord::Migration[5.1]
  def change
    remove_column :comics, :title
    remove_column :comics, :account_id
    add_column :comics, :comic_book_id, :integer
  end
end
