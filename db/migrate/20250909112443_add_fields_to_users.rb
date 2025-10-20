# db/migrate/20250909112443_add_fields_to_users.rb
class AddFieldsToUsers < ActiveRecord::Migration[7.0]
  def change
    # phone, name は既に存在するのでコメントアウト
    # add_column :users, :phone, :string  # 既に存在
    add_column :users, :gender, :string
    add_column :users, :home_address, :text
    add_column :users, :zip_code, :string

    # インデックスの追加（既に存在しない場合のみ）
    add_index :users, :phone unless index_exists?(:users, :phone)
  end
end
