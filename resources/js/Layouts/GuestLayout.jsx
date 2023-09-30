import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";

export default function Guest({ children }) {
    const baseUrl = window.location.origin;

    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-white md:bg-gray-100">
            <div className="w-full sm:max-w-md md:bg-white mt-6 px-6 py-4  overflow-hidden sm:rounded-lg">
                <div className="pt-5 pb-7 font-semibold text-red-400 text-center text-lg">
                    Wellcome to 5Dreams
                </div>

                {children}
            </div>
        </div>
    );
}
