import { Bell, Clock, MessageSquare, Search, User } from "lucide-react"
import { useState } from "react"
import LogoCT from "../auth/logo-ct"

/**
 * 
 * Header component
 * @returns 
 * 
 */

const Header = () => {


    const [isSellerMode, setIsSellerMode] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [showUserMenu, setShowUserMenu] = useState(false)

    const [notifications] = useState([
        { id: 1, type: 'quote', message: 'New quote request for Cocoa Beans', time: '2 min ago', unread: true },
        { id: 2, type: 'order', message: 'Order #TB001 has been shipped', time: '1 hour ago', unread: false },
    ])

    const unreadNotifications = notifications.filter((n) => n.unread).length

    return (
        <header className="bg-white  sticky top-0 z-50 shadow-sm h-[65px]">
            <div className=" mx-auto  sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo and Brand */}
                    <div className="flex items-center space-x-6">
                        <div className="flex items-center cursor-pointer">
                            <LogoCT/>
                        </div>

                        {/* Mode Toggle */}
                        <div className="hidden md:flex items-center bg-gray-100 p-1 rounded-lg">
                            <button
                                onClick={() => setIsSellerMode(false)}
                                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                                    !isSellerMode
                                        ? 'bg-green-600 text-white shadow-md'
                                        : 'text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                <div className="w-2 h-2 bg-current rounded-full"></div>
                                <span className="font-light">Buyer</span>
                            </button>
                            <button
                                onClick={() => setIsSellerMode(true)}
                                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                                    isSellerMode
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                <div className="w-2 h-2 bg-current rounded-full"></div>
                                <span className="font-light">Seller</span>
                            </button>
                        </div>
                    </div>

                    {/* Enhanced Search */}
                    <div className="flex-1 max-w-2xl mx-8">
                        <div className="relative">
                            <Search className="absolute  font-light left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search products, suppliers, categories..."
                                className="w-full font-light pl-12 pr-4 py-2 border-1 border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                            />
                            {searchQuery && (
                                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg mt-1 shadow-lg max-h-64 overflow-y-auto z-50">
                                    <div className="p-3">
                                        <div className="text-sm text-gray-500 mb-2">Recent searches</div>
                                        <div className="space-y-2">
                                            <div className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                                                <Clock className="w-4 h-4 text-gray-400" />
                                                <span>Premium Coffee Beans</span>
                                            </div>
                                            <div className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                                                <Clock className="w-4 h-4 text-gray-400" />
                                                <span>Organic Cocoa</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* User Actions */}
                    <div className="flex items-center space-x-4">
                        {/* Notifications */}
                        <div className="relative">
                            <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
                                <Bell className="w-6 h-6" />
                                {unreadNotifications > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                                        {unreadNotifications}
                                    </span>
                                )}
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="relative">
                            <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
                                <MessageSquare className="w-6 h-6" />
                                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                                    2
                                </span>
                            </button>
                        </div>

                        {/* User Menu */}
                        <div className="relative">
                            <button
                                onClick={() => setShowUserMenu(!showUserMenu)}
                                className="flex items-center space-x-2 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <User className="w-6 h-6" />
                            </button>

                            {showUserMenu && (
                                <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                                    <div className="px-4 py-3 border-b border-gray-100">
                                        <div className="font-light text-gray-900 ">John Doe</div>
                                        <div className="text-sm text-gray-500">john@example.com</div>
                                        <div className="text-xs text-green-600 mt-1">✓ Verified Buyer</div>
                                    </div>
                                    <div className="py-2">
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 font-light hover:bg-gray-50">
                                            My Dashboard
                                        </a>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 font-light hover:bg-gray-50">
                                            Order History
                                        </a>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 font-light hover:bg-gray-50">
                                            Saved Products
                                        </a>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 font-light hover:bg-gray-50">
                                            Settings
                                        </a>
                                        <hr className="my-2" />
                                        <a href="#" className="block px-4 py-2 text-sm text-red-600 font-light hover:bg-gray-50">
                                            Sign Out
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}


export default Header;