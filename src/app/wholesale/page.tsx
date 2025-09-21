import { QuoteForm } from '../../components/quote-form';
import { Package, Truck, Award } from 'lucide-react';

export default function WholesalePage() {
  return (
    <>
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container text-center">
          <h1 className="text-4xl font-bold">Wholesale & Services</h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-primary-foreground/90">
            Partner with us for bulk orders, competitive pricing, and custom fabric solutions.
          </p>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-primary mb-4">Your Strategic Fabric Partner</h2>
            <p className="text-muted-foreground mb-6">
              At Maatex Solution BD, we understand the needs of businesses, designers, and manufacturers. Our wholesale program is designed to provide you with a seamless and cost-effective sourcing experience.
            </p>
            <div className="space-y-6">
              <div className="flex gap-4">
                <Package className="h-8 w-8 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold">Bulk Ordering</h3>
                  <p className="text-sm text-muted-foreground">Access our entire collection with attractive pricing for bulk quantities. Minimum order starts at 100 meters.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Award className="h-8 w-8 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold">Custom Solutions</h3>
                  <p className="text-sm text-muted-foreground">Need a specific color, weave, or blend? We work with our network of mills to provide custom fabric development.</p>
                </div>
              </div>
               <div className="flex gap-4">
                <Truck className="h-8 w-8 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold">Global Shipping</h3>
                  <p className="text-sm text-muted-foreground">We offer reliable and timely delivery services to clients worldwide, ensuring your production stays on schedule.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <QuoteForm />
          </div>
        </div>
      </section>
    </>
  );
}
