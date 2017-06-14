class AddAccountIdToComic < ActiveRecord::Migration[5.1]
  def change
    add_column :comics, :account_id, :integer
  end
end
