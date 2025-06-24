# config/initializers/tailwindcss.rb

# tailwindcss-rails gem が使用する Tailwind CSS の入力ファイルを指定。
# デフォルトパスからの変更や、esbuild との連携のために明示的に設定。
Rails.application.config.tailwindcss.input = "app/assets/stylesheets/application.tailwind.css"

# Tailwind CSS のビルド成果物の出力先パスを指定。
# esbuild が出力するアセットディレクトリ (app/assets/builds) に合わせ、最終的な application.css に Tailwind スタイルが統合される。
Rails.application.config.tailwindcss.output = "app/assets/builds/application.css"
