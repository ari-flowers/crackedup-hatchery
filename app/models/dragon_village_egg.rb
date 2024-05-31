class DragonVillageEgg < ApplicationRecord
  before_save :set_defaults

  validates :share_link, presence: true, format: { with: URI::regexp(%w[http https]) }
  validates :view_goal, presence: true, numericality: { only_integer: true, greater_than: 0 }
  validates :view_count, numericality: { only_integer: true, greater_than_or_equal_to: 0 }

  def self.cleanup_old_entries
    where('created_at < ?', 3.days.ago).destroy_all
  end

  private

  def set_defaults
    self.image ||= '/images/default_redwyvern.png' # Set your default image URL, change later
    self.submission_time ||= Time.current
  end
end
