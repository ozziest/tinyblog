import { Link } from "react-router-dom";

const WebsiteName = () => {
  return (
    <Link to="https://tinyblog.space" className="font-semibold hover:underline">
      tinyblog.space
    </Link>
  );
};

const TermsView = () => {
  return (
    <>
      <main className="bg-white text-gray-900 max-w-screen-lg mx-auto py-10 flex flex-col gap-3 leading-7">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Privacy Policy
        </h1>

        <p>
          <div>
            Effective Date: <strong>15 November 2024</strong>
          </div>
          <div>
            Version number: <strong>1</strong>
          </div>
        </p>

        <p className="text-gray-700">
          At <WebsiteName />, your privacy is our priority. This{" "}
          <span className="font-semibold">Privacy Policy</span> explains how we
          collect, use, and protect your personal data when you use our
          services. By using <WebsiteName />, you consent to the practices
          described in this policy.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-4">
          1. Data We Collect
        </h2>
        <p className="text-gray-700">We collect the following types of data:</p>
        <h3 className="text-xl font-semibold text-gray-800">
          a. Personal Information You Provide
        </h3>
        <ul className="list-disc list-inside text-gray-700">
          <li>Name</li>
          <li>Email address</li>
          <li>Profile information</li>
          <li>
            Any content you post on <WebsiteName />
          </li>
        </ul>
        <h3 className="text-xl font-semibold text-gray-800">
          b. Automatically Collected Data
        </h3>
        <ul className="list-disc list-inside text-gray-700">
          <li>IP address</li>
          <li>Browser type and version</li>
          <li>Operating system</li>
          <li>Usage data (e.g., page views, time spent on the platform)</li>
        </ul>
        <h3 className="text-xl font-semibold text-gray-800">c. Cookies</h3>
        <p className="text-gray-700">
          We use cookies and similar technologies to improve your experience.
          See our{" "}
          <Link to="/cookie-policy" className="font-semibold hover:underline">
            Cookie Policy
          </Link>{" "}
          for details.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-4">
          2. How We Use Your Data
        </h2>
        <p className="text-gray-700">We use your data to:</p>
        <ul className="list-disc list-inside text-gray-700">
          <li>Provide, maintain, and improve our services.</li>
          <li>
            Communicate with you (e.g., account updates, support responses).
          </li>
          <li>Analyze usage trends to enhance the platform.</li>
          <li>Comply with legal obligations.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-4">
          3. Legal Basis for Processing
        </h2>
        <p className="text-gray-700">
          Under GDPR, we process your data based on:
          <ul className="list-disc list-inside text-gray-700 mt-2">
            <li>
              Your <strong>consent</strong> (e.g., for email communications).
            </li>
            <li>
              <strong>Performance of a contract</strong> (e.g., providing our
              services).
            </li>
            <li>
              <strong>Legitimate interests</strong> (e.g., improving platform
              security).
            </li>
            <li>
              <strong>Compliance with legal obligations</strong>.
            </li>
          </ul>
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-4">
          4. Sharing Your Data
        </h2>
        <p className="text-gray-700">
          We do not sell your personal data. We may share your data with:
        </p>
        <ul className="list-disc list-inside text-gray-700">
          <li>
            <strong>Service Providers:</strong> Trusted partners who assist with
            hosting, analytics, or other operational tasks.
          </li>
          <li>
            <strong>Legal Authorities:</strong> When required to comply with
            legal obligations or to protect our rights.
          </li>
          <li>
            <strong>Business Transfers:</strong> In the event of a merger or
            acquisition, your data may be transferred to the new entity.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-4">
          5. Your Rights (GDPR Compliance)
        </h2>
        <p className="text-gray-700">
          As a user based in the EU or under GDPR, you have the following
          rights:
        </p>
        <ul className="list-disc list-inside text-gray-700">
          <li>
            <strong>Access:</strong> Request a copy of your personal data.
          </li>
          <li>
            <strong>Correction:</strong> Request corrections to your personal
            data.
          </li>
          <li>
            <strong>Deletion:</strong> Request that your data be deleted (“Right
            to Be Forgotten”).
          </li>
          <li>
            <strong>Restriction:</strong> Request limited processing of your
            data.
          </li>
          <li>
            <strong>Portability:</strong> Receive your data in a structured,
            machine-readable format.
          </li>
          <li>
            <strong>Objection:</strong> Object to specific data processing
            activities.
          </li>
          <li>
            <strong>Withdraw Consent:</strong> Revoke consent for data
            processing at any time.
          </li>
        </ul>
        <p className="text-gray-700">
          To exercise these rights, contact us at{" "}
          <a
            href="mailto:contact@tinyblog.space"
            className="font-semibold hover:underline"
          >
            contact@tinyblog.space
          </a>
          . We aim to respond within 30 days.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-4">
          6. Data Retention
        </h2>
        <p className="text-gray-700">
          We retain your personal data only for as long as necessary to provide
          our services, comply with legal obligations, and resolve disputes.
          When data is no longer needed, we securely delete it.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-4">
          7. Data Security
        </h2>
        <p className="text-gray-700">
          We implement industry-standard measures to protect your data from
          unauthorized access, disclosure, alteration, or destruction. However,
          no online platform can guarantee complete security.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-4">
          8. Children’s Privacy
        </h2>
        <p className="text-gray-700">
          <WebsiteName /> is not intended for users under 16 years of age
          without parental or guardian consent. If we learn that we have
          collected data from a child under 16 without proper consent, we will
          delete it promptly.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-4">
          9. Changes to This Privacy Policy
        </h2>
        <p className="text-gray-700">
          We may update this Privacy Policy from time to time. If we make
          significant changes, we will notify you via email or through a
          prominent notice on our platform. Continued use of <WebsiteName />{" "}
          after changes implies acceptance of the updated policy.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-4">
          10. Contact Us
        </h2>
        <p className="text-gray-700">
          If you have any questions or concerns about this{" "}
          <span className="font-semibold">Privacy Policy</span> or your data,
          please contact us at:
        </p>
        <p className="text-gray-700">
          <br />
          Email:{" "}
          <a
            href="mailto:contact@tinyblog.space"
            className="font-semibold hover:underline"
          >
            contact@tinyblog.space
          </a>
          <br />
          Website:{" "}
          <a
            href="https://tinyblog.space"
            className="font-semibold hover:underline"
          >
            https://tinyblog.space
          </a>
        </p>

        <p className="text-gray-700">
          Thank you for trusting <WebsiteName />. Your privacy matters to us!
        </p>
      </main>
      <footer className="py-10 bg-gray-900 text-white text-center">
        <p>
          &copy; 2024 <WebsiteName />. All rights reserved.
        </p>
        <p className="mt-2">Privacy Policy | Terms of Service</p>
      </footer>
    </>
  );
};

export default TermsView;
