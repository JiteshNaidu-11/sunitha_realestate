const bannerImages = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?auto=format&fit=crop&w=1920&q=80",
];

const AnimatedPageBanner = () => {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {bannerImages.map((image, index) => (
        <div
          key={image}
          className="animated-page-banner-slide absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${image})`, animationDelay: `${index * 6}s` }}
        />
      ))}
      <div className="absolute inset-0 bg-dark/65" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/55" />
    </div>
  );
};

export default AnimatedPageBanner;
