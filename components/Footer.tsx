import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">b4idid</h3>
            <p className="text-gray-400">
              Professional photography portfolio with print sales and booking services.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-white transition">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/prints" className="hover:text-white transition">
                  Prints
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Book a Shoot
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Get in Touch</h4>
            <p className="text-gray-400 mb-2">
              Ready to capture your special moments?
            </p>
            <Link
              href="/contact"
              className="inline-block bg-white text-gray-900 px-6 py-2 rounded-md font-medium hover:bg-gray-100 transition"
            >
              Contact Me
            </Link>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} b4idid. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

