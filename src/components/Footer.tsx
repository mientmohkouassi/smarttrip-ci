import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-white py-16 px-6 lg:px-20">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
                <Link href="/" className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>map</span>
                    <span className="font-bold text-xl uppercase tracking-widest">SmartTrip CI</span>
                </Link>
                <div className="flex flex-wrap justify-center gap-8 text-sm font-bold uppercase tracking-tighter">
                    <Link className="text-slate-400 hover:text-white transition-colors" href="/legal/privacy">Privacy Policy</Link>
                    <Link className="text-slate-400 hover:text-white transition-colors" href="/legal/terms">Terms of Service</Link>
                    <Link className="text-slate-400 hover:text-white transition-colors" href="/testimonials">Testimonials</Link>
                    <Link className="text-slate-400 hover:text-white transition-colors" href="/about">About Us</Link>
                    <Link className="text-slate-400 hover:text-white transition-colors" href="/support/faq">FAQ</Link>
                </div>
                <p className="text-slate-500 text-sm font-medium">© 2024 SmartTrip CI. Designed for discovery.</p>
            </div>
        </footer>
    );
}
