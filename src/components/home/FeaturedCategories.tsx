
import { Link } from "react-router-dom";

const categories = [
  {
    id: "ready-to-wear",
    name: "Ready to Wear",
    image: "/lovable-uploads/dfede9a3-f79d-44f4-91c7-47c53bd0a969.png",
    link: "/products?type=ready-to-wear"
  },
  {
    id: "unstitched",
    name: "Unstitched Fabric",
    image: "/lovable-uploads/7985dfe7-6842-4017-a1ab-95f5fd7318d1.png",
    link: "/products?type=unstitched"
  },
  {
    id: "custom-stitching",
    name: "Custom Stitching",
    image: "/lovable-uploads/fb49de04-55f5-4809-a777-a3aedc0395a4.png",
    link: "/services"
  },
  {
    id: "kids",
    name: "Kids Collection",
    image: "/lovable-uploads/ecdc2359-49fa-4a2a-a234-45c5dc067a91.png",
    link: "/products?category=kids"
  }
];

const FeaturedCategories = () => {
  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold heading-fancy">Our Collections</h2>
          <div className="w-24 h-1 bg-brand-gold mx-auto mt-4"></div>
          <p className="text-gray-600 mt-4 max-w-lg mx-auto">
            Explore our diverse collections designed to cater to all your fashion needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link 
              to={category.link} 
              key={category.id} 
              className="group relative overflow-hidden rounded-lg aspect-[3/4]"
            >
              <img 
                src={category.image} 
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-50 transition-all">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-xl font-semibold">{category.name}</h3>
                  <span className="inline-block mt-2 text-sm group-hover:text-brand-gold transition-colors">
                    View Collection →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
