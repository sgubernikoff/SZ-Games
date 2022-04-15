# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
puts "🌱 Seeding spices..."

10.times do
  Item.create(
    name: Faker::Commerce.product_name,
    description: Faker::Commerce.color,
    price: rand(20..200),
    image: Faker::Avatar.image
  )
end

puts "✅ Done seeding!"