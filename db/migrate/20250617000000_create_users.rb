class CreateUsers < ActiveRecord::Migration[7.0]
  # 20250611154501_devise_create_users.rbと内容重複しているので、中身をコメントアウト

  # def change
  #   create_table :users do |t|
  #     t.string :name,               null: false
  #     t.string :email,              null: false, default: ""
  #     t.string :encrypted_password, null: false, default: ""

  #     # Recoverable
  #     t.string   :reset_password_token
  #     t.datetime :reset_password_sent_at

  #     # Rememberable
  #     t.datetime :remember_created_at

  #     t.timestamps null: false
  #   end

  #   add_index :users, :email,                unique: true
  #   add_index :users, :reset_password_token, unique: true
  # end
end
