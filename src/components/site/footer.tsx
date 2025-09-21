
import Link from 'next/link';
import { Package2, Facebook, Instagram, Linkedin } from 'lucide-react';

export function SiteFooter() {
  return (
    <footer className="border-t bg-card text-card-foreground">
      <div className="container py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="flex flex-col items-start gap-4">
            <Link href="/" className="flex items-center space-x-2">
              <Package2 className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">Maatex Solution BD</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              We Weave Trust with Every Thread. Your reliable partner in quality
              fabrics.
            </p>
          </div>
          <div className="md:col-span-2">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="mb-4 font-semibold">Quick Links</h3>
                <ul className="space-y-2">
                  <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary">About Us</Link></li>
                  <li><Link href="/fabrics" className="text-sm text-muted-foreground hover:text-primary">Fabrics</Link></li>
                  <li><Link href="/wholesale" className="text-sm text-muted-foreground hover:text-primary">Wholesale</Link></li>
                  <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">Contact</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="mb-4 font-semibold">Contact Info</h3>
                <address className="not-italic text-sm text-muted-foreground space-y-2">
                  <p>House: 4B, 4th floor, Road : 07B, Sector :07, Uttara, Dhaka</p>
                  <p>Email: <a href="mailto:alamgir@maatexsolutionbd.com" className="hover:text-primary">alamgir@maatexsolutionbd.com</a></p>
                  <p>Phone: <a href="tel:+8801734898005" className="hover:text-primary">+8801734898005</a></p>
                </address>
              </div>
            </div>
          </div>
          <div>
            <h3 className="mb-4 font-semibold">Follow Us</h3>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Facebook">
                <Facebook className="h-6 w-6 text-muted-foreground hover:text-primary" />
              </Link>
              <Link href="#" aria-label="Instagram">
                <Instagram className="h-6 w-6 text-muted-foreground hover:text-primary" />
              </Link>
              <Link href="#" aria-label="LinkedIn">
                <Linkedin className="h-6 w-6 text-muted-foreground hover:text-primary" />
              </Link>
            </div>
            <div className="mt-4">
              <a 
                href="/product-catalog.pdf" 
                download
                className="text-sm text-primary underline hover:no-underline font-medium"
              >
                Download Catalog (PDF)
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Maatex Solution BD. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
