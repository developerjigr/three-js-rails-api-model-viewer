class CreateUserRings < ActiveRecord::Migration[5.2]
  def change
    create_table :user_rings do |t|
      t.integer :user_id
      t.integer :ring_id

      t.timestamps
    end
  end
end
