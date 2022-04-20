class CreateSpins < ActiveRecord::Migration[6.1]
  def change
    create_table :spins do |t|
      t.integer :value
      t.integer :third
      t.integer :half
      t.string :parity
      t.string :color
      t.integer :row
    end
  end
end
