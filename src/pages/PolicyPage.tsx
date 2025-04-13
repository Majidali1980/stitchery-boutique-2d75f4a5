
import { Link } from "react-router-dom";

const PolicyPage = () => {
  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold heading-fancy mb-6">Privacy & Return Policies</h1>
        <div className="w-24 h-1 bg-brand-gold mb-8"></div>
        
        <div className="prose prose-headings:font-semibold prose-headings:text-gray-900 prose-p:text-gray-600 prose-strong:text-gray-900 prose-li:text-gray-600 max-w-none">
          <h2 className="text-2xl mb-6">Privacy Policy</h2>
          
          <section className="mb-8">
            <h3 className="text-xl">1. Information We Collect</h3>
            <p>
              MA Tailor respects your privacy and is committed to protecting your personal information. We collect the following types of information:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Personal Information:</strong> Name, email address, phone number, shipping address, and billing information.
              </li>
              <li>
                <strong>Order Information:</strong> Details about products purchased, measurements for custom orders, and transaction history.
              </li>
              <li>
                <strong>Usage Data:</strong> Information about how you interact with our website, including IP address, browser type, and device information.
              </li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h3 className="text-xl">2. How We Use Your Information</h3>
            <p>
              We use the information we collect for the following purposes:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To process and fulfill your orders</li>
              <li>To communicate with you about your order status</li>
              <li>To provide customer support</li>
              <li>To send you promotional emails about our products and services (you can opt out at any time)</li>
              <li>To improve our website and services</li>
              <li>To protect against fraudulent transactions</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h3 className="text-xl">3. Information Sharing</h3>
            <p>
              We do not sell, trade, or rent your personal information to third parties. We may share your information with:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Service Providers:</strong> Third parties who help us operate our business (e.g., payment processors, shipping partners).
              </li>
              <li>
                <strong>Legal Compliance:</strong> When required by law or to protect our rights.
              </li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h3 className="text-xl">4. Data Security</h3>
            <p>
              We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.
            </p>
          </section>
          
          <section className="mb-8">
            <h3 className="text-xl">5. Your Rights</h3>
            <p>
              You have the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your data</li>
              <li>Opt out of marketing communications</li>
            </ul>
          </section>
          
          <hr className="my-12" />
          
          <h2 className="text-2xl mb-6">Return & Refund Policy</h2>
          
          <section className="mb-8">
            <h3 className="text-xl">1. Return Eligibility</h3>
            <p>
              We accept returns under the following conditions:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Returns must be initiated within 7 days of receiving your order</li>
              <li>Products must be unused, unwashed, and in their original packaging with tags attached</li>
              <li>Custom stitched items cannot be returned unless there is a significant defect in craftsmanship</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h3 className="text-xl">2. Non-Returnable Items</h3>
            <p>
              The following items cannot be returned:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Custom stitched items (except for manufacturing defects)</li>
              <li>Sale items marked as "Final Sale"</li>
              <li>Items that have been worn, altered, or washed</li>
              <li>Products missing the original packaging or tags</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h3 className="text-xl">3. Return Process</h3>
            <p>
              To return an item:
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                Contact our customer service at info@matailor.com or call +92 307 0125273 to initiate a return.
              </li>
              <li>
                Our team will provide you with a return authorization and instructions.
              </li>
              <li>
                Package the item securely with all original tags and packaging.
              </li>
              <li>
                Ship the item back to the address provided by our customer service team.
              </li>
            </ol>
            <p className="mt-4">
              Shipping costs for returns are the responsibility of the customer unless the return is due to our error (e.g., wrong item sent, defective product).
            </p>
          </section>
          
          <section className="mb-8">
            <h3 className="text-xl">4. Refunds</h3>
            <p>
              Once we receive and inspect your return, we will notify you about the status of your refund.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                If approved, your refund will be processed within 7 business days.
              </li>
              <li>
                Refunds will be issued using the original payment method.
              </li>
              <li>
                For cash on delivery orders, refunds will be processed via bank transfer.
              </li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h3 className="text-xl">5. Exchanges</h3>
            <p>
              If you wish to exchange an item for a different size or color:
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                Follow the same process as for returns.
              </li>
              <li>
                Specify the new item you want in exchange when contacting customer service.
              </li>
              <li>
                If the exchanged item has a different price, you will be charged or refunded the difference.
              </li>
            </ol>
          </section>
          
          <section className="mb-8">
            <h3 className="text-xl">6. Damaged or Defective Items</h3>
            <p>
              If you receive a damaged or defective item:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Contact us within 48 hours of receiving your order.
              </li>
              <li>
                Provide photos of the damaged/defective item along with your order number.
              </li>
              <li>
                We will arrange for a replacement or refund at our expense.
              </li>
            </ul>
          </section>
          
          <p className="mt-8">
            If you have any questions about our Privacy or Return policies, please <Link to="/contact" className="text-brand-gold hover:underline">contact us</Link>.
          </p>
          
          <p className="mt-4">
            Last Updated: April 13, 2025
          </p>
        </div>
      </div>
    </div>
  );
};

export default PolicyPage;
