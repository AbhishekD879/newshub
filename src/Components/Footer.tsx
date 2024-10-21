const Footer = () => {
  return (
    <footer className="bg-[#2c3e50] text-white p-6 mt-12">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl font-bold mb-2">NewsHub</h2>
          <p className="text-sm">
            Your trusted source for up-to-date news and information.
          </p>
        </div>
        <nav className="flex flex-wrap justify-center md:justify-end gap-4">
          <a href="#" className="text-sm hover:underline">
            About Us
          </a>
          <a href="#" className="text-sm hover:underline">
            Contact
          </a>
          <a href="#" className="text-sm hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="text-sm hover:underline">
            Terms of Service
          </a>
        </nav>
      </div>
      <div className="text-center mt-6 text-sm">
        <p>&copy; 2023 NewsHub. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
