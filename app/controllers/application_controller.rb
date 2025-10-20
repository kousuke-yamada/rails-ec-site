# app/controllers/application_controller.rb
class ApplicationController < ActionController::Base
  allow_browser versions: :modern

  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [ :name, :phone ])
    devise_parameter_sanitizer.permit(:account_update, keys: [ :name, :phone ])
  end

  def after_sign_in_path_for(resource)
    root_path
  end

  def after_sign_up_path_for(resource)
    root_path
  end

  # Deviseのログアウト後のリダイレクト先を指定
  def after_sign_out_path_for(resource_or_scope)
    new_user_session_path # ログインページにリダイレクト
  end

  def listing
    # Ensure Settings are properly initialized before rendering the view
    ensure_settings_initialized
  end


  def ensure_settings_initialized
    # Log what Settings contains to debug
    Rails.logger.info "Settings.conditions: #{Settings.conditions.inspect}"
    Rails.logger.info "Settings.product: #{Settings.product.inspect}"

    # You could also set default values here if needed
    Settings.conditions ||= {}
    Settings.product.categories ||= {} if Settings.product.respond_to?(:categories)
    Settings.product.shipping_fee_payers ||= {} if Settings.product.respond_to?(:shipping_fee_payers)
    Settings.product.shipping_days ||= {} if Settings.product.respond_to?(:shipping_days)
    Settings.prefectures ||= {}
  end
end
