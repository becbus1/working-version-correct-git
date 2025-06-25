
import { useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { Toggle, GooeyFilter } from "@/components/ui/liquid-toggle";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [isRent, setIsRent] = useState(false);

  // Placeholder data
  const mockListings = [
    {
      id: 1,
      address: "123 Rivington St, Lower East Side",
      price: "$850,000",
      pricePerSqft: "$1,200",
      bedrooms: 2,
      bathrooms: 1,
      sqft: 708,
      dealScore: 95,
      image: "/lovable-uploads/e5660153-0793-48a7-b1cd-4dd731b37c1e.png"
    },
    {
      id: 2,
      address: "456 Graham Ave, Williamsburg",
      price: "$720,000",
      pricePerSqft: "$980",
      bedrooms: 1,
      bathrooms: 1,
      sqft: 735,
      dealScore: 88,
      image: "/lovable-uploads/e5660153-0793-48a7-b1cd-4dd731b37c1e.png"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white font-inter">
      <GooeyFilter />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tighter">
            Find the best deal in the city. Actually.
          </h1>
          <p className="text-xl text-gray-400 tracking-tight">
            Stop wasting time on overpriced listings.
          </p>
        </div>

        {/* Search Filters */}
        <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6 mb-8">
          {/* Rent/Buy Toggle */}
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center space-x-4">
              <span className={`text-sm font-medium tracking-tight transition-colors ${!isRent ? 'text-white' : 'text-gray-400'}`}>
                Buy
              </span>
              <Toggle 
                checked={isRent} 
                onCheckedChange={setIsRent} 
                variant="default"
              />
              <span className={`text-sm font-medium tracking-tight transition-colors ${isRent ? 'text-white' : 'text-gray-400'}`}>
                Rent
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-5 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-400 mb-2 tracking-tight">
                Search Address or Neighborhood
              </label>
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="e.g. East Village, 10009"
                  className="w-full pl-10 pr-4 py-3 bg-black/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all tracking-tight"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2 tracking-tight">
                Zip Code
              </label>
              <input
                type="text"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                placeholder="10009"
                className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all tracking-tight"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2 tracking-tight">
                Max {isRent ? '/month' : '$/sqft'}
              </label>
              <input
                type="text"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder={isRent ? "$4,000" : "$1,500"}
                className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all tracking-tight"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2 tracking-tight">
                Bedrooms
              </label>
              <select
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-xl text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all tracking-tight"
              >
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
              </select>
            </div>
          </div>
        </div>

        {/* Sort Options */}
        <div className="flex justify-between items-center mb-8">
          <p className="text-gray-400 tracking-tight">
            {mockListings.length} undervalued listings found
          </p>
          <select className="bg-black/50 border border-gray-700 rounded-xl px-4 py-2 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all tracking-tight">
            <option>Best Deal Score</option>
            <option>Lowest $/sqft</option>
            <option>Newest</option>
          </select>
        </div>

        {/* Listings Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockListings.map((listing) => (
            <div 
              key={listing.id}
              className="relative rounded-3xl overflow-hidden border-2 border-gray-700/50 hover:border-blue-500/70 transition-all duration-300 hover:scale-105 cursor-pointer group bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm"
            >
              {/* Score badge - top right */}
              <div className="absolute top-4 right-4 z-10 bg-blue-500/90 backdrop-blur-sm text-white px-3 py-2 rounded-full text-lg font-bold tracking-tight shadow-lg">
                {listing.dealScore}
              </div>
              
              {/* Image container */}
              <div 
                className="h-56 bg-cover bg-center relative"
                style={{ backgroundImage: `url('${listing.image}')` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
              
              {/* Content */}
              <div className="p-6 space-y-4">
                <h3 className="text-lg font-semibold tracking-tight text-white group-hover:text-blue-300 transition-colors">
                  {listing.address}
                </h3>
                
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-green-400 tracking-tight">
                    {listing.price}
                  </span>
                  <span className="text-gray-300 tracking-tight font-medium">
                    {listing.pricePerSqft}/sqft
                  </span>
                </div>
                
                <div className="flex justify-between text-sm text-gray-400">
                  <span className="tracking-tight">{listing.bedrooms} bed, {listing.bathrooms} bath</span>
                  <span className="tracking-tight">{listing.sqft} sqft</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State for more listings */}
        <div className="text-center py-16">
          <h3 className="text-xl text-gray-400 mb-4 tracking-tight">
            We're still scraping the good stuff...
          </h3>
          <p className="text-gray-500 tracking-tight">
            More undervalued deals coming soon.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Search;
