class CreateDragonVillageEggs < ActiveRecord::Migration[7.0]
  def change
    create_table :dragon_village_eggs do |t|
      t.string :share_link
      t.string :image
      t.integer :view_goal
      t.integer :view_count
      t.datetime :submission_time

      t.timestamps
    end
  end
end
