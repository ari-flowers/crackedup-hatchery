class DragonVillageEgg < ApplicationRecord
  validates :share_link, presence: true, format: { with: URI::regexp(%w[http https]) }
  validates :view_goal, presence: true, numericality: { only_integer: true, greater_than: 0 }
  validates :view_count, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
end
