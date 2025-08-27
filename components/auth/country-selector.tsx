'use client'


/**
 * This will be the country selector for the user to actually select countries
 */

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'

interface Country {
    name: string
    code: string
    flag: string
    dialCode: string
}

const africanCountries: Country[] = [
    { name: 'Nigeria', code: 'NG', flag: '🇳🇬', dialCode: '+234' },
    { name: 'South Africa', code: 'ZA', flag: '🇿🇦', dialCode: '+27' },
    { name: 'Kenya', code: 'KE', flag: '🇰🇪', dialCode: '+254' },
    { name: 'Ghana', code: 'GH', flag: '🇬🇭', dialCode: '+233' },
    { name: 'Egypt', code: 'EG', flag: '🇪🇬', dialCode: '+20' },
    { name: 'Morocco', code: 'MA', flag: '🇲🇦', dialCode: '+212' },
    { name: 'Ethiopia', code: 'ET', flag: '🇪🇹', dialCode: '+251' },
    { name: 'Uganda', code: 'UG', flag: '🇺🇬', dialCode: '+256' },
    { name: 'Tanzania', code: 'TZ', flag: '🇹🇿', dialCode: '+255' },
    { name: 'Algeria', code: 'DZ', flag: '🇩🇿', dialCode: '+213' },
    { name: 'Tunisia', code: 'TN', flag: '🇹🇳', dialCode: '+216' },
    { name: 'Cameroon', code: 'CM', flag: '🇨🇲', dialCode: '+237' },
    { name: 'Ivory Coast', code: 'CI', flag: '🇨🇮', dialCode: '+225' },
    { name: 'Senegal', code: 'SN', flag: '🇸🇳', dialCode: '+221' },
    { name: 'Zimbabwe', code: 'ZW', flag: '🇿🇼', dialCode: '+263' },
    { name: 'Zambia', code: 'ZM', flag: '🇿🇲', dialCode: '+260' },
    { name: 'Botswana', code: 'BW', flag: '🇧🇼', dialCode: '+267' },
    { name: 'Rwanda', code: 'RW', flag: '🇷🇼', dialCode: '+250' },
    { name: 'Mali', code: 'ML', flag: '🇲🇱', dialCode: '+223' },
    { name: 'Burkina Faso', code: 'BF', flag: '🇧🇫', dialCode: '+226' },
]

interface CountrySelectorProps {
    value: string
    onChange: (value: string) => void
    phoneValue: string
    onPhoneChange: (value: string) => void
}

export function CountrySelector({ value, onChange, phoneValue, onPhoneChange }: CountrySelectorProps) {
    const [selectedCountry, setSelectedCountry] = useState<Country>(
        africanCountries.find((country) => country.dialCode === value) || africanCountries[0]
    )

    const handleCountrySelect = (country: Country) => {
        setSelectedCountry(country)
        onChange(country.dialCode)
    }

    return (
        <div className="flex">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        className="flex items-center space-x-2 px-3 border-r-0 rounded-r-none border-gray-200 bg-gray-50 hover:bg-gray-100 h-12"
                    >
                        <span className="text-lg">{selectedCountry.flag}</span>
                        <span className="text-sm font-medium">{selectedCountry.dialCode}</span>
                        <ChevronDown size={16} className="text-gray-400" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 max-h-64 overflow-y-auto">
                    {africanCountries.map((country) => (
                        <DropdownMenuItem
                            key={country.code}
                            onClick={() => handleCountrySelect(country)}
                            className="flex items-center space-x-3 cursor-pointer"
                        >
                            <span className="text-lg">{country.flag}</span>
                            <div className="flex-1">
                                <div className="font-medium">{country.name}</div>
                                <div className="text-sm text-gray-500">{country.dialCode}</div>
                            </div>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
            <Input
                type="tel"
                placeholder="Phone number"
                value={phoneValue}
                onChange={(e) => onPhoneChange(e.target.value)}
                className="flex-1 h-12 border-l-0 rounded-l-none border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            />
        </div>
    )
}
