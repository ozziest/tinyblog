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
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Cookie Policy</h1>
        <p className="text-gray-700">
          Effective Date: <strong>15 November 2024</strong>
        </p>
        <p className="text-gray-700">
          At <WebsiteName />, we use cookies and similar technologies to enhance
          your experience, analyze usage, and ensure the platform’s
          functionality. This Cookie Policy explains what cookies are, how we
          use them, and how you can manage your preferences.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-5">
          1. What Are Cookies?
        </h2>
        <p className="text-gray-700">
          Cookies are small text files stored on your device (computer, tablet,
          or mobile) by a website when you visit it. They help the website
          recognize your device, remember your preferences, and improve your
          browsing experience. Cookies can be either session-based (deleted when
          you close your browser) or persistent (stored on your device until a
          set expiration date or until manually deleted).
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-5">
          2. How We Use Cookies
        </h2>
        <p className="text-gray-700">
          We use cookies for various purposes, including:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>
            <strong>Essential Cookies:</strong> These cookies are necessary for
            the proper functioning of the website, such as enabling you to log
            in or access secure areas.
          </li>
          <li>
            <strong>Performance and Analytics Cookies:</strong> These cookies
            help us understand how users interact with the platform, which pages
            are most visited, and how we can improve the overall experience.
          </li>
          <li>
            <strong>Functionality Cookies:</strong> These cookies remember your
            preferences, such as language or theme settings, to provide a
            personalized experience.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-5">
          3. Third-Party Cookies
        </h2>
        <p className="text-gray-700">
          In some cases, third-party services integrated into our platform may
          set their own cookies. These third-party cookies are managed by their
          respective providers and are subject to their privacy and cookie
          policies. Examples include analytics tools like Google Analytics or
          embedded content from services like YouTube.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-5">
          4. Managing Your Cookie Preferences
        </h2>
        <p className="text-gray-700">
          You have the right to manage your cookie preferences. Most web
          browsers allow you to control cookies through their settings. You can
          choose to block or delete cookies, and you can also set preferences
          for specific websites.
        </p>
        <p className="text-gray-700">
          Here are links to cookie management instructions for popular browsers:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>
            <a
              href="https://support.google.com/chrome/answer/95647"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:underline"
            >
              Google Chrome
            </a>
          </li>
          <li>
            <a
              href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:underline"
            >
              Mozilla Firefox
            </a>
          </li>
          <li>
            <a
              href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:underline"
            >
              Apple Safari
            </a>
          </li>
          <li>
            <a
              href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:underline"
            >
              Microsoft Edge
            </a>
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-5">
          5. Cookie Consent
        </h2>
        <p className="text-gray-700">
          When you visit <WebsiteName />, you are presented with a cookie banner
          to accept or manage your cookie preferences. Your preferences can be
          updated at any time via the "Cookie Settings" link available on our
          website.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-5">
          6. Changes to This Cookie Policy
        </h2>
        <p className="text-gray-700">
          We may update this Cookie Policy from time to time to reflect changes
          in technology, legal requirements, or our practices. Significant
          changes will be communicated via a notice on our platform or through
          email. Please review this policy periodically to stay informed.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-5">
          7. Contact Us
        </h2>
        <p className="text-gray-700">
          If you have any questions or concerns about this Cookie Policy or our
          use of cookies, feel free to contact us at:
        </p>
        <p className="text-gray-700">
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
          Thank you for trusting <WebsiteName />. We are committed to providing
          a transparent and user-friendly experience regarding cookies and your
          privacy.
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
