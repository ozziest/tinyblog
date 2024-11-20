import { GitHubIcon } from "@/components/Icons";
import LegalLinks from "@/components/layout/LegalLinks";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const FEATURES: Record<string, string> = {
  "📜 Microblogging":
    "Microblogging lets you share quick thoughts, updates, or ideas with your followers instantly.",
  "🕒 No algorithmic feeds":
    "Users will only see posts from the accounts they follow, displayed in chronological order.",
  "👥 Follower-based feeds":
    "All content is based on who you follow, with no content promotions or algorithmic suggestions.",
  "📢 Ads, but no tracking":
    "We will show ads to support the platform, but no user tracking or behavioral data collection will be involved.",
  "🚫 No personalized ads":
    "Ads are non-intrusive and not tailored based on user profiles or activity.",
  "🔍 Transparency":
    "Our platform will always operate with full transparency about how content and ads are displayed.",
  "🗓️ Historical integrity":
    "Feed data will always be chronological and historically accurate—no curated or manipulated posts.",
  "🔒 Data privacy":
    "User data will not be sold or shared with third parties. You control your data.",
  "🌱 Community-driven":
    "Organic growth will be encouraged through genuine user interactions, not artificial engagement techniques.",
};

const DECENTRALIZATION: Record<string, string> = {
  "🛠️ Complex setup":
    "Users must find and join a node, which requires technical knowledge.",
  "🔍 Difficult to discover":
    "It’s hard for users to discover the right communities or instances without a centralized directory.",
  "🏗️ Trust issues with nodes":
    "Users need to place trust in smaller node providers, which may not be reliable or secure.",
  "⚙️ Fragmented experience":
    "Different nodes can have different rules, moderation standards, and features, leading to inconsistent user experiences.",
  "🌐 Scaling problems":
    "Decentralized networks struggle with scaling, which can result in slower performance or node overloads.",
  "🤝 Interoperability challenges":
    "Communication between different instances or networks is not always smooth, leading to isolation or incomplete connectivity.",
};

const AboutView = () => {
  return (
    <>
      <Helmet>
        <title>About - tinyblog.space</title>
      </Helmet>

      <main className="bg-white text-gray-900">
        <div className="relative isolate overflow-hidden bg-white">
          <svg
            className="absolute inset-0 -z-10 size-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
                width="200"
                height="200"
                x="50%"
                y="-1"
                patternUnits="userSpaceOnUse"
              >
                <path d="M.5 200V.5H200" fill="none" />
              </pattern>
            </defs>
            <rect
              width="100%"
              height="100%"
              strokeWidth="0"
              fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)"
            />
          </svg>
          <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:shrink-0 lg:pt-8">
              <div className="mt-24 sm:mt-32 lg:mt-16">
                <a
                  href="https://github.com/ozziest/tinyblog"
                  target="_blank"
                  className="inline-flex space-x-6"
                  rel="noreferrer"
                >
                  <span className="inline-flex gap-1 items-center space-x-2 text-sm/6 font-medium text-gray-600">
                    <GitHubIcon size={20} /> github.com/ozziest/tinyblog
                  </span>
                </a>
              </div>
              <h1 className="mt-10 text-pretty text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
                tinyblog.space
              </h1>
              <p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
                tinyblog is a lightweight, open-source microblogging platform
                that allows users to engage people! You only see posts from the
                accounts you follow, in chronological order.
              </p>
              <div className="mt-10 flex items-center gap-x-5">
                <Link
                  to="/auth/register"
                  className="rounded-md bg-indigo-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-800 transition"
                >
                  Join network
                </Link>
                <Link
                  to="/auth/login"
                  className="rounded-md bg-neutral-100 px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-neutral-200 transition"
                >
                  Login
                </Link>
                <Link to="/" className="text-sm/6 font-semibold text-gray-900">
                  See public feed <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
            <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
              <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
                <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                  <img
                    src="/feed.jpg"
                    alt="App screenshot"
                    width="2432"
                    height="1442"
                    className="w-[76rem] rounded-md shadow-2xl ring-1 ring-gray-900/10"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section className="py-20 bg-white px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.keys(FEATURES).map((feature) => (
              <div
                key={feature}
                className="bg-gray-100 p-6 rounded-lg shadow-lg"
              >
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
                <h3 className="text-xl font-semibold mb-2">No manipulation</h3>
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
                <h3 className="text-xl font-semibold mb-2">No time theft</h3>
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
                <h3 className="text-xl font-semibold mb-2">No exploitation</h3>
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

        <footer className="py-10 bg-gray-900 text-white text-center te">
          <p>&copy; 2024 tinyblog.space. All rights reserved.</p>
          <p className="mt-2">
            <LegalLinks classes="text-white" />
          </p>
        </footer>
      </main>
    </>
  );
};

export default AboutView;
