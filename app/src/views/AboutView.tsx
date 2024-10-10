import { LogoIcon } from "@/components/Icons";
import { Link } from "react-router-dom";

const FEATURES: Record<string, string> = {
  "📜 Microblogging":
    "Microblogging lets you share quick thoughts, updates, or ideas with your followers instantly.",
  "🕒 No Algorithmic Feeds":
    "Users will only see posts from the accounts they follow, displayed in chronological order.",
  "👥 Follower-Based Feeds":
    "All content is based on who you follow, with no content promotions or algorithmic suggestions.",
  "📢 Ads, but No Tracking":
    "We will show ads to support the platform, but no user tracking or behavioral data collection will be involved.",
  "🚫 No Personalized Ads":
    "Ads are non-intrusive and not tailored based on user profiles or activity.",
  "🔍 Transparency":
    "Our platform will always operate with full transparency about how content and ads are displayed.",
  "🗓️ Historical Integrity":
    "Feed data will always be chronological and historically accurate—no curated or manipulated posts.",
  "🔒 Data Privacy":
    "User data will not be sold or shared with third parties. You control your data.",
  "🌱 Community-Driven":
    "Organic growth will be encouraged through genuine user interactions, not artificial engagement techniques.",
};

const DECENTRALIZATION: Record<string, string> = {
  "🛠️ Complex Setup":
    "Users must find and join a node, which requires technical knowledge.",
  "🔍 Difficult to Discover":
    "It’s hard for users to discover the right communities or instances without a centralized directory.",
  "🏗️ Trust Issues with Nodes":
    "Users need to place trust in smaller node providers, which may not be reliable or secure.",
  "⚙️ Fragmented Experience":
    "Different nodes can have different rules, moderation standards, and features, leading to inconsistent user experiences.",
  "🌐 Scaling Problems":
    "Decentralized networks struggle with scaling, which can result in slower performance or node overloads.",
  "🤝 Interoperability Challenges":
    "Communication between different instances or networks is not always smooth, leading to isolation or incomplete connectivity.",
};

const AboutView = () => {
  return (
    <main className="bg-white text-gray-900">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-screen bg-indigo-50 px-4">
        <div className="text-indigo-800">
          <LogoIcon size={100} />
        </div>
        <h1 className="text-5xl font-bold mb-4">tinyblog.space</h1>
        <p className="text-lg text-gray-600 max-w-lg text-center mb-8">
          <b className="font-bold">tinyblog</b> is a lightweight, open-source
          microblogging platform that allows users to engage people!
        </p>
        <div className="flex gap-2">
          <Link
            to="/auth/register"
            className="bg-indigo-900 font-semibold text-white py-3 px-6 rounded-full hover:bg-indigo-700 transition duration-300"
          >
            Join network
          </Link>
          <Link
            to="/auth/login"
            className="bg-neutral-200 font-semibold text-black py-3 px-6 rounded-full hover:bg-neutral-300 transition duration-300"
          >
            Login
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {Object.keys(FEATURES).map((feature) => (
            <div key={feature} className="bg-gray-100 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">{feature}</h3>
              <p className="text-gray-600">{FEATURES[feature]}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-indigo-50 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Social media should not feel like a casino
          </h2>
          <p className="text-lg text-gray-600 mb-12">
            Ethical design prioritizes user well-being over profits. Social
            platforms should empower, not exploit.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="mb-4">
                {/* SVG Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mx-auto text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8c-1.104 0-2-.896-2-2 0-1.104.896-2 2-2s2 .896 2 2-.896 2-2 2z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 13H9m0 0a3 3 0 11-6 0m6 0a3 3 0 110 6m0-6v-2a3 3 0 00-3-3H6"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">No Manipulation</h3>
              <p className="text-gray-600">
                Social apps should not be designed to keep users hooked for
                endless hours.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="mb-4">
                {/* SVG Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mx-auto text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6l4 2"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16a8 8 0 018 8"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">No Time Theft</h3>
              <p className="text-gray-600">
                Your time is valuable. Platforms should not steal it just to
                increase engagement.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="mb-4">
                {/* SVG Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mx-auto text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.75 6.75a1.5 1.5 0 011.5-1.5h.5a1.5 1.5 0 011.5 1.5V15a1.5 1.5 0 01-1.5 1.5h-.5a1.5 1.5 0 01-1.5-1.5V6.75z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 20.25v-4.5"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">No Exploitation</h3>
              <p className="text-gray-600">
                Social media should not exploit users' emotions and behaviors
                for profit.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Not Decentralized?
        </h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.keys(DECENTRALIZATION).map((item) => (
            <div key={item} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">{item}</h3>
              <p className="text-gray-600">{DECENTRALIZATION[item]}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="py-10 bg-gray-900 text-white text-center">
        <p>&copy; 2024 tinyblog.space. All rights reserved.</p>
        <p className="mt-2">Privacy Policy | Terms of Service</p>
      </footer>
    </main>
  );
};

export default AboutView;
