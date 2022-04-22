# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
puts "🌱 Seeding spices..."

Item.create(name: "Dinner with the Founders", description: "Meal with the earn a-way founders!", price: 150, image: "./owners.png")
  Item.create(name: "Helicopter Over NYC", description: "Fly over NYC in a private helicopter!", price: 1000, image: "https://i.ytimg.com/vi/ekKAU1pYUik/maxresdefault.jpg")
  Item.create(name: "Knicks Tickets", description: "Go see the Knicks at MSG!", price: 750, image: "https://nypost.com/wp-content/uploads/sites/2/2021/05/knicks-tickets-1.jpg?quality=75&strip=all")
  
  Item.create(name: "Ride on the World's Biggest Dog", description: "Take a spin on the big doggo!", price: 400, image: "https://i.ytimg.com/vi/U5KLMeFK_UY/maxresdefault.jpg")
  Item.create(name: "Studio Session with Matty and Ax", description: "Go off!", price: 300, image: "https://lh3.googleusercontent.com/3v8yxup5lrN4QJ8vBWqT238U6MLoxpzkPNANleoHKDd7UaKaKBeA1nXAnwtvmLldS3JqMZwsak9UQL_r10Nf-3JK6CTq_t6z0FOr0z5pzr1WfRPltlS8jtFvescEizMqhPJ8DRb1bQ=w2400")
  Item.create(name: "1 on 1 Friday Night with Dean", description: "Enjoy a special night with Ring a Dean Dean!", price: 1000, image: "https://scontent-lga3-1.xx.fbcdn.net/v/t1.6435-9/107664237_10104706427952612_7184956103905944032_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=174925&_nc_ohc=Dg1tVEg6tfwAX9IjAXu&_nc_ht=scontent-lga3-1.xx&oh=00_AT_Oy1QpQ4IC12JKTuAS8Y0loVrUJurvzdrGsodHISocRA&oe=6288D7C4")
  Item.create(name: "Tickets to Nathan's Glizzy Eating Contest", description: "Joey Chestnut. What else do you need?", price: 175, image: "https://images.foxtv.com/static.fox5ny.com/www.fox5ny.com/content/uploads/2021/05/764/432/GettyImages-1153784175resized.jpg?ve=1&tl=1")
  Item.create(name: "AirBNB in the Hamptons", description: "Don't forget to pretend you're rich!", price: 1000, image: "https://imgs.6sqft.com/wp-content/uploads/2022/02/11135229/63-Duck-Pond-Lane-lead.jpg")
  Item.create(name: "Mystery!!", description: "Take a chance!", price: 450, image: "https://cdn.shopify.com/s/files/1/2598/1878/products/7a57d747c57d16b85b75353659f31939_1200x.jpg?v=1604004773")
  Item.create(name: "Meet & Greet Nicolas Cage", description: "Nicolas Cage will walk you through stealing the declaration of independence!", price: 30, image: "https://mn2s-content.s3.eu-west-2.amazonaws.com/wp-content/uploads/2019/12/18150535/Nicolas-Cage-MN2S.png")
  Item.create(name: "Skydive off Empire State", description: "Take a DIVE!", price: 350, image: "https://www.attractiontickets.com/sites/default/files/styles/product_tablet_plus/public/2019-06/empire_state_building_tickets.jpg?itok=ySN4JWWF")
  Item.create(name: "Back and Bi's with Sam", description: "", price: 222, image: "https://lh3.googleusercontent.com/CC8-R5FBOCIG8UUTRHc2CLPw8LVaOpgaRn-OkUSPJ6MuwFZ-y8wZme5LjPHPSL0IU5OZSR92HRo-gwKAsqg-y7EvG93RrJJogtasLE0zHpsfHg3hg8PjcgQxNKiw2Gj58dcbKSD-XQ=w600-h315-p-k")
  Item.create(name: "Get in the Ring with Hasbulla", description: "Small man with a mighty uppercut!", price: 825, image: "https://manofmany.com/wp-content/uploads/2021/06/Hasbulla-Magomedov-4-1200x800.jpg")
  Item.create(name: "Year of Scientology Membership", description: "Find that spirituality you've been missing!", price: 200, image: "https://img.thedailybeast.com/image/upload/v1492108518/articles/2016/10/26/tom-cruise-breaks-silence-on-scientology-it-s-a-beautiful-religion/161026-zimmerman-cruise-scientology-tease2_feyagf.jpg")
  Item.create(name: "Cooking Lesson with Guy Fieri", description: "Meet the Guy!", price: 900, image: "https://media.gq.com/photos/59dfc6d9d61cb80476584e18/master/pass/guy-fieiri-flame.jpg")
  Item.create(name: "$100 Gift Card AMEX", description: "Do whatever you want!", price: 100, image: "https://milestomemories.com/wp-content/uploads/2015/08/amexgc.png")
  Item.create(name: "Win a Cool T shirt", description: "", price: 75, image: "https://ctl.s6img.com/society6/img/T6p0xOOhGIhyD4mEsraMTZwF7Tc/w_1500/tshirts/men/greybg/white/~artwork,bg_FFFFFFFF,fw_3300,fh_5100,fx_12,fy_-315,iw_3300,ih_5100/s6-original-art-uploads/society6/uploads/misc/81615eb1a4064bfbaf1a217b662783d2/~~/mambo-number-five-tshirts.jpg")
  Item.create(name: "Wine Tasting in Williamsburg", description: "Vino!", price: 420, image: "https://bkwinery.com/content/uploads/2015/05/091812_0058.jpg")


values = (0..36).to_a

def getThird(value)
  if value == 0
    "no"
  elsif value <= 12
    "doz1"
  elsif value <= 24
    "doz2"
  else
    "doz3"
  end
end

def getHalf(value)
  if value == 0
    "no"
  elsif value <=18
    "half1"
  else
    "half2"
  end
end

def getParity(value)
  if value == 0
    "no"
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
    "no"
  elsif (value + 2) % 3 == 0
    "row1"
  elsif (value + 1) % 3 == 0
    "row2"
  else
    "row3"
  end
end


values.each do |value|
  Spin.create(
    value: value.to_s,
    third: getThird(value),
    half: getHalf(value),
    parity: getParity(value),
    color: getColor(value),
    row: getRow(value)
  )
end

puts "✅ Done seeding!"