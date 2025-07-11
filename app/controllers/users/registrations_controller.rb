# app/controllers/users/registrations_controller.rb
class Users::RegistrationsController < Devise::RegistrationsController
  before_action :configure_sign_up_params, only: [:create]

  def create
    build_resource(sign_up_params)

    resource.save
    yield resource if block_given?
    if resource.persisted?
      if resource.active_for_authentication?
        set_flash_message! :notice, :signed_up
        sign_up(resource_name, resource)
        respond_to do |format|
          format.html { respond_with resource, location: after_sign_up_path_for(resource) }
          format.json { render json: { success: true, redirect_path: after_sign_up_path_for(resource) } }
        end
      else
        set_flash_message! :notice, :"signed_up_but_#{resource.inactive_message}"
        expire_data_after_sign_in!
        respond_to do |format|
          format.html { respond_with resource, location: after_inactive_sign_up_path_for(resource) }
          format.json { render json: { success: true, redirect_path: after_inactive_sign_up_path_for(resource) } }
        end
      end
    else
      clean_up_passwords resource
      set_minimum_password_length
      respond_to do |format|
        format.html { respond_with resource }
        format.json { render json: { errors: resource.errors.messages, error: resource.errors.full_messages.to_sentence }, status: :unprocessable_entity }
      end
    end
  end

  protected

  def configure_sign_up_params
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name, :phone])
  end
end