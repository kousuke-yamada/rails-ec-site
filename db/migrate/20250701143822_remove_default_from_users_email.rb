class RemoveDefaultFromUsersEmail < ActiveRecord::Migration[7.2]
  def change
    # emailカラムのデフォルト値を ""（空文字）から nil に変更
    change_column_default :users, :email, from: "", to: nil

    # 必要なカラムを追加
    add_column :users, :name, :string, null: false
    add_column :users, :phone, :string

    # インデックスを追加（検索性能向上のため）
    add_index :users, :name
  end
end
