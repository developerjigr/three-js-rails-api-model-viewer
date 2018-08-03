class CreateRings < ActiveRecord::Migration[5.2]
  def change
    create_table :rings do |t|
      t.string :name
      t.string :description
      t.string :model
      t.string :image_url
      t.string :model_url

      t.timestamps
    end
  end
end
