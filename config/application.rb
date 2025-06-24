require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module RailsEcSite
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.2

    # Please, add to the `ignore` list any other `lib` subdirectories that do
    # not contain `.rb` files, or that should not be reloaded or eager loaded.
    # Common ones are `templates`, `generators`, or `middleware`, for example.
    config.autoload_lib(ignore: %w[assets tasks])

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")
    # tailwindcss-rails gem が使用する Tailwind CSS の入力ファイルを指定。
    # デフォルトパスからの変更や、esbuild との連携のために明示的に設定。
    config.tailwindcss.input = "app/assets/stylesheets/application.tailwind.css"

    # Tailwind CSS のビルド成果物の出力先パスを指定。
    # esbuild が出力するアセットディレクトリ (app/assets/builds) に合わせ、最終的な application.css に Tailwind スタイルが統合される。
    config.tailwindcss.output = "app/assets/builds/application.css"
  end
end
