import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"

export default function Privacy() {
    return (
        <div className="min-h-screen flex flex-col bg-[#111111] text-white font-sans">
            <Navbar />

            <main className="flex-1 container mx-auto px-6 py-24 max-w-4xl">
                <div className="bg-[#1A1A1A] border border-white/5 rounded-3xl p-8 md:p-12">
                    <h1 className="text-4xl font-bold mb-8 text-[#14F195]">Privacy Policy</h1>

                    <div className="space-y-8 text-[#a19db3] font-light leading-relaxed">
                        <section>
                            <h2 className="text-xl font-semibold text-white mb-4">1. Information We Collect</h2>
                            <p>
                                We collect minimal information required to provide you with our AI website builder services. This may include your email address when you register for an account, and the text prompts you submit to generate websites.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-4">2. How We Use Your Information</h2>
                            <p>
                                The information we collect is used solely to operate, maintain, and improve our services. Your prompts are processed by our AI models to generate code, and your account information is used for authentication and service delivery.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-4">3. Data Security</h2>
                            <p>
                                We implement basic industry-standard security measures to protect your personal information from unauthorized access or disclosure. However, no data transmission over the internet is completely secure.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-4">4. Third-Party Services</h2>
                            <p>
                                We may use basic third-party services (such as payment processors or analytics tools) to help operate our business. These third parties have access to your personal information only to perform specific tasks on our behalf.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-4">5. Changes to This Policy</h2>
                            <p>
                                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
                            </p>
                        </section>

                        <section className="pt-8 border-t border-white/5">
                            <p className="text-sm">
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
