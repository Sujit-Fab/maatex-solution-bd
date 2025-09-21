import { QuoteForm } from '../../components/quote-form';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <>
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container text-center">
          <h1 className="text-4xl font-bold">Contact Us</h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-primary-foreground/90">
            We're here to help. Reach out to us with any questions or for wholesale inquiries.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-sm">
              <MapPin className="h-10 w-10 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2">Our Address</h3>
              <p className="text-muted-foreground">House: 4B, 4th floor, Road : 07B<br/>Sector :07, Uttara, Dhaka</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-sm">
              <Phone className="h-10 w-10 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2">Phone</h3>
              <a href="tel:+8801734898005" className="text-muted-foreground hover:text-primary">+8801734898005</a>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-sm">
              <Mail className="h-10 w-10 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <div className="flex flex-col space-y-1">
                <a href="mailto:alamgir@maatexsolutionbd.com" className="text-muted-foreground hover:text-primary">alamgir@maatexsolutionbd.com</a>
                <a href="mailto:mamun@maatexsolutionbd.com" className="text-muted-foreground hover:text-primary">mamun@maatexsolutionbd.com</a>
              </div>
            </div>
          </div>
          
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-primary">Send us a Message</h2>
            <p className="text-muted-foreground mt-2">For wholesale and bulk orders, please use the form below.</p>
          </div>
          
          <QuoteForm />
        </div>
      </section>
    </>
  );
}
