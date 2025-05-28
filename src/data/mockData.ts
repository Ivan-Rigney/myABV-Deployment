export interface Beer {
  id: number
  name: string
  brewery: string
  style: string
  abv: number
  ibu: number
  rating?: number
  imageUrl?: string
  catalogEntries: number
}

export interface Brewery {
  id: number
  name: string
  location: string
  rating?: number
  imageUrl?: string
  hasKitchen: boolean
  priceRange: 1 | 2 | 3
  beerCount: number
  visitCount: number
}

export interface Activity {
  id: number
  userId: number
  userName: string
  userAvatar?: string
  type: 'left a review for' | 'visited' | 'drank'
  targetType: 'beer' | 'brewery'
  targetId: number
  targetName: string
  date: string
  rating?: number
}

export const mockBeers: Beer[] = [
  {
    id: 1,
    name: 'Heady Topper',
    brewery: 'The Alchemist',
    style: 'Double IPA',
    abv: 8.0,
    ibu: 100,
    rating: 4.5,
    imageUrl:
      'https://images.pexels.com/photos/1552630/pexels-photo-1552630.jpeg',
    catalogEntries: 15243,
  },
  {
    id: 2,
    name: 'Pliny the Elder',
    brewery: 'Russian River',
    style: 'Double IPA',
    abv: 8.0,
    ibu: 100,
    rating: 4.7,
    imageUrl:
      'https://images.pexels.com/photos/1089930/pexels-photo-1089930.jpeg',
    catalogEntries: 18456,
  },
  {
    id: 3,
    name: 'Guinness Draught',
    brewery: 'Guinness',
    style: 'Irish Dry Stout',
    abv: 4.2,
    ibu: 45,
    rating: 4.3,
    imageUrl:
      'https://images.pexels.com/photos/2396220/pexels-photo-2396220.jpeg',
    catalogEntries: 25678,
  },
  {
    id: 4,
    name: 'Weihenstephaner Hefeweissbier',
    brewery: 'Weihenstephaner',
    style: 'Hefeweizen',
    abv: 5.4,
    ibu: 14,
    rating: 4.6,
    imageUrl:
      'https://images.pexels.com/photos/5530312/pexels-photo-5530312.jpeg',
    catalogEntries: 12345,
  },
  {
    id: 5,
    name: 'Rochefort 10',
    brewery: 'Brasserie Rochefort',
    style: 'Quadrupel',
    abv: 11.3,
    ibu: 27,
    rating: 4.8,
    imageUrl:
      'https://images.pexels.com/photos/1267700/pexels-photo-1267700.jpeg',
    catalogEntries: 9876,
  },
  {
    id: 6,
    name: 'Pilsner Urquell',
    brewery: 'Pilsner Urquell',
    style: 'Czech Pilsner',
    abv: 4.4,
    ibu: 40,
    rating: 4.2,
    imageUrl:
      'https://images.pexels.com/photos/1269025/pexels-photo-1269025.jpeg',
    catalogEntries: 21345,
  },
  {
    id: 7,
    name: 'Founders KBS',
    brewery: 'Founders Brewing Co.',
    style: 'Imperial Stout',
    abv: 12.3,
    ibu: 70,
    rating: 4.6,
    imageUrl:
      'https://images.pexels.com/photos/1267696/pexels-photo-1267696.jpeg',
    catalogEntries: 8765,
  },
  {
    id: 8,
    name: 'Duvel',
    brewery: 'Duvel Moortgat',
    style: 'Belgian Strong Golden Ale',
    abv: 8.5,
    ibu: 32,
    rating: 4.4,
    imageUrl:
      'https://images.pexels.com/photos/1269043/pexels-photo-1269043.jpeg',
    catalogEntries: 16543,
  },
  {
    id: 9,
    name: 'Sierra Nevada Pale Ale',
    brewery: 'Sierra Nevada',
    style: 'American Pale Ale',
    abv: 5.6,
    ibu: 38,
    rating: 4.1,
    imageUrl:
      'https://images.pexels.com/photos/1269034/pexels-photo-1269034.jpeg',
    catalogEntries: 28765,
  },
  {
    id: 10,
    name: 'Chimay Blue',
    brewery: 'Chimay',
    style: 'Belgian Strong Dark Ale',
    abv: 9.0,
    ibu: 30,
    rating: 4.5,
    imageUrl:
      'https://images.pexels.com/photos/1269027/pexels-photo-1269027.jpeg',
    catalogEntries: 14532,
  },
  {
    id: 11,
    name: 'Westmalle Tripel',
    brewery: 'Westmalle',
    style: 'Tripel',
    abv: 9.5,
    ibu: 36,
    rating: 4.7,
    imageUrl:
      'https://images.pexels.com/photos/1269032/pexels-photo-1269032.jpeg',
    catalogEntries: 11234,
  },
  {
    id: 12,
    name: 'Anchor Steam',
    brewery: 'Anchor Brewing',
    style: 'California Common',
    abv: 4.9,
    ibu: 35,
    rating: 4.0,
    imageUrl:
      'https://images.pexels.com/photos/1269036/pexels-photo-1269036.jpeg',
    catalogEntries: 19876,
  },
  {
    id: 13,
    name: 'La Fin Du Monde',
    brewery: 'Unibroue',
    style: 'Tripel',
    abv: 9.0,
    ibu: 19,
    rating: 4.5,
    imageUrl:
      'https://images.pexels.com/photos/1269039/pexels-photo-1269039.jpeg',
    catalogEntries: 7654,
  },
  {
    id: 14,
    name: "Samuel Smith's Oatmeal Stout",
    brewery: 'Samuel Smith',
    style: 'Oatmeal Stout',
    abv: 5.0,
    ibu: 32,
    rating: 4.3,
    imageUrl:
      'https://images.pexels.com/photos/1269042/pexels-photo-1269042.jpeg',
    catalogEntries: 13245,
  },
  {
    id: 15,
    name: 'Orval',
    brewery: 'Orval',
    style: 'Belgian Pale Ale',
    abv: 6.2,
    ibu: 36,
    rating: 4.6,
    imageUrl: 'https://free-images.com/or/ce5d/beer_beer_glass_wheat.jpg',
    catalogEntries: 9876,
  },
  {
    id: 16,
    name: 'Saison Dupont',
    brewery: 'Brasserie Dupont',
    style: 'Saison',
    abv: 6.5,
    ibu: 32,
    rating: 4.4,
    imageUrl: 'https://free-images.com/or/d98e/glass_beer_foam_322178.jpg',
    catalogEntries: 8765,
  },
  {
    id: 17,
    name: 'Two Hearted Ale',
    brewery: "Bell's Brewery",
    style: 'American IPA',
    abv: 7.0,
    ibu: 55,
    rating: 4.5,
    imageUrl: 'https://free-images.com/or/41dc/dark_beer_stout_glass.jpg',
    catalogEntries: 22345,
  },
  {
    id: 18,
    name: 'Brooklyn Black Chocolate Stout',
    brewery: 'Brooklyn Brewery',
    style: 'Imperial Stout',
    abv: 10.0,
    ibu: 60,
    rating: 4.3,
    imageUrl:
      'https://images.pexels.com/photos/1269054/pexels-photo-1269054.jpeg',
    catalogEntries: 11234,
  },
  {
    id: 19,
    name: 'Aventinus',
    brewery: 'Schneider Weisse',
    style: 'Weizenbock',
    abv: 8.2,
    ibu: 16,
    rating: 4.5,
    imageUrl:
      'https://free-images.com/or/ab53/beer_glass_refreshment_thirst.jpg',
    catalogEntries: 7654,
  },
  {
    id: 20,
    name: 'St. Bernardus Abt 12',
    brewery: 'St. Bernardus',
    style: 'Quadrupel',
    abv: 10.0,
    ibu: 22,
    rating: 4.7,
    imageUrl: 'https://free-images.com/or/e6c4/glasses_beer_beer_glasses.jpg',
    catalogEntries: 15678,
  },
  {
    id: 21,
    name: 'Delirium Tremens',
    brewery: 'Huyghe',
    style: 'Belgian Strong Pale Ale',
    abv: 8.5,
    ibu: 26,
    rating: 4.4,
    imageUrl:
      'https://free-images.com/or/dc95/beer_glass_alcoholic_alcohol.jpg',
    catalogEntries: 19876,
  },
  {
    id: 22,
    name: 'Celebrator',
    brewery: 'Ayinger',
    style: 'Doppelbock',
    abv: 6.7,
    ibu: 24,
    rating: 4.5,
    imageUrl: 'https://free-images.com/or/6a79/beer_beer_glass_drink.jpg',
    catalogEntries: 12345,
  },
  {
    id: 23,
    name: 'Old Rasputin',
    brewery: 'North Coast',
    style: 'Russian Imperial Stout',
    abv: 9.0,
    ibu: 75,
    rating: 4.4,
    imageUrl: 'https://free-images.com/or/f352/beer_beer_mug_sat.jpg',
    catalogEntries: 16789,
  },
  {
    id: 24,
    name: 'Tank 7',
    brewery: 'Boulevard',
    style: 'Saison',
    abv: 8.5,
    ibu: 38,
    rating: 4.3,
    imageUrl:
      'https://images.pexels.com/photos/1269072/pexels-photo-1269072.jpeg',
    catalogEntries: 9876,
  },
  {
    id: 25,
    name: "Dragon's Milk",
    brewery: 'New Holland',
    style: 'Bourbon Barrel Stout',
    abv: 11.0,
    ibu: 31,
    rating: 4.2,
    imageUrl: 'https://free-images.com/or/4ada/glass_beer_beer_drink.jpg',
    catalogEntries: 13456,
  },
]

