class Product < ApplicationRecord
  self.table_name = "products_listings"

  has_many_attached :images
  belongs_to :user

  validates :name, presence: true, length: { maximum: 40 }
  validates :description, presence: true, length: { maximum: 1000 }
  validates :price, presence: true, numericality: { greater_than_or_equal_to: 300, less_than_or_equal_to: 9999999 }
  validates :condition_id, presence: true
  validates :shipping_fee_payer_id, presence: true
  validates :prefecture_id, presence: true
  validates :shipping_day_id, presence: true
  validates :category_id, presence: true
  validates :user_id, presence: true

  def sold?
    # 売却状態を判定するロジック（将来の拡張用）
    false
  end
end
