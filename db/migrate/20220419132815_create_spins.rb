class CreateSpins < ActiveRecord::Migration[6.1]
  def change
    create_table :spins do |t|
      t.string :value
      t.string :third
      t.string :half
      t.string :parity
      t.string :color
      t.string :row
    end
  end
end
