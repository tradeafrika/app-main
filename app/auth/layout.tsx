import Titlebar from "@/components/common/titlebar";

export default function RootLayout({ children }: { children: React.ReactNode }) {

    return (
        <div>
            <Titlebar/>
            {children}
        </div>
    )
}