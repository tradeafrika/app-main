import { Award, Shield, Verified } from "lucide-react"

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-green-50 to-blue-50 border-t border-gray-200 py-8">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Trust Indicators */}
                    <div className="flex items-center justify-center p-6 bg-white rounded-lg shadow-sm">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                <Verified className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <div className="font-semibold text-gray-900">100% Verified Sellers</div>
                                <div className="text-sm text-gray-600">Every supplier is thoroughly verified</div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-center p-6 bg-white rounded-lg shadow-sm">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <Shield className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <div className="font-semibold text-gray-900">Escrow Protection</div>
                                <div className="text-sm text-gray-600">Your payments are secure</div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-center p-6 bg-white rounded-lg shadow-sm">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                <Award className="w-6 h-6 text-purple-600" />
                            </div>
                            <div>
                                <div className="font-semibold text-gray-900">AfCFTA-aligned</div>
                                <div className="text-sm text-gray-600">Supporting African trade</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Footer Info */}
                <div className="text-center py-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                        © 2024 TradeAfrika. Connecting Africa's finest suppliers with global buyers.
                    </p>
                    <div className="flex items-center justify-center space-x-6 mt-2 text-xs text-gray-500">
                        <a href="#" className="hover:text-gray-700">
                            Privacy Policy
                        </a>
                        <a href="#" className="hover:text-gray-700">
                            Terms of Service
                        </a>
                        <a href="#" className="hover:text-gray-700">
                            Contact Us
                        </a>
                        <a href="#" className="hover:text-gray-700">
                            Help Center
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;