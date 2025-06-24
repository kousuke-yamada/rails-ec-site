class UsersController < ApplicationController
  def mypage
    @user_name = "田中 太郎"
    @user_rating = 4.8
    @review_count = 156
    
    @products = [
      { name: "iPhone 14 Pro 128GB", price: 98000, status: "出品中" },
      { name: "ユニクロ セーター", price: 2500, status: "売り切れ" },
      { name: "プログラミング入門書", price: 1800, status: "出品中" },
      { name: "Nintendo Switch ゲーム", price: 4200, status: "出品中" },
      { name: "Apple Watch Series 8", price: 35000, status: "売り切れ" },
      { name: "AirPods Pro", price: 18500, status: "出品中" }
    ]
  end
end
