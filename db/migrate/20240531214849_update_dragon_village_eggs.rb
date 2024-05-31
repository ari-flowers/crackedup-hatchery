class UpdateDragonVillageEggs < ActiveRecord::Migration[7.0]
  def change
    change_column :dragon_village_eggs, :share_link, :string, null: false
    change_column :dragon_village_eggs, :view_goal, :integer, null: false
    change_column :dragon_village_eggs, :view_count, :integer, default: 0, null: false
    add_index :dragon_village_eggs, :share_link, unique: true
  end
end
