import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"

export default function Privacy() {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#E2EAF1] to-[#CCDDEB] dark:from-[#050505] dark:to-[#0A0A0B] text-gray-900 dark:text-white font-sans transition-colors duration-500">
            <Navbar />

            <main className="flex-1 container mx-auto px-6 py-24 max-w-4xl page-fade-in relative z-10">
                <div className="bg-white/80 dark:bg-[#111]/80 backdrop-blur-3xl shadow-sm border border-[#EAF2F8] dark:border-white/10 p-8 md:p-12 rounded-[2.5rem] transition-colors duration-500">
                    <h1 className="text-4xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 uppercase tracking-tight">Privacy Policy</h1>

                    <div className="space-y-8 text-gray-600 dark:text-[#9CA3AF] font-medium leading-relaxed transition-colors">
                        <section>
                            <h2 className="text-xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-wide transition-colors">1. Information We Collect</h2>
                            <p>
                                We collect minimal information required to provide you with our AI website builder services. This may include your email address when you register for an account, and the text prompts you submit to generate websites.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-wide transition-colors">2. How We Use Your Information</h2>
                            <p>
                                The information we collect is used solely to operate, maintain, and improve our services. Your prompts are processed by our AI models to generate code, and your account information is used for authentication and service delivery.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-wide transition-colors">3. Data Security</h2>
                            <p>
                                We implement basic industry-standard security measures to protect your personal information from unauthorized access or disclosure. However, no data transmission over the internet is completely secure.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-wide transition-colors">4. Third-Party Services</h2>
                            <p>
                                We may use basic third-party services (such as payment processors or analytics tools) to help operate our business. These third parties have access to your personal information only to perform specific tasks on our behalf.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-wide transition-colors">5. Changes to This Policy</h2>
                            <p>
                                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
                            </p>
                        </section>

                        <section className="pt-8 border-t border-gray-200 dark:border-white/10 transition-colors">
                            <p className="text-sm font-bold tracking-wide">
                                Last updated: February 2026. If you have any questions about this Privacy Policy, please contact us at support@divstack.ai.
                            </p>
                        </section>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
