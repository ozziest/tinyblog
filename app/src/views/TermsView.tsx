import LegalLinks from "@/components/layout/LegalLinks";
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
        <h1 className="font-bold text-4xl mb-5">Terms of Service</h1>

        <p>
          <div>
            Effective Date: <strong>15 November 2024</strong>
          </div>
          <div>
            Version number: <strong>1</strong>
          </div>
        </p>

        <p>
          Welcome to <WebsiteName />! We’re thrilled to have you here. Please
          read these Terms of Service (“Terms”) carefully, as they outline the
          rules and guidelines for using our services.
        </p>

        <h2 className="mt-5 font-bold text-2xl">1. Acceptance of Terms</h2>
        <p>
          By accessing or using <WebsiteName />, you agree to be bound by these
          Terms, our Privacy Policy, and any additional guidelines we provide.
          If you do not agree, you may not use our services.
        </p>

        <h2 className="mt-5 font-bold text-2xl">2. Eligibility</h2>
        <p>
          To use our services, you must:
          <ul className="list-disc pl-10">
            <li>
              Be at least 16 years old, or meet the minimum age required by your
              country for processing personal data under GDPR, and
            </li>
            <li>Have the legal capacity to agree to these Terms.</li>
          </ul>
        </p>
        <p>
          For users under the age of 16, parental or legal guardian consent is
          required.
        </p>

        <h2 className="mt-5 font-bold text-2xl">
          3. Data Collection and Privacy
        </h2>
        <p>
          We care about your privacy. <WebsiteName /> processes personal data in
          accordance with our{" "}
          <Link to="/privacy-policy" className="font-semibold hover:underline">
            Privacy Policy
          </Link>
          . By using our services, you consent to the collection and use of your
          information as outlined there.
        </p>

        <p>
          <span className="font-bold">Key Points:</span>
          <ul className="list-disc pl-10">
            <li>
              We collect data necessary to provide our services (e.g., email
              address, usage analytics).
            </li>
            <li>
              You have the right to access, correct, or delete your data at any
              time.
            </li>
            <li>For further details, see the “Your Rights” section below.</li>
          </ul>
        </p>

        <h2 className="mt-5 font-bold text-2xl">4. Your Content</h2>
        <p>
          You retain ownership of the content you post on <WebsiteName />.
          However, by posting content, you grant us a non-exclusive,
          royalty-free license to store, display, and share your content as
          necessary to operate the platform.
        </p>
        <p>
          <span className="font-bold">Responsibilities:</span>
          <ul className="list-disc pl-10">
            <li>You are solely responsible for the content you create.</li>
            <li>
              Content must not violate any applicable laws, infringe third-party
              rights, or include harmful, defamatory, or inappropriate material.
            </li>
          </ul>
        </p>

        <h2 className="mt-5 font-bold text-2xl">5. User Conduct</h2>
        <p>
          To maintain a safe and respectful environment, you agree not to:
          <ul className="list-disc pl-10">
            <li>
              Use <WebsiteName /> for illegal activities.
            </li>
            <li>
              Post spam, malicious code, or engage in activities that harm other
              users.
            </li>
            <li>
              Collect data or interact with the platform through unauthorized
              means.
            </li>
          </ul>
        </p>

        <h2 className="mt-5 font-bold text-2xl">6. Third-Party Services</h2>
        <p>
          <WebsiteName /> may include links to third-party services or integrate
          with them. We are not responsible for the practices, content, or
          privacy policies of these third-party services.
        </p>

        <h2 className="mt-5 font-bold text-2xl">7. Account Security</h2>
        <p>
          You are responsible for maintaining the security of your account.
          Notify us immediately if you suspect unauthorized access.
        </p>

        <h2 className="mt-5 font-bold text-2xl">8. Your Rights</h2>
        <p>
          As a user based in the EU or subject to GDPR, you have the following
          rights:
          <ul className="list-disc pl-10">
            <li>Access: Request a copy of your personal data.</li>
            <li>Correction: Request corrections to your data.</li>
            <li>
              Deletion: Request that we delete your data (“Right to Be
              Forgotten”).
            </li>
            <li>
              Portability: Request a copy of your data in a structured, commonly
              used format.
            </li>
            <li>
              Objection: Object to the processing of your data for specific
              purposes.
            </li>
          </ul>
          To exercise these rights, contact us at{" "}
          <Link
            to="mailto:contact@tinyblog.space"
            className="font-semibold hover:underline"
          >
            contact@tinyblog.space
          </Link>
          .
        </p>

        <h2 className="mt-5 font-bold text-2xl">9. Cookies</h2>
        <p>
          <WebsiteName /> uses cookies to improve user experience and analyze
          platform usage. By using our services, you consent to the use of
          cookies as outlined in our{" "}
          <Link to="/cookie-policy" className="font-semibold hover:underline">
            Cookie Policy
          </Link>
          .
        </p>

        <h2 className="mt-5 font-bold text-2xl">10. Service Modifications</h2>
        <p>
          We reserve the right to modify or discontinue <WebsiteName /> or its
          features at any time without notice. We will strive to provide advance
          notice when possible.
        </p>

        <h2 className="mt-5 font-bold text-2xl">11. Termination</h2>
        <p>
          We may suspend or terminate your access to <WebsiteName /> if you
          violate these Terms or for other valid reasons, including but not
          limited to technical or legal circumstances.
        </p>

        <h2 className="mt-5 font-bold text-2xl">12. Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law:
          <ul className="list-disc pl-10">
            <li>
              <WebsiteName /> is provided “as is” without warranties of any
              kind.
            </li>
            <li>
              We are not liable for any indirect, incidental, or consequential
              damages resulting from your use of the platform.
            </li>
          </ul>
        </p>

        <h2 className="mt-5 font-bold text-2xl">13. Changes to These Terms</h2>
        <p>
          We may update these Terms from time to time. Significant changes will
          be communicated via email or on the platform. Continued use of
          <WebsiteName /> after changes implies acceptance of the new Terms.
        </p>

        <h2 className="mt-5 font-bold text-2xl">14. Contact Information</h2>
        <p>
          If you have any questions or concerns regarding these Terms, please
          contact us at:
          <div className="font-bold">
            <WebsiteName />
          </div>
          <div>
            <span className="font-semibold">Email</span>:{" "}
            <Link to="mailto:contact@tinyblog.space">
              contact@tinyblog.space
            </Link>
          </div>
          <div>
            <span className="font-semibold">Website</span>:{" "}
            <Link to="https://tinyblog.space">https://tinyblog.space</Link>
          </div>
        </p>

        <p>
          By using <WebsiteName />, you confirm that you have read, understood,
          and agreed to these{" "}
          <span className="font-semibold">Terms of Service</span>. Thank you for
          being a part of our community!
        </p>
      </main>
      <footer className="py-10 bg-gray-900 text-white text-center">
        <p>
          &copy; 2024 <WebsiteName />. All rights reserved.
        </p>
        <p className="mt-2">
          <LegalLinks classes="text-white" />
        </p>
      </footer>
    </>
  );
};

export default TermsView;
