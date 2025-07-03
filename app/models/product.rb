class Product < ApplicationRecord
  belongs_to :user
  has_many :orders, dependent: :destroy
  has_many_attached :images  # この行を追加

  validates :name, presence: true
  validates :price, presence: true, numericality: { greater_than: 0 }
  validates :condition_id, presence: true
  validates :shipping_fee_payer_id, presence: true
  validates :prefecture_id, presence: true
  validates :shipping_day_id, presence: true
  validates :category_id, presence: true
  validates :user_id, presence: true
end
