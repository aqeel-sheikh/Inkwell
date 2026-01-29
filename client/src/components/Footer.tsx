export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="dark-section bg-primary-900 text-primary-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div>
            <h3 className="font-display text-xl font-bold mb-4">Inkwell</h3>
            <p className="text-primary-300 text-sm leading-relaxed">
              A sanctuary for stories worth reading. Discover narratives that
              inspire, challenge, and transform.
            </p>
          </div>
          {/* Explore */}
          <div>
            <h4 className="font-semibold mb-4">Explore</h4>
            <ul className="space-y-2 text-sm text-primary-300">
              <li>
                <a
                  href="#"
                  className="hover:text-accent-coral transition-colors"
                >
                  Latest Stories
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-accent-coral transition-colors"
                >
                  Popular
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-accent-coral transition-colors"
                >
                  Categories
                </a>
              </li>
            </ul>
          </div>
          {/* Connect */}
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <ul className="space-y-2 text-sm text-primary-300">
              <li>
                <a
                  href="https://x.com/aqeell_sheikh"
                  className="hover:text-accent-coral transition-colors"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/aqeelsheikh/"
                  className="hover:text-accent-coral transition-colors"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/aqeel-sheikh"
                  className="hover:text-accent-coral transition-colors"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Github
                </a>
              </li>
            </ul>
          </div>
          {/* Partner Up*/}
          <div>
            <h4 className="font-semibold mb-4">Partner Up</h4>
            <ul className="space-y-2 text-sm text-primary-300">
              <li>
                <a
                  href="https://x.com/aqeell_sheikh"
                  className="hover:text-accent-coral transition-colors"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Fiverr
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/aqeelsheikh/"
                  className="hover:text-accent-coral transition-colors"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Upwork
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@aqeelsheikh.com"
                  className="hover:text-accent-coral transition-colors wrap-break-word"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  hello@aqeelsheikh.com
                </a>
              </li>
            </ul>
          </div>
          {/* Support */}
          <div>
            <h2 className="font-semibold mb-4">Support</h2>
            <ul className="space-y-2 text-sm text-primary-300">
              <li>
                <a
                  href="https://github.com/aqeel-sheikh/Inkwell"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Fork & Star ⭐
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/aqeel-sheikh/Inkwell/pulls"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Open a pull request
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/aqeel-sheikh/Inkwell/issues"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Report an issue
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-primary-800 text-center text-sm text-primary-400">
          © {currentYear} Inkwell -{" "}
          <a href="https://aqeelsheikh.com">Aqeel Sheikh</a>. Crafted with care
          for readers everywhere.
        </div>
      </div>
    </footer>
  );
}
