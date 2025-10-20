class UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :set_user, only: [ :update_profile, :update_password, :profile ]

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

  def profile
    @user = current_user
  end

  def update_profile
    # デバッグ用ログ追加
    Rails.logger.info "=== UPDATE PROFILE DEBUG ==="
    Rails.logger.info "Current user: #{current_user&.id}"
    Rails.logger.info "Params: #{params.inspect}"
    Rails.logger.info "User params: #{user_params.inspect}"

    # 電話番号のクリーニング
    if user_params[:phone].present?
      cleaned_phone = user_params[:phone].gsub(/[-\s]/, "")
      params[:user][:phone] = cleaned_phone
      Rails.logger.info "Cleaned phone: #{cleaned_phone}"
    end

    respond_to do |format|
      if @user.update(user_params)
        format.json {
          render json: {
            success: true,
            message: "情報が正常に更新されました。",
            user: {
              name: @user.name,
              email: @user.email,
              phone: @user.phone,
              gender: @user.gender,
              home_address: @user.home_address,
              zip_code: @user.zip_code
            }
          }
        }
      else
        Rails.logger.error "Update failed: #{@user.errors.full_messages}"
        format.json {
          render json: {
            success: false,
            message: "更新に失敗しました。",
            errors: @user.errors.full_messages
          }, status: 422
        }
      end
    end
  rescue => e
    Rails.logger.error "Exception: #{e.message}"
    Rails.logger.error e.backtrace.join("\n")
    respond_to do |format|
      format.json {
        render json: {
          success: false,
          message: "エラーが発生しました: #{e.message}"
        }, status: 500
      }
    end
  end

  def update_password
    respond_to do |format|
      if @user.valid_password?(params[:current_password])
        if @user.update(password: params[:new_password], password_confirmation: params[:password_confirmation])
          # パスワード更新後は再ログインが必要
          bypass_sign_in(@user)
          format.json {
            render json: {
              success: true,
              message: "パスワードが正常に変更されました。"
            }
          }
        else
          format.json {
            render json: {
              success: false,
              message: "パスワードの更新に失敗しました。",
              errors: @user.errors.full_messages
            }, status: 422
          }
        end
      else
        format.json {
          render json: {
            success: false,
            message: "現在のパスワードが正しくありません。"
          }, status: 422
        }
      end
    end
  end

  private

  def set_user
    @user = current_user
  end

  def user_params
    params.require(:user).permit(:name, :email, :phone, :gender, :home_address, :zip_code)
  end
end