export const mockBreweries: Brewery[] = [
  {
    id: 1,
    name: 'The Alchemist',
    location: 'Stowe, VT',
    rating: 4.8,
    imageUrl:
      'https://images.pexels.com/photos/159291/beer-machine-alcohol-brewery-159291.jpeg',
    hasKitchen: true,
    priceRange: 2,
    beerCount: 8,
    visitCount: 15243,
  },
  {
    id: 2,
    name: 'Russian River',
    location: 'Santa Rosa, CA',
    rating: 4.9,
    imageUrl: 'https://free-images.com/or/f742/beer_tap_brewery_bottle.jpg',
    hasKitchen: true,
    priceRange: 3,
    beerCount: 21,
    visitCount: 28456,
  },
  {
    id: 3,
    name: 'Founders Brewing Co.',
    location: 'Grand Rapids, MI',
    rating: 4.7,
    imageUrl:
      'https://images.pexels.com/photos/3566187/pexels-photo-3566187.jpeg',
    hasKitchen: true,
    priceRange: 2,
    beerCount: 15,
    visitCount: 19876,
  },
  {
    id: 4,
    name: 'Sierra Nevada',
    location: 'Chico, CA',
    rating: 4.6,
    imageUrl:
      'https://images.pexels.com/photos/1267329/pexels-photo-1267329.jpeg',
    hasKitchen: true,
    priceRange: 2,
    beerCount: 18,
    visitCount: 25678,
  },
  {
    id: 5,
    name: "Bell's Brewery",
    location: 'Kalamazoo, MI',
    rating: 4.7,
    imageUrl:
      'https://images.pexels.com/photos/1267351/pexels-photo-1267351.jpeg',
    hasKitchen: true,
    priceRange: 2,
    beerCount: 12,
    visitCount: 17654,
  },
  {
    id: 6,
    name: 'Deschutes Brewery',
    location: 'Bend, OR',
    rating: 4.5,
    imageUrl:
      'https://images.pexels.com/photos/1267360/pexels-photo-1267360.jpeg',
    hasKitchen: true,
    priceRange: 2,
    beerCount: 19,
    visitCount: 21345,
  },
  {
    id: 7,
    name: 'Dogfish Head',
    location: 'Milton, DE',
    rating: 4.6,
    imageUrl:
      'https://images.pexels.com/photos/1267368/pexels-photo-1267368.jpeg',
    hasKitchen: false,
    priceRange: 3,
    beerCount: 25,
    visitCount: 23456,
  },
  {
    id: 8,
    name: 'Stone Brewing',
    location: 'Escondido, CA',
    rating: 4.5,
    imageUrl: 'https://free-images.com/or/d6fc/l_c3_b6wenbr_c3_2.jpg',
    hasKitchen: true,
    priceRange: 2,
    beerCount: 20,
    visitCount: 19876,
  },
  {
    id: 9,
    name: 'Firestone Walker',
    location: 'Paso Robles, CA',
    rating: 4.8,
    imageUrl:
      'https://free-images.com/or/b0f0/brewery_plant_brewery_factory_1.jpg',
    hasKitchen: true,
    priceRange: 3,
    beerCount: 23,
    visitCount: 24567,
  },
  {
    id: 10,
    name: 'Brooklyn Brewery',
    location: 'Brooklyn, NY',
    rating: 4.4,
    imageUrl: 'https://free-images.com/or/a904/shield_board_inn_brewery.jpg',
    hasKitchen: false,
    priceRange: 2,
    beerCount: 16,
    visitCount: 18765,
  },
  {
    id: 11,
    name: 'Trillium Brewing',
    location: 'Boston, MA',
    rating: 4.8,
    imageUrl:
      'https://images.pexels.com/photos/1267397/pexels-photo-1267397.jpeg',
    hasKitchen: true,
    priceRange: 3,
    beerCount: 28,
    visitCount: 26789,
  },
  {
    id: 12,
    name: 'Tree House Brewing',
    location: 'Charlton, MA',
    rating: 4.9,
    imageUrl:
      'https://images.pexels.com/photos/1267400/pexels-photo-1267400.jpeg',
    hasKitchen: false,
    priceRange: 2,
    beerCount: 15,
    visitCount: 31245,
  },
  {
    id: 13,
    name: 'Hill Farmstead',
    location: 'Greensboro Bend, VT',
    rating: 4.9,
    imageUrl:
      'https://free-images.com/or/2827/brewery_zum_ritter_schwetzingen.jpg',
    hasKitchen: false,
    priceRange: 3,
    beerCount: 12,
    visitCount: 15678,
  },
  {
    id: 14,
    name: 'Jester King',
    location: 'Austin, TX',
    rating: 4.7,
    imageUrl:
      'https://images.pexels.com/photos/1267406/pexels-photo-1267406.jpeg',
    hasKitchen: true,
    priceRange: 2,
    beerCount: 18,
    visitCount: 22345,
  },
  {
    id: 15,
    name: 'Side Project',
    location: 'St. Louis, MO',
    rating: 4.8,
    imageUrl:
      'https://images.pexels.com/photos/1267409/pexels-photo-1267409.jpeg',
    hasKitchen: false,
    priceRange: 3,
    beerCount: 14,
    visitCount: 17890,
  },
  {
    id: 16,
    name: 'Modern Times',
    location: 'San Diego, CA',
    rating: 4.6,
    imageUrl:
      'https://images.pexels.com/photos/1267412/pexels-photo-1267412.jpeg',
    hasKitchen: true,
    priceRange: 2,
    beerCount: 22,
    visitCount: 24567,
  },
  {
    id: 17,
    name: 'Other Half',
    location: 'Brooklyn, NY',
    rating: 4.7,
    imageUrl:
      'https://free-images.com/or/f7e7/kelheim_niederbayern_brewery_679760.jpg',
    hasKitchen: false,
    priceRange: 3,
    beerCount: 19,
    visitCount: 21345,
  },
  {
    id: 18,
    name: 'Toppling Goliath',
    location: 'Decorah, IA',
    rating: 4.8,
    imageUrl:
      'https://images.pexels.com/photos/1267418/pexels-photo-1267418.jpeg',
    hasKitchen: true,
    priceRange: 2,
    beerCount: 16,
    visitCount: 18976,
  },
  {
    id: 19,
    name: 'Tired Hands',
    location: 'Ardmore, PA',
    rating: 4.6,
    imageUrl:
      'https://free-images.com/or/66f0/kuchelbauer_abensberg_tower_brewery.jpg',
    hasKitchen: true,
    priceRange: 2,
    beerCount: 21,
    visitCount: 19876,
  },
  {
    id: 20,
    name: 'Monkish',
    location: 'Torrance, CA',
    rating: 4.7,
    imageUrl: 'https://free-images.com/or/aad7/brewery_tychy_vats_vat_3.jpg',
    hasKitchen: false,
    priceRange: 3,
    beerCount: 17,
    visitCount: 23456,
  },
]

