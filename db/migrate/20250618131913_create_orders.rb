class CreateOrders < ActiveRecord::Migration[7.2]
  def change
    create_table :orders do |t|
      t.references :user, null: false, foreign_key: true
      t.references :product, null: false, foreign_key: true
      t.string :status
      t.string :shipping_postal_code
      t.text :shipping_address
      t.string :shipping_building
      t.string :shipping_recipient_name
      t.string :shipping_address_type
      t.string :payment_method
      t.string :payment_status
      t.integer :item_price
      t.integer :shipping_fee
      t.string :coupon_code
      t.integer :coupon_discount
      t.integer :points_used
      t.integer :point_discount
      t.integer :total_amount

      t.timestamps
    end
  end
end
