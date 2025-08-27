import Image from "next/image";
import logo from "@/assets/tradeafrikalogo.png"

export default function LogoCT() {
    return (
        <div className="flex items-center space-x-3">
            <Image src={logo} height={55} width={55} alt="TradeAfrikaLogo" />
            <span className=" text-black font-light text-lg">TradeAfrika</span>
        </div>
    )
}