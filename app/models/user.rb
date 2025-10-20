# app/models/user.rb
class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  # バリデーション
  validates :name, presence: true, length: { maximum: 50 }
  validates :phone, format: { with: /\A\d{10,11}\z/, message: "正しい電話番号を入力してください（ハイフンなし）" }, allow_blank: true
  validates :gender, inclusion: { in: [ "male", "female", "other" ], message: "有効な性別を選択してください" }, allow_blank: true
  validates :zip_code, format: { with: /\A\d{3}-?\d{4}\z/, message: "正しい郵便番号を入力してください" }, allow_blank: true

  # 性別の日本語表示用メソッド
  def gender_display
    case gender
    when "male"
      "男性"
    when "female"
      "女性"
    when "other"
      "その他"
    else
      "未設定"
    end
  end

  # 電話番号のフォーマット用メソッド
  def formatted_phone
    return "未設定" if phone.blank?

    # ハイフンを除去してから処理
    clean_phone = phone.gsub(/[-\s]/, "")

    case clean_phone.length
    when 10
      "#{clean_phone[0..2]}-#{clean_phone[3..6]}-#{clean_phone[7..9]}"
    when 11
      "#{clean_phone[0..2]}-#{clean_phone[3..6]}-#{clean_phone[7..10]}"
    else
      phone
    end
  end

  # 電話番号の生の値を取得（編集用）
  def raw_phone
    return "" if phone.blank?
    phone.gsub(/[-\s]/, "")
  end

  # 住所の表示用メソッド
  def formatted_address
    return "未設定" if home_address.blank?

    if zip_code.present?
      "〒#{zip_code} #{home_address}"
    else
      home_address
    end
  end

  # Product との関連を追加（既存）
  has_many :products, dependent: :destroy
end
