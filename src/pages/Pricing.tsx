
import { Link } from "react-router-dom";
import { HoverButton } from "@/components/ui/hover-button";

const Pricing = () => {
  return (
    <div className="font-inter min-h-screen bg-black text-white">
      {/* Pricing Section */}
      <section className="py-20 px-4 bg-gray-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-semibold mb-6 tracking-tighter">
              Real estate is all about being early.
            </h1>
            <p className="text-xl text-gray-400 tracking-tight">
              The best deals disappear in days. Get notified first.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className="bg-black/50 rounded-2xl p-8 border border-gray-800 flex flex-col">
              <h3 className="text-2xl font-semibold mb-4 tracking-tight">Free</h3>
              <p className="text-4xl font-semibold mb-6 tracking-tight">$0</p>
              <ul className="space-y-3 mb-12 text-gray-300 flex-grow">
                <li className="flex items-center tracking-tight">
                  <span className="text-blue-400 mr-3">•</span>
                  See up to 3 deals per day
                </li>
                <li className="flex items-center tracking-tight">
                  <span className="text-blue-400 mr-3">•</span>
                  Basic deal scores
                </li>
                <li className="flex items-center tracking-tight">
                  <span className="text-blue-400 mr-3">•</span>
                  Neighborhood data
                </li>
                <li className="flex items-center tracking-tight">
                  <span className="text-blue-400 mr-3">•</span>
                  Search and filter
                </li>
              </ul>
              <button className="w-full bg-gray-800 text-white py-3 rounded-full font-medium tracking-tight hover:bg-gray-700 transition-all mt-8">
                Current Plan
              </button>
            </div>

            {/* Unlimited Plan */}
            <div className="relative flex flex-col">
              {/* Card with animated border */}
              <div className="relative overflow-hidden rounded-2xl p-[3px] bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 bg-[length:300%_300%] animate-[gradient_6s_ease_infinite]">
                {/* Card content with black background */}
                <div className="relative bg-black rounded-2xl p-8 flex flex-col h-full">
                  {/* Header with title only */}
                  <div className="mb-4">
                    <h3 className="text-2xl font-semibold tracking-tight">Unlimited</h3>
                  </div>
                  <p className="text-4xl font-semibold mb-6 tracking-tight">$3<span className="text-lg text-gray-400">/mo</span></p>
                  <ul className="space-y-3 mb-12 text-gray-300 flex-grow">
                    <li className="flex items-center tracking-tight">
                      <span className="text-blue-400 mr-3">•</span>
                      <strong className="text-white">Access to ALL deals</strong>
                    </li>
                    <li className="flex items-center tracking-tight">
                      <span className="text-blue-400 mr-3">•</span>
                      Email alerts for new deals
                    </li>
                    <li className="flex items-center tracking-tight">
                      <span className="text-blue-400 mr-3">•</span>
                      Select areas to be notified in
                    </li>
                    <li className="flex items-center tracking-tight">
                      <span className="text-blue-400 mr-3">•</span>
                      Advanced deal analysis
                    </li>
                  </ul>
                  <button className="w-full bg-white text-black py-3 rounded-full font-medium tracking-tight transition-all mt-8 hover:bg-gray-200">
                    Access Everything
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600/10 to-purple-600/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-semibold mb-6 tracking-tighter">
            Don't overpay. Ever again.
          </h2>
          <p className="text-xl text-gray-300 mb-12 tracking-tight">
            Join the platform that actually works for buyers.
          </p>
          <Link to="/join">
            <HoverButton className="text-white font-semibold tracking-tight">
              Join now.
            </HoverButton>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