// Currently some activities ID & Name in this do not match because it is AI generated.
export const mockActivities: Activity[] = [
  {
    id: 1,
    userId: 1,
    userName: 'John Doe',
    userAvatar:
      'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
    type: 'left a review for',
    targetType: 'beer',
    targetId: 1,
    targetName: 'Heady Topper',
    date: '2024-01-20',
    rating: 4.5,
  },
  {
    id: 2,
    userId: 2,
    userName: 'Jane Smith',
    userAvatar:
      'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    type: 'visited',
    targetType: 'brewery',
    targetId: 1,
    targetName: 'The Alchemist',
    date: '2024-01-19',
  },
  {
    id: 3,
    userId: 3,
    userName: 'Mike Johnson',
    userAvatar:
      'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
    type: 'drank',
    targetType: 'beer',
    targetId: 5,
    targetName: 'Rochefort 10',
    date: '2024-01-18',
    rating: 4.8,
  },
  {
    id: 4,
    userId: 4,
    userName: 'Sarah Wilson',
    userAvatar:
      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    type: 'left a review for',
    targetType: 'brewery',
    targetId: 3,
    targetName: 'Founders Brewing Co.',
    date: '2024-01-17',
    rating: 4.7,
  },
  {
    id: 5,
    userId: 5,
    userName: 'Liam Brown',
    userAvatar:
      'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg',
    type: 'drank',
    targetType: 'beer',
    targetId: 7,
    targetName: 'Pliny the Elder',
    date: '2024-01-16',
    rating: 5.0,
  },
  {
    id: 6,
    userId: 6,
    userName: 'Olivia Martinez',
    userAvatar:
      'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    type: 'visited',
    targetType: 'brewery',
    targetId: 2,
    targetName: 'Tree House Brewing Company',
    date: '2024-01-15',
  },
  {
    id: 7,
    userId: 1,
    userName: 'John Doe',
    userAvatar:
      'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
    type: 'left a review for',
    targetType: 'brewery',
    targetId: 5,
    targetName: 'Dogfish Head Craft Brewery',
    date: '2024-01-14',
    rating: 4.2,
  },
  {
    id: 8,
    userId: 7,
    userName: 'Emily Davis',
    userAvatar:
      'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg',
    type: 'drank',
    targetType: 'beer',
    targetId: 9,
    targetName: 'Guinness Draught',
    date: '2024-01-13',
    rating: 4.0,
  },
  {
    id: 9,
    userId: 8,
    userName: 'Daniel Lee',
    userAvatar:
      'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
    type: 'left a review for',
    targetType: 'beer',
    targetId: 4,
    targetName: 'Sierra Nevada Pale Ale',
    date: '2024-01-12',
    rating: 4.3,
  },
  {
    id: 10,
    userId: 9,
    userName: 'Ava Thompson',
    userAvatar:
      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    type: 'visited',
    targetType: 'brewery',
    targetId: 6,
    targetName: 'Lagunitas Brewing Company',
    date: '2024-01-11',
  },
  {
    id: 11,
    userId: 2,
    userName: 'Jane Smith',
    userAvatar:
      'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    type: 'drank',
    targetType: 'beer',
    targetId: 8,
    targetName: 'Blue Moon Belgian White',
    date: '2024-01-10',
    rating: 3.8,
  },
  {
    id: 12,
    userId: 10,
    userName: 'Noah Walker',
    userAvatar:
      'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg',
    type: 'left a review for',
    targetType: 'beer',
    targetId: 10,
    targetName: 'Bell’s Two Hearted Ale',
    date: '2024-01-09',
    rating: 4.6,
  },
]

// Mock data for the growth charts
export const mockGrowthData = {
  beers: [
    { month: 'Jan', count: 10 },
    { month: 'Feb', count: 15 },
    { month: 'Mar', count: 22 },
    { month: 'Apr', count: 28 },
    { month: 'May', count: 35 },
    { month: 'Jun', count: 42 },
  ],
  breweries: [
    { month: 'Jan', count: 5 },
    { month: 'Feb', count: 8 },
    { month: 'Mar', count: 12 },
    { month: 'Apr', count: 15 },
    { month: 'May', count: 18 },
    { month: 'Jun', count: 22 },
  ],
}

// Mock data for score distribution
export const mockDistribution = {
  beers: [
    { rating: '1', count: 2 },
    { rating: '2', count: 5 },
    { rating: '3', count: 15 },
    { rating: '4', count: 25 },
    { rating: '5', count: 18 },
  ],
  breweries: [
    { rating: '1', count: 1 },
    { rating: '2', count: 3 },
    { rating: '3', count: 8 },
    { rating: '4', count: 12 },
    { rating: '5', count: 6 },
  ],
}
