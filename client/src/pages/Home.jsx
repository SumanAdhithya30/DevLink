import React from 'react';
import { Link } from 'react-router-dom';
import { FaDatabase, FaSearch, FaProjectDiagram, FaShareAlt, FaUsers } from 'react-icons/fa';

const Home = () => {
    // A helper component for feature cards to keep the code DRY
    const FeatureCard = ({ icon, title, children }) => (
        <div className="bg-gray-800 p-8 rounded-xl transform hover:scale-105 transition-transform duration-300">
            <div className="text-blue-400 mb-4">{icon}</div>
            <h3 className="text-2xl font-bold mb-3 text-white">{title}</h3>
            <p className="text-gray-400">{children}</p>
        </div>
    );

    return (
        <div className="bg-gray-900 text-white">
            {/* ========== Hero Section ========== */}
            {/* The main attention-grabbing section at the top of the page. */}
            <main className="min-h-screen flex items-center justify-center px-4" style={{
                 background: 'radial-gradient(circle, rgba(20,29,56,1) 0%, rgba(17,24,39,1) 100%)'
            }}>
                <div className="max-w-4xl mx-auto text-center py-20">
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight mb-6">
                        Your Centralized Hub for
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"> Developer Talent</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-300 mb-10">
                        Discover, manage, and showcase skilled developers in one seamless platform.
                        DevLink connects incredible talent with exciting opportunities.
                    </p>
                    <div className="flex justify-center items-center gap-4">
                        <Link to="/register" className="px-8 py-3 bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-lg">
                            Get Started for Free
                        </Link>
                        <Link to="/dashboard" className="px-8 py-3 bg-gray-700 rounded-lg font-semibold hover:bg-gray-600 transition-colors duration-300">
                            Go to Dashboard
                        </Link>
                    </div>
                </div>
            </main>
            
            {/* ========== Features Section ========== */}
            {/* Highlights the core benefits of the application. */}
            <section id="features" className="py-20 px-4 bg-gray-900">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold tracking-tight">Why DevLink?</h2>
                        <p className="text-gray-400 mt-4 text-lg">Everything you need to build and find your dream team.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <FeatureCard icon={<FaDatabase size={40} />} title="Centralized Profiles">
                            Keep all developer information—skills, projects, and contact details—organized in one single, accessible source of truth.
                        </FeatureCard>
                        <FeatureCard icon={<FaSearch size={40} />} title="Advanced Search & Filter">
                            Instantly find the perfect developer for any project with powerful, intuitive filters for domain, tech stack, and more.
                        </FeatureCard>
                        <FeatureCard icon={<FaProjectDiagram size={40} />} title="Showcase Projects">
                            Enable developers to build beautiful, detailed portfolios of their work, letting their skills speak for themselves.
                        </FeatureCard>
                    </div>
                </div>
            </section>
            
            {/* ========== How It Works Section ========== */}
            {/* A simple step-by-step guide to reduce user friction. */}
            <section id="how-it-works" className="py-20 px-4 bg-gray-800">
                 <div className="max-w-5xl mx-auto">
                     <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold tracking-tight">Get Started in Minutes</h2>
                        <p className="text-gray-400 mt-4 text-lg">Follow these simple steps to join our community.</p>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-center gap-12">
                        {/* Step 1 */}
                        <div className="text-center max-w-sm">
                            <div className="flex items-center justify-center h-24 w-24 mx-auto mb-6 bg-gray-700 text-blue-400 rounded-full border-4 border-blue-400">
                                <span className="text-3xl font-bold">1</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Create an Account</h3>
                            <p className="text-gray-400">Sign up with our simple and secure registration process to get started.</p>
                        </div>
                        {/* Step 2 */}
                        <div className="text-center max-w-sm">
                            <div className="flex items-center justify-center h-24 w-24 mx-auto mb-6 bg-gray-700 text-blue-400 rounded-full border-4 border-blue-400">
                                <span className="text-3xl font-bold">2</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Build Your Profile</h3>
                            <p className="text-gray-400">Add developers, list their skills, and showcase their best projects for everyone to see.</p>
                        </div>
                        {/* Step 3 */}
                        <div className="text-center max-w-sm">
                           <div className="flex items-center justify-center h-24 w-24 mx-auto mb-6 bg-gray-700 text-blue-400 rounded-full border-4 border-blue-400">
                                <span className="text-3xl font-bold">3</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Discover & Connect</h3>
                            <p className="text-gray-400">Use our powerful tools to find the talent you need and connect with them for opportunities.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========== Final Call to Action (CTA) ========== */}
            {/* A final, strong encouragement for the user to sign up before the footer. */}
            <section className="py-20 px-4 text-center" style={{
                background: 'radial-gradient(circle, rgba(20,29,56,1) 0%, rgba(17,24,39,1) 100%)'
            }}>
                 <h2 className="text-4xl font-bold tracking-tight mb-4">Ready to Showcase Your Talent?</h2>
                 <p className="text-lg text-gray-300 mb-8 max-w-xl mx-auto">Join the DevLink community today and put your developers on the map.</p>
                 <Link to="/register" className="px-10 py-4 bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-lg text-lg">
                    Sign Up Now
                </Link>
            </section>
            
            {/* ========== Footer ========== */}
            {/* Standard footer content for a professional look. */}
            <footer className="bg-gray-900 border-t border-gray-700 py-8 px-4">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                    <p className="text-gray-400">&copy; {new Date().getFullYear()} DevLink. All rights reserved.</p>
                    <div className="flex items-center gap-6 mt-4 md:mt-0">
                       <Link to="/about" className="text-gray-400 hover:text-white">About</Link>
                       <Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link>
                       <Link to="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;