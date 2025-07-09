class RemoveDefaultFromUsersEmail < ActiveRecord::Migration[7.2]
  def change
    # emailカラムのデフォルト値を ""（空文字）から nil に変更
    change_column_default :users, :email, from: "", to: nil
  end
end
