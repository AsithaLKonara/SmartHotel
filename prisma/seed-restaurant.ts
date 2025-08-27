import { PrismaClient, FoodCategory } from '@prisma/client'

const prisma = new PrismaClient()

const sampleMenuItems = [
  // Breakfast
  {
    name: 'Continental Breakfast',
    description: 'Fresh croissants, butter, jam, and coffee or tea',
    price: 12.99,
    category: 'BREAKFAST' as FoodCategory,
    available: true,
    preparationTime: 10
  },
  {
    name: 'American Breakfast',
    description: 'Eggs, bacon, toast, and hash browns',
    price: 15.99,
    category: 'BREAKFAST' as FoodCategory,
    available: true,
    preparationTime: 15
  },
  {
    name: 'Pancakes with Maple Syrup',
    description: 'Fluffy pancakes served with real maple syrup and butter',
    price: 11.99,
    category: 'BREAKFAST' as FoodCategory,
    available: true,
    preparationTime: 12
  },

  // Lunch
  {
    name: 'Caesar Salad',
    description: 'Fresh romaine lettuce, parmesan cheese, croutons with caesar dressing',
    price: 14.99,
    category: 'LUNCH' as FoodCategory,
    available: true,
    preparationTime: 8
  },
  {
    name: 'Grilled Chicken Sandwich',
    description: 'Grilled chicken breast with lettuce, tomato, and mayo on artisan bread',
    price: 16.99,
    category: 'LUNCH' as FoodCategory,
    available: true,
    preparationTime: 15
  },
  {
    name: 'Pasta Carbonara',
    description: 'Spaghetti with creamy sauce, bacon, and parmesan cheese',
    price: 18.99,
    category: 'LUNCH' as FoodCategory,
    available: true,
    preparationTime: 20
  },

  // Dinner
  {
    name: 'Grilled Salmon',
    description: 'Fresh salmon fillet with seasonal vegetables and rice',
    price: 28.99,
    category: 'DINNER' as FoodCategory,
    available: true,
    preparationTime: 25
  },
  {
    name: 'Beef Tenderloin',
    description: '8oz tenderloin with mashed potatoes and asparagus',
    price: 34.99,
    category: 'DINNER' as FoodCategory,
    available: true,
    preparationTime: 30
  },
  {
    name: 'Vegetarian Risotto',
    description: 'Creamy risotto with mushrooms, parmesan, and herbs',
    price: 22.99,
    category: 'DINNER' as FoodCategory,
    available: true,
    preparationTime: 25
  },

  // Beverages
  {
    name: 'Fresh Orange Juice',
    description: 'Freshly squeezed orange juice',
    price: 4.99,
    category: 'BEVERAGES' as FoodCategory,
    available: true,
    preparationTime: 2
  },
  {
    name: 'Iced Tea',
    description: 'Refreshing iced tea with lemon',
    price: 3.99,
    category: 'BEVERAGES' as FoodCategory,
    available: true,
    preparationTime: 1
  },
  {
    name: 'Espresso',
    description: 'Single shot of premium espresso',
    price: 3.49,
    category: 'BEVERAGES' as FoodCategory,
    available: true,
    preparationTime: 2
  },

  // Desserts
  {
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with molten center, served with vanilla ice cream',
    price: 12.99,
    category: 'DESSERTS' as FoodCategory,
    available: true,
    preparationTime: 8
  },
  {
    name: 'New York Cheesecake',
    description: 'Classic cheesecake with berry compote',
    price: 9.99,
    category: 'DESSERTS' as FoodCategory,
    available: true,
    preparationTime: 5
  },

  // Snacks
  {
    name: 'French Fries',
    description: 'Crispy golden fries with sea salt',
    price: 6.99,
    category: 'SNACKS' as FoodCategory,
    available: true,
    preparationTime: 8
  },
  {
    name: 'Onion Rings',
    description: 'Beer-battered onion rings with ranch dipping sauce',
    price: 7.99,
    category: 'SNACKS' as FoodCategory,
    available: true,
    preparationTime: 10
  },

  // Appetizers
  {
    name: 'Bruschetta',
    description: 'Toasted bread topped with tomatoes, garlic, and fresh basil',
    price: 8.99,
    category: 'APPETIZERS' as FoodCategory,
    available: true,
    preparationTime: 6
  },
  {
    name: 'Mozzarella Sticks',
    description: 'Breaded mozzarella sticks with marinara sauce',
    price: 9.99,
    category: 'APPETIZERS' as FoodCategory,
    available: true,
    preparationTime: 8
  },

  // Main Course
  {
    name: 'Chicken Marsala',
    description: 'Chicken breast in marsala wine sauce with mushrooms',
    price: 24.99,
    category: 'MAIN_COURSE' as FoodCategory,
    available: true,
    preparationTime: 25
  },
  {
    name: 'Shrimp Scampi',
    description: 'Jumbo shrimp in garlic butter sauce with linguine',
    price: 26.99,
    category: 'MAIN_COURSE' as FoodCategory,
    available: true,
    preparationTime: 20
  },

  // Sides
  {
    name: 'Garlic Mashed Potatoes',
    description: 'Creamy mashed potatoes with roasted garlic',
    price: 6.99,
    category: 'SIDES' as FoodCategory,
    available: true,
    preparationTime: 12
  },
  {
    name: 'Steamed Vegetables',
    description: 'Seasonal vegetables steamed to perfection',
    price: 5.99,
    category: 'SIDES' as FoodCategory,
    available: true,
    preparationTime: 8
  }
]

async function main() {
  console.log('🌱 Seeding restaurant menu...')

  // Clear existing menu items
  await prisma.orderItem.deleteMany()
  await prisma.foodOrder.deleteMany()
  await prisma.foodMenu.deleteMany()

  // Create sample menu items
  for (const item of sampleMenuItems) {
    await prisma.foodMenu.create({
      data: item
    })
  }

  console.log(`✅ Created ${sampleMenuItems.length} menu items`)
  console.log('🎉 Restaurant seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding restaurant data:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
