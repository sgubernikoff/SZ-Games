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

values = (0..36).to_a

def getThird(value)
  if value == 0
    0
  elsif value <= 12
    1
  elsif value <= 24
    2
  else
    3
  end
end

def getHalf(value)
  if value == 0
    0
  elsif value <=18
    1
  else
    2
  end
end

def getParity(value)
  if value == 0
    "zero"
  elsif value.even?
    "even"
  else
    "odd"
  end
end

def getColor(value)
  red_nums = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]
  if value == 0
    "green"
  elsif red_nums.include?(value)
    "red"
  else
    "black"
  end
end

def getRow(value)
  if value == 0
    0
  elsif (value + 2) % 3 == 0
    1
  elsif (value + 1) % 3 == 0
    2
  else
    3
  end
end


values.each do |value|
  Spin.create(
    value: value,
    third: getThird(value),
    half: getHalf(value),
    parity: getParity(value),
    color: getColor(value),
    row: getRow(value)
  )
end

puts "✅ Done seeding!"