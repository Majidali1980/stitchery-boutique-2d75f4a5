
import { Link } from "react-router-dom";

const TermsPage = () => {
  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold heading-fancy mb-6">Terms & Conditions</h1>
        <div className="w-24 h-1 bg-brand-gold mb-8"></div>
        
        <div className="prose prose-headings:font-semibold prose-headings:text-gray-900 prose-p:text-gray-600 prose-strong:text-gray-900 prose-li:text-gray-600 max-w-none">
          <p className="lead">
            Welcome to MA Tailor. Please read these Terms and Conditions carefully before using our website or services.
          </p>
          
          <section className="mb-8">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using our website and services, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our website or services.
            </p>
          </section>
          
          <section className="mb-8">
            <h2>2. Products and Services</h2>
            <p>
              MA Tailor offers custom stitching services and ready-to-wear clothing for women and girls. All products displayed on our website are subject to availability.
            </p>
            <h3 className="text-lg font-medium mt-4 mb-2">2.1 Custom Stitching</h3>
            <p>
              For custom stitching services, customers must provide accurate measurements. MA Tailor is not responsible for fitting issues resulting from incorrect measurements provided by the customer.
            </p>
            <h3 className="text-lg font-medium mt-4 mb-2">2.2 Ready-to-Wear Products</h3>
            <p>
              Ready-to-wear products come in standard sizes. Please refer to our size guide to select the appropriate size. Minor variations in color and design may occur due to display settings and photography lighting.
            </p>
          </section>
          
          <section className="mb-8">
            <h2>3. Orders and Payments</h2>
            <p>
              By placing an order with MA Tailor, you represent that you are at least 18 years old and that the information you provide is accurate and complete.
            </p>
            <h3 className="text-lg font-medium mt-4 mb-2">3.1 Order Confirmation</h3>
            <p>
              All orders are subject to acceptance and availability. We will confirm acceptance of your order via email.
            </p>
            <h3 className="text-lg font-medium mt-4 mb-2">3.2 Payment Methods</h3>
            <p>
              We accept various payment methods including cash on delivery, credit/debit cards, and bank transfers. All payments must be received in full before we process your order, except for cash on delivery orders.
            </p>
            <h3 className="text-lg font-medium mt-4 mb-2">3.3 Prices</h3>
            <p>
              All prices displayed on our website are in Pakistani Rupees (PKR) and include applicable taxes. Shipping costs are additional and will be added at checkout.
            </p>
          </section>
          
          <section className="mb-8">
            <h2>4. Shipping and Delivery</h2>
            <p>
              MA Tailor ships products throughout Pakistan. International shipping may be available upon request.
            </p>
            <h3 className="text-lg font-medium mt-4 mb-2">4.1 Delivery Time</h3>
            <p>
              Ready-to-wear products are typically shipped within 1-3 business days. Custom stitching orders require 7-14 business days for completion plus shipping time. Actual delivery times may vary based on location and other factors.
            </p>
            <h3 className="text-lg font-medium mt-4 mb-2">4.2 Shipping Costs</h3>
            <p>
              Standard shipping is free for orders above Rs. 3,000. Orders below this amount incur a shipping fee of Rs. 300.
            </p>
          </section>
          
          <section className="mb-8">
            <h2>5. Returns and Exchanges</h2>
            <p>
              We want you to be completely satisfied with your purchase. Our return policy allows for returns and exchanges under the following conditions:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Returns must be initiated within 7 days of receiving your order.
              </li>
              <li>
                Products must be unused, unwashed, and in their original packaging with tags attached.
              </li>
              <li>
                Custom stitched items cannot be returned unless there is a significant defect in craftsmanship.
              </li>
              <li>
                Shipping costs for returns are the responsibility of the customer unless the return is due to our error.
              </li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2>6. Privacy Policy</h2>
            <p>
              We respect your privacy and are committed to protecting your personal data. Please review our <Link to="/policy" className="text-brand-gold hover:underline">Privacy Policy</Link> to understand how we collect, use, and protect your information.
            </p>
          </section>
          
          <section className="mb-8">
            <h2>7. Intellectual Property</h2>
            <p>
              All content on our website, including text, graphics, logos, images, and software, is the property of MA Tailor and is protected by copyright laws. Unauthorized use of this content is strictly prohibited.
            </p>
          </section>
          
          <section className="mb-8">
            <h2>8. Limitation of Liability</h2>
            <p>
              MA Tailor shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use our products or services.
            </p>
          </section>
          
          <section className="mb-8">
            <h2>9. Modifications to Terms</h2>
            <p>
              We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting on the website. Continued use of our website after changes indicates your acceptance of the new terms.
            </p>
          </section>
          
          <section>
            <h2>10. Contact Information</h2>
            <p>
              If you have any questions about these Terms and Conditions, please contact us at:
            </p>
            <p className="mt-2">
              <strong>Email:</strong> info@matailor.com<br />
              <strong>Phone:</strong> +92 307 0125273<br />
              <strong>Address:</strong> Mahmoodabad No 04, Karachi, Pakistan
            </p>
          </section>
          
          <p className="mt-8">
            Last Updated: April 13, 2025
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
