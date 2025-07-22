# app/controllers/application_controller.rb
class ApplicationController < ActionController::Base
  allow_browser versions: :modern

  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name, :phone])
    devise_parameter_sanitizer.permit(:account_update, keys: [:name, :phone])
  end

  def after_sign_in_path_for(resource)
    home_top_path
  end

  def after_sign_up_path_for(resource)
    home_top_path
  end

  # Deviseのログアウト後のリダイレクト先を指定
  def after_sign_out_path_for(resource_or_scope)
    new_user_session_path # ログインページにリダイレクト
  end
end