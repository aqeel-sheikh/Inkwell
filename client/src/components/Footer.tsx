export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-brand-900 text-brand-100 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-display text-xl font-bold mb-4">Inkwell</h3>
            <p className="text-brand-300 text-sm leading-relaxed">
              A sanctuary for stories worth reading. Discover narratives that inspire, challenge, and transform.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Explore</h4>
            <ul className="space-y-2 text-sm text-brand-300">
              <li>
                <a href="#" className="hover:text-accent-coral transition-colors">Latest Stories</a>
              </li>
              <li>
                <a href="#" className="hover:text-accent-coral transition-colors">Popular</a>
              </li>
              <li>
                <a href="#" className="hover:text-accent-coral transition-colors">Categories</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <ul className="space-y-2 text-sm text-brand-300">
              <li>
                <a href="#" className="hover:text-accent-coral transition-colors">Twitter</a>
              </li>
              <li>
                <a href="#" className="hover:text-accent-coral transition-colors">Instagram</a>
              </li>
              <li>
                <a href="#" className="hover:text-accent-coral transition-colors">Newsletter</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-brand-800 text-center text-sm text-brand-400">
          © {currentYear} Inkwell. Crafted with care for readers everywhere.
        </div>
      </div>
    </footer>
  )
}
