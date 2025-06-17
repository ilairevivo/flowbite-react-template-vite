import {
  Mail,
  Phone,
  MapPin,
  Users,
  CreditCard,
  Search,
  Database,
  Sparkles,
  Target,
  Globe,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function About() {
  const nav = useNavigate();

  const handleStartJourney = () => {
    nav("/signup");
  };

  return (
     
    <div className="bg-gradient-to-br  from-slate-50 via-blue-50 to-indigo-50  dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="bg-white shadow-lg dark:bg-slate-900">
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="text-center">
            <div className="mb-8 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg dark:from-blue-500 dark:to-indigo-500">
              <CreditCard className="h-10 w-10 text-white" />
            </div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl dark:text-white">
              About{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400">
                BCard
              </span>
            </h1>
            <p className="mx-auto max-w-4xl text-xl leading-relaxed text-gray-600 sm:text-2xl dark:text-gray-300">
              Welcome to BCard, your ultimate solution for creating, browsing,
              and managing business cards with ease. Our innovative platform is
              designed to cater to professionals and businesses of all sizes,
              offering a seamless and efficient way to handle all your business
              card needs.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-xl sm:p-12 lg:p-16 dark:border-slate-700 dark:bg-slate-800">
          <div className="flex flex-col items-center gap-12 lg:flex-row">
            <div className="flex-1">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">
                  Our Mission
                </h2>
              </div>
              <p className="text-lg leading-relaxed text-gray-600 sm:text-xl dark:text-gray-300">
                At BCard, we strive to simplify the way you network and manage
                your professional connections. Our mission is to provide a
                user-friendly, powerful tool that helps you create stunning
                business cards, efficiently manage your contacts, and enhance
                your professional presence.
              </p>
            </div>
            <div className="flex-shrink-0">
              <div className="flex h-64 w-64 items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30">
                <div className="flex h-32 w-32 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg">
                  <Sparkles className="h-16 w-16 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">
            What We{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-pink-400">
              Offer
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600 sm:text-xl dark:text-gray-300">
            Discover our comprehensive suite of tools designed to revolutionize
            your networking experience
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="group rounded-3xl border border-gray-100 bg-white p-8 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl dark:border-slate-700 dark:bg-slate-800">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 transition-transform duration-300 group-hover:rotate-12">
              <CreditCard className="h-8 w-8 text-white" />
            </div>
            <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              Create
            </h3>
            <p className="leading-relaxed text-gray-600 dark:text-gray-300">
              Design unique and professional business cards effortlessly with
              our intuitive creation tools. Choose from a variety of templates,
              customize every detail, and ensure your business card stands out.
            </p>
          </div>

          <div className="group rounded-3xl border border-gray-100 bg-white p-8 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl dark:border-slate-700 dark:bg-slate-800">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 transition-transform duration-300 group-hover:rotate-12">
              <Search className="h-8 w-8 text-white" />
            </div>
            <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              Browse
            </h3>
            <p className="leading-relaxed text-gray-600 dark:text-gray-300">
              Explore a wide range of business cards within our app. Find
              inspiration, discover new contacts, and connect with professionals
              from various industries.
            </p>
          </div>

          <div className="group rounded-3xl border border-gray-100 bg-white p-8 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl dark:border-slate-700 dark:bg-slate-800">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 transition-transform duration-300 group-hover:rotate-12">
              <Database className="h-8 w-8 text-white" />
            </div>
            <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              CRM for Admins
            </h3>
            <p className="leading-relaxed text-gray-600 dark:text-gray-300">
              Our comprehensive CRM features enable admins to manage business
              card data, users data, and maintain valuable business
              relationships. Stay on top of your networking game with advanced
              analytics and reporting tools.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 to-slate-800 shadow-2xl dark:from-slate-800 dark:to-slate-900">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
          <div className="relative p-8 sm:p-12 lg:p-16">
            <div className="mb-12 text-center">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
                Contact Us
              </h2>
              <p className="mx-auto max-w-2xl text-xl text-gray-300">
                Ready to transform your networking experience? Get in touch with
                us today!
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="group text-center">
                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm transition-colors duration-300 group-hover:bg-white/20">
                  <Mail className="h-7 w-7 text-blue-400" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">Email</h3>
                <a
                  href="mailto:ilairevivo@email.com"
                  className="text-blue-400 transition-colors duration-200 hover:text-blue-300"
                >
                  ilairevivo@email.com
                </a>
              </div>

              <div className="group text-center">
                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm transition-colors duration-300 group-hover:bg-white/20">
                  <Phone className="h-7 w-7 text-green-400" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">Phone</h3>
                <a
                  href="tel:972+55-924-6199"
                  className="text-green-400 transition-colors duration-200 hover:text-green-300"
                >
                  055-924-6199
                </a>
              </div>

              <div className="group text-center">
                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm transition-colors duration-300 group-hover:bg-white/20">
                  <MapPin className="h-7 w-7 text-purple-400" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">
                  Address
                </h3>
                <p className="text-purple-400">
                  1234 BCard St
                  <br />
                  BCard City, BCard Country
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <div className="rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-xl sm:p-12 dark:border-slate-700 dark:bg-slate-800">
          <h3 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
            Ready to Get Started?
          </h3>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Join thousands of professionals who trust BCard for their networking
            needs
          </p>
          <button
            onClick={handleStartJourney}
            className="inline-flex transform items-center rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl"
          >
            <Users className="mr-2 h-5 w-5" />
            Start Your Journey
          </button>
        </div>
      </div>
    </div>
  );
}

