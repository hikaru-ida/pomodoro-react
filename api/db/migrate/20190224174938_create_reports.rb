class CreateReports < ActiveRecord::Migration[5.2]
  def change
    create_table :reports do |t|
      t.bigint :spend_seconds

      t.timestamps
    end
  end
end
