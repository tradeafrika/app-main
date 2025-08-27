import { create } from 'zustand'

interface IDProfileData {
    companyName: string
    telephone: string
    firstname:string
    lastname:string;
}

interface IAuthStore {
    User: any | null
    currentTradeRole: 'buyer' | 'supplier' | 'both'
    profile: Partial<IDProfileData>

    setProfile(profile:IDProfileData) :void;
    setUser(user: any): void
    setCurrentTradeRole(tradeRole: 'buyer' | 'supplier'): void
}

const useAuthStore = create<IAuthStore>((set) => ({
    User: null,
    currentTradeRole: 'both',
    profile: {},

    setUser: (user) => set({ User: user }),
    setProfile : (profile) => set({profile : profile}),
    setCurrentTradeRole: (tradeRole) => set({ currentTradeRole: tradeRole }),
}))

export default useAuthStore
