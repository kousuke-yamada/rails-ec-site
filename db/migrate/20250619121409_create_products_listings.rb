class CreateProductsListings < ActiveRecord::Migration[7.2]
  def change
    create_table :products_listings do |t|
      t.string :name
      t.text :description
      t.integer :price
      t.string :category
      t.string :condition
      t.string :shipping_fee_payer
      t.string :preparation_day
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
