class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :username
      t.string :dc_user_id
      t.string :access_token
      t.string :refresh_token

      t.timestamps
    end
  end
end
