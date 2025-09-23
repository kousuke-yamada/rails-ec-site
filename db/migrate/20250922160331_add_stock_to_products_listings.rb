class AddStockToProductsListings < ActiveRecord::Migration[7.2]
  def change
    add_column :products_listings, :stock, :integer
  end
end
