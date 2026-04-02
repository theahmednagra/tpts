import React, { useEffect, useRef, useState } from "react";
import {
	Menu,
	X,
	PhoneCall,
	Mail,
	Globe,
	ArrowRight,
	CheckCircle,
	MapPin,
	Wrench,
	Droplet,
	Thermometer,
	Layers,
	Clock,
	Map,
	Facebook,
	Instagram,
	Send,
	Zap,
	Star,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from '@emailjs/browser';
import logo from "./assets/logo.png";
import heroImg from "./assets/heroImg.jpg";

// WhatsApp Icon Component
const WhatsappIcon = ({ className }) => (
	<svg className={className} viewBox="0 0 24 24" fill="currentColor">
		<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
	</svg>
);

// Professional single-page site with smooth scroll + scrollspy
export default function AlqamorPremiumUI() {
	const [menuOpen, setMenuOpen] = useState(false);
	const [servicesOpen, setServicesOpen] = useState(false);
	const [activeId, setActiveId] = useState("home");
	const [formStatus, setFormStatus] = useState({ loading: false, message: "", type: "" });
	const formRef = useRef();

	const sectionIds = ["home", "about", "services", "locations", "projects", "reviews"];
	const observersRef = useRef([]);

	// Initialize EmailJS (Replace with your actual keys)
	useEffect(() => {
		emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY); // EmailJS public key
	}, []);

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();
		setFormStatus({ loading: true, message: "", type: "" });

		try {
			// Send email using EmailJS
			const result = await emailjs.sendForm(
				import.meta.env.VITE_EMAILJS_SERVICE_ID, // EmailJS service ID
				import.meta.env.VITE_EMAILJS_TEMPLATE_ID, // EmailJS template ID
				formRef.current
			);

			setFormStatus({
				loading: false,
				message: "Thank you! Your request has been sent successfully. We'll contact you within 24 hours.",
				type: "success"
			});

			// Reset form
			formRef.current.reset();

			// Clear success message after 5 seconds
			setTimeout(() => {
				setFormStatus({ loading: false, message: "", type: "" });
			}, 5000);

		} catch (error) {
			console.error('EmailJS Error:', error);
			setFormStatus({
				loading: false,
				message: "Sorry, something went wrong. Please call us directly at +971 50 368 2005",
				type: "error"
			});
		}
	};

	// Social media links
	const socialLinks = [
		{ name: "Facebook", color: "bg-blue-600", hoverColor: "hover:bg-blue-700", icon: Facebook, link: "https://facebook.com/tpts.dxb" },
		{ name: "Instagram", color: "bg-pink-600", hoverColor: "hover:bg-pink-700", icon: Instagram, link: "https://instagram.com/tpts.dxb" },
		{ name: "WhatsApp", color: "bg-green-600", hoverColor: "hover:bg-green-700", icon: WhatsappIcon, link: "https://wa.me/971503578525" },
	];

	// Smooth scroll helper
	const scrollTo = (id) => {
		const el = document.getElementById(id);
		if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
		setMenuOpen(false);
	};

	// Scrollspy using IntersectionObserver
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) setActiveId(entry.target.id);
				});
			},
			{ root: null, rootMargin: "-30% 0px -40% 0px", threshold: 0 }
		);

		sectionIds.forEach((id) => {
			const el = document.getElementById(id);
			if (el) {
				observer.observe(el);
				observersRef.current.push(el);
			}
		});

		return () => {
			observer.disconnect();
			observersRef.current = [];
		};
	}, []);

	// Business services list with descriptions
	const services = [
		{ name: "Plaster Works", desc: "Expert plastering for smooth, durable walls and ceilings", icon: <Layers className="w-6 h-6" /> },
		{ name: "Painting Contracting", desc: "Professional interior and exterior painting services", icon: <Droplet className="w-6 h-6" /> },
		{ name: "Steel Products Installation", desc: "Fabrication and installation of steel structures", icon: <Wrench className="w-6 h-6" /> },
		{ name: "Carpentry & Wood Flooring", desc: "Custom woodwork and premium flooring installation", icon: <Wrench className="w-6 h-6" /> },
		{ name: "Plumbing & Sanitary", desc: "Complete plumbing solutions and fixture installation", icon: <Droplet className="w-6 h-6" /> },
		{ name: "Electrical Services", desc: "Safe, code-compliant electrical work and repairs", icon: <Wrench className="w-6 h-6" /> },
		{ name: "Fittings & Fixtures", desc: "Repair and maintenance of all building fixtures", icon: <Wrench className="w-6 h-6" /> },
		{ name: "Swimming Pool Maintenance", desc: "Regular cleaning, chemical balancing, and repairs", icon: <Droplet className="w-6 h-6" /> },
		{ name: "HVAC Systems", desc: "AC installation, maintenance, and air filtration", icon: <Thermometer className="w-6 h-6" /> },
		{ name: "Electromechanical Equipment", desc: "Installation and maintenance of complex systems", icon: <Wrench className="w-6 h-6" /> },
	];

	// Locations
	const locations = [
		"Dubai",
		"Abu Dhabi",
		"Sharjah",
		"Ajman",
		"Ras Al Khaimah",
		"Fujairah",
		"Umm Al Quwain",
	];

	// Reviews
	const reviews = [
		{
			name: "Mohammed A.",
			location: "Dubai Marina",
			text: "Professional and punctual — our pool was back to perfect condition in 48 hours.",
			rating: 5,
		},
		{
			name: "Sara H.",
			location: "Abu Dhabi",
			text: "Excellent plaster and tiling work. Clean crew and great finish.",
			rating: 5,
		},
		{
			name: "Khalid R.",
			location: "Sharjah",
			text: "AC installation done with care, highly recommended for residential and commercial.",
			rating: 5,
		},
	];

	// Contact info
	const contactMethods = [
		{ icon: <PhoneCall className="w-5 h-5" />, label: "Call Us", value: "+971 50 368 2005", value2: "+971 50 357 8525" },
		{ icon: <Mail className="w-5 h-5" />, label: "Email", value: "tpts.dxb@gmail.com", value2: null },
		{ icon: <Globe className="w-5 h-5" />, label: "Head Office", value: "Hor Al Anz, Dubai", value2: null },
		{ icon: <Clock className="w-5 h-5" />, label: "Working Hours", value: "Monday - Saturday: 9:00 AM - 10:00 PM", value2: "Sunday: Closed" },
		{ icon: <Map className="w-5 h-5" />, label: "Service Areas", value: "All 7 Emirates", value2: null }
	];

	return (
		<div className="min-h-screen bg-white text-slate-900 font-trebuche">
			{/* NAV */}
			<header className="fixed inset-x-0 top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
					<a onClick={() => scrollTo("home")} className="flex items-center gap-2 sm:gap-3 cursor-pointer">
						<img src={logo} alt="TPTS Logo" className="h-8 sm:h-9" />
						<div className="text-xs hidden sm:block">
							<div className="font-semibold text-slate-800">Top Performance Technical Services</div>
							<div className="text-slate-600">Maintenance & Contracting — UAE</div>
						</div>
					</a>

					<nav className="hidden lg:flex items-center gap-6 text-sm">
						{sectionIds.map((id) => (
							<button
								key={id}
								onClick={() => scrollTo(id)}
								className={`px-3 py-2 rounded-md transition-colors ${activeId === id ? "text-sky-600 font-semibold" : "text-slate-700 hover:text-slate-900"}`}
							>
								{id.charAt(0).toUpperCase() + id.slice(1)}
							</button>
						))}

						<div className="ml-2 flex items-center gap-3">
							<button className="px-5 py-2.5 rounded-lg border-2 border-slate-200 text-sm font-medium hover:border-sky-600 hover:text-sky-600 transition-all" onClick={() => scrollTo("contact")}>Get Quote</button>
							<button className="px-5 py-2.5 rounded-lg bg-sky-600 text-white font-semibold hover:bg-sky-700 transition-colors shadow-sm" onClick={() => scrollTo("contact")}>
								Contact Us
							</button>
						</div>
					</nav>

					<div className="lg:hidden">
						<button className="p-2 rounded-lg bg-sky-600 text-white shadow-md hover:bg-sky-700 transition-colors" onClick={() => setMenuOpen(true)}>
							<Menu className="w-6 h-6" />
						</button>
					</div>
				</div>

				{/* MOBILE MENU */}
				<AnimatePresence>
					{menuOpen && (
						<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="lg:hidden h-full min-h-screen">
							<div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
							<motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25 }} className="fixed right-0 top-0 h-full w-80 bg-white p-6 shadow-2xl">
								<div className="flex items-center justify-between mb-8">
									<div>
										<div className="font-bold text-lg text-slate-800">TPTS</div>
										<div className="text-xs text-slate-500">UAE's Trusted Partner</div>
									</div>
									<button onClick={() => setMenuOpen(false)} className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors">
										<X className="w-5 h-5" />
									</button>
								</div>

								<div className="flex flex-col gap-1">
									{sectionIds.map((id) => (
										<button
											key={id}
											onClick={() => scrollTo(id)}
											className={`text-left py-3 px-4 rounded-lg transition-colors ${activeId === id ? "bg-sky-50 text-sky-600 font-semibold" : "text-slate-700 hover:bg-slate-50"}`}
										>
											{id.charAt(0).toUpperCase() + id.slice(1)}
										</button>
									))}
								</div>

								<div className="mt-8 space-y-3">
									<button className="w-full py-3 rounded-lg bg-sky-600 text-white font-semibold hover:bg-sky-700 transition-colors shadow-md" onClick={() => { scrollTo("contact"); setMenuOpen(false); }}>
										Get Free Quote
									</button>
								</div>
							</motion.div>
						</motion.div>
					)}
				</AnimatePresence>
			</header>

			<main className="pt-16 sm:pt-20">
				{/* HERO */}
				<section id="home" className="max-w-7xl mx-auto mt-4 sm:mt-8 px-4 sm:px-6 py-6 sm:py-8 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
					<div>
						<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="inline-block mb-4 px-4 py-2 bg-sky-50 text-sky-700 rounded-full text-sm font-medium">
							Trusted by 500+ UAE Clients
						</motion.div>

						<motion.h1 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-slate-900">
							Professional Maintenance & Contracting Services Across the UAE
						</motion.h1>

						<motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="mt-4 sm:mt-6 text-base sm:text-lg text-slate-600 max-w-xl">
							From plaster and painting to MEP systems and pool maintenance—we deliver excellence with certified technicians, quality materials, and a commitment to your complete satisfaction.
						</motion.p>

						<div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
							<button onClick={() => scrollTo("contact")} className="px-6 sm:px-8 py-3.5 rounded-lg bg-sky-600 text-white font-semibold flex items-center justify-center gap-2 hover:bg-sky-700 transition-all shadow-lg shadow-sky-600/30">
								Get Free Quote <ArrowRight className="w-4 h-4" />
							</button>
							<button onClick={() => scrollTo("services")} className="px-6 sm:px-8 py-3.5 rounded-lg border-2 border-slate-200 hover:border-sky-600 hover:text-sky-600 transition-all font-medium">
								View Our Services
							</button>
						</div>

						{/* Social Media Buttons */}
						<div className="mt-8 sm:mt-8">
							<p className="text-sm text-slate-600 mb-4 font-medium text-center sm:text-left">
								Connect with us through our digital spaces
							</p>

							<div className="flex flex-wrap items-center gap-4 justify-center sm:justify-start">
								{socialLinks.map((social) => (
									<motion.a
										key={social.name}
										href={social.link}
										target="_blank"
										rel="noopener noreferrer"
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										className={`${social.color} ${social.hoverColor} text-white px-5 py-3 rounded-lg font-medium flex items-center gap-2 transition-all shadow-md flex-1 sm:flex-none justify-center min-w-[120px] sm:min-w-0`}
									>
										<social.icon className="w-5 h-5 shrink-0" />
										<span className="whitespace-nowrap">{social.name}</span>
									</motion.a>
								))}
							</div>
						</div>
					</div>

					{/* Hero Image */}
					<div>
						<motion.div
							initial={{ opacity: 0, scale: 0.98 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ delay: 0.06 }}
							className="mt-4 sm:mt-8 w-full h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl bg-slate-100"
						>
							<img src={heroImg} alt="TPTS Professional Services" className="w-full h-full object-cover" />
						</motion.div>

						<div className="mt-6 flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm text-slate-600">
							<div className="flex items-center gap-2">
								<CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
								<div>Licensed & Insured</div>
							</div>
							<div className="flex items-center gap-2">
								<CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
								<div>24/7 Emergency Support</div>
							</div>
							<div className="flex items-center gap-2">
								<CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
								<div>Same-Day Service Available</div>
							</div>
						</div>
					</div>
				</section>

				{/* ABOUT */}
				<section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 bg-gradient-to-b from-white to-slate-50">
					<div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
						<div>
							<div className="inline-block mb-3 px-3 py-1 bg-sky-50 text-sky-700 rounded-full text-xs font-semibold uppercase tracking-wide">
								About TPTS
							</div>
							<h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
								Your Trusted Partner for Complete Building Solutions
							</h2>
							<p className="mt-4 sm:mt-6 text-slate-600 leading-relaxed">
								Since 2023, TPTS has been the go-to maintenance and contracting partner for homes, businesses, and developers across the UAE. We combine skilled craftsmanship with modern technology to deliver projects on time, within budget, and beyond expectations.
							</p>
							<p className="mt-4 text-slate-600 leading-relaxed">
								Our team of certified professionals brings years of experience in plaster works, MEP systems, swimming pool maintenance, and more—ensuring every project meets the highest safety and quality standards.
							</p>

							<div className="mt-6 sm:mt-8 grid grid-cols-2 gap-4">
								<div className="p-4 sm:p-5 rounded-xl border-2 border-gray-200 bg-white hover:border-sky-600 transition-all">
									<div className="text-4xl sm:text-5xl font-bold text-sky-600 mb-1">2+</div>
									<div className="text-sm text-slate-600">Years of Excellence</div>
								</div>
								<div className="p-4 sm:p-5 rounded-xl border-2 border-gray-200 bg-white hover:border-emerald-600 transition-all">
									<div className="text-4xl sm:text-5xl font-bold text-emerald-600 mb-1">30+</div>
									<div className="text-sm text-slate-600">Expert Technicians</div>
								</div>
								<div className="p-4 sm:p-5 rounded-xl border-2 border-gray-200 bg-white hover:border-amber-600 transition-all">
									<div className="text-4xl sm:text-5xl font-bold text-amber-600 mb-1">500+</div>
									<div className="text-sm text-slate-600">Projects Completed</div>
								</div>
								<div className="p-4 sm:p-5 rounded-xl border-2 border-gray-200 bg-white hover:border-purple-600 transition-all">
									<div className="text-4xl sm:text-5xl font-bold text-purple-600 mb-1">7</div>
									<div className="text-sm text-slate-600">Emirates Covered</div>
								</div>
							</div>
						</div>

						<div className="space-y-4">
							<div className="rounded-2xl overflow-hidden shadow-xl bg-white p-6 sm:p-8 border border-gray-200">
								<div className="flex items-start gap-4 mb-4">
									<div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600 flex-shrink-0">
										<CheckCircle className="w-6 h-6" />
									</div>
									<div>
										<h4 className="font-bold text-lg text-slate-900">Quality Assurance</h4>
										<p className="mt-2 text-slate-600 text-sm leading-relaxed">
											Every project undergoes rigorous quality checks. We use premium materials and follow ISO-aligned processes to ensure lasting results.
										</p>
									</div>
								</div>

								<div className="flex items-start gap-4 mb-4">
									<div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 flex-shrink-0">
										<CheckCircle className="w-6 h-6" />
									</div>
									<div>
										<h4 className="font-bold text-lg text-slate-900">Safety First</h4>
										<p className="mt-2 text-slate-600 text-sm leading-relaxed">
											All our teams are fully insured, trained in UAE health & safety regulations, and equipped for high-risk tasks.
										</p>
									</div>
								</div>

								<div className="flex items-start gap-4">
									<div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 flex-shrink-0">
										<CheckCircle className="w-6 h-6" />
									</div>
									<div>
										<h4 className="font-bold text-lg text-slate-900">Transparent Pricing</h4>
										<p className="mt-2 text-slate-600 text-sm leading-relaxed">
											No hidden fees, no surprises. Get detailed quotes upfront and clear communication throughout your project.
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* SERVICES */}
				<section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 bg-slate-50">
					<div className="text-center mb-12">
						<div className="inline-block mb-3 px-3 py-1 bg-sky-50 text-sky-700 rounded-full text-xs font-semibold uppercase tracking-wide">
							Our Services
						</div>
						<h3 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
							Comprehensive Solutions for Every Need
						</h3>
						<p className="text-slate-600 max-w-2xl mx-auto">
							From routine maintenance to complex installations, our certified team delivers exceptional results with guaranteed workmanship and timely completion.
						</p>
					</div>

					<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
						{services.map((s, idx) => (
							<motion.div
								key={`${s}-${idx}`} // Unique key
								initial={{ opacity: 0, scale: 0.9 }}
								whileInView={{ opacity: 1, scale: 1 }}
								viewport={{ once: true }}
								transition={{
									delay: idx * 0.05,
									scale: { type: "tween", stiffness: 100 }
								}}
								whileHover={{ scale: 1.05 }}
								className="p-5 rounded-2xl border-2 border-gray-200 bg-white hover:border-sky-500 hover:shadow-lg focus:border-sky-500"
							>
								<div className="flex items-start gap-4">
									<div className="p-3 rounded-xl bg-gradient-to-br from-sky-50 to-sky-100 text-sky-600 flex-shrink-0">
										{s.icon}
									</div>
									<div className="flex-1">
										<div className="font-bold text-lg text-slate-900 mb-2">{s.name}</div>
										<div className="text-sm text-slate-600 leading-relaxed">{s.desc}</div>
									</div>
								</div>
							</motion.div>
						))}
					</div>

					<div className="mt-12 text-center">
						<button
							onClick={() => scrollTo("contact")}
							className="px-8 py-4 rounded-lg bg-sky-600 text-white font-semibold hover:bg-sky-700 transition-all shadow-lg shadow-sky-600/30 inline-flex items-center gap-2"
						>
							Request a Service <ArrowRight className="w-5 h-5" />
						</button>
						<p className="mt-4 text-sm text-slate-600 flex items-center justify-center gap-2">
							<Zap className="w-5 h-5 text-amber-500" />
							<span>Same-day service available for emergency requests</span>
						</p>
					</div>
				</section>

				{/* LOCATIONS */}
				<section id="locations" className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
					<div className="text-center mb-12">
						<div className="inline-block mb-3 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-semibold uppercase tracking-wide">
							Service Coverage
						</div>
						<h3 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
							Proudly Serving All 7 Emirates
						</h3>
						<p className="text-slate-600 max-w-2xl mx-auto">
							Whether you're in Dubai, Abu Dhabi, or anywhere across the UAE, our mobile teams are ready to deliver top-quality service at your doorstep.
						</p>
					</div>

					<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
						{locations.map((l, idx) => (
							<motion.div
								key={`${l}-${idx}`} // Unique key
								initial={{ opacity: 0, scale: 0.9 }}
								whileInView={{ opacity: 1, scale: 1 }}
								viewport={{ once: true }}
								transition={{
									delay: idx * 0.05,
									scale: { type: "spring", stiffness: 300 }
								}}
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className="p-5 rounded-2xl border-2 border-gray-200 bg-white hover:border-emerald-500 hover:shadow-lg focus:border-emerald-500"
							>
								<div className="flex flex-col items-center text-center gap-3">
									<div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center text-emerald-600">
										<MapPin className="w-7 h-7" />
									</div>
									<div className="font-bold text-slate-900">{l}</div>
								</div>
							</motion.div>
						))}
					</div>

					<div className="mt-12 text-center p-6 sm:p-8 bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl border-2 border-sky-200">
						<h4 className="font-bold text-xl text-slate-900 mb-2">Need Service Outside These Areas?</h4>
						<p className="text-slate-600 mb-4">Contact us to discuss your project—we may be able to arrange special service for your location.</p>
						<button
							onClick={() => scrollTo("contact")}
							className="px-6 py-3 rounded-lg bg-sky-600 text-white font-semibold hover:bg-sky-700 transition-colors"
						>
							Contact Us
						</button>
					</div>
				</section>

				{/* PROJECTS */}
				<section id="projects" className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 bg-slate-50">
					<div className="text-center mb-12">
						<div className="inline-block mb-3 px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-semibold uppercase tracking-wide">
							Our Work
						</div>
						<h3 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
							Recent Projects
						</h3>
						<p className="text-slate-600 max-w-2xl mx-auto">
							Take a look at some of our completed projects across residential, commercial, and industrial sectors in the UAE.
						</p>
					</div>

					<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{[
							{ title: "Villa Renovation", location: "Dubai Marina", image: "https://plus.unsplash.com/premium_photo-1764691452224-750b69bcdc0a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fHZpbGxhJTIwY29uc3RydWN0aW9ufGVufDB8fDB8fHww" },
							{ title: "Pool Maintenance", location: "Palm Jumeirah", image: "https://images.unsplash.com/photo-1747171979422-de284341cdfa?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
							{ title: "Commercial HVAC", location: "Business Bay", image: "https://plus.unsplash.com/premium_photo-1682145344450-34d8323dec84?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aHZhY3xlbnwwfHwwfHx8MA%3D%3D" },
							{ title: "Residential Plumbing", location: "Abu Dhabi", image: "https://images.unsplash.com/photo-1523552322653-4ca2658acbb0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzJ8fHBsdW1iaW5nfGVufDB8fDB8fHww" },
							{ title: "Office Painting", location: "Sharjah", image: "https://plus.unsplash.com/premium_photo-1706022584328-dcfe45466238?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8b2ZmaWNlJTIwcGFpbnRpbmd8ZW58MHx8MHx8fDA%3D" },
							{ title: "Steel Installation", location: "Ajman", image: "https://images.unsplash.com/photo-1634231647709-06609f7dd3ca?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDc3fHx8ZW58MHx8fHx8" }
						].map((project, n) => (
							<motion.div
								key={n}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: n * 0.08 }}
								className="rounded-2xl overflow-hidden bg-white border-2 border-gray-200 hover:border-purple-600 transition-all shadow-lg group"
							>
								<img src={project.image} alt="" className="w-full h-56 group-hover:scale-105 transition-transform duration-300" />
								<div className="p-5">
									<h4 className="font-bold text-lg text-slate-900">{project.title}</h4>
									<p className="text-sm text-slate-600 flex items-center gap-1 mt-1">
										<MapPin className="w-4 h-4" /> {project.location}
									</p>
								</div>
							</motion.div>
						))}
					</div>
				</section>

				{/* REVIEWS */}
				<section id="reviews" className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
					<div className="text-center mb-12">
						<div className="inline-block mb-3 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-semibold uppercase tracking-wide">
							Client Feedback
						</div>
						<h3 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
							What Our Clients Say
						</h3>
						<p className="text-slate-600 max-w-2xl mx-auto">
							Don't just take our word for it—hear from satisfied customers across the UAE who've experienced our commitment to excellence.
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-6">
						{reviews.map((r, i) => (
							<motion.div
								key={i}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: i * 0.1 }}
								className="p-6 sm:p-8 rounded-2xl bg-white border-2 border-gray-200 hover:border-amber-600 hover:shadow-xl transition-all"
							>
								<div className="flex text-amber-500 mb-4">
									{Array.from({ length: r.rating }).map((_, i) => (
										<Star key={i} fill="currentColor" className="w-5 h-5" />
									))}
								</div>

								<p className="text-slate-700 leading-relaxed italic mb-6">"{r.text}"</p>
								<div className="flex items-center gap-3 pt-4 border-t border-gray-200">
									<div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-100 to-sky-200 flex items-center justify-center text-sky-700 font-bold text-lg">
										{r.name.charAt(0)}
									</div>
									<div>
										<div className="font-bold text-slate-900">{r.name}</div>
										<div className="text-sm text-slate-600 flex items-center gap-1">
											<MapPin className="w-3 h-3" /> {r.location}
										</div>
									</div>
								</div>
							</motion.div>
						))}
					</div>

					<div className="mt-12 text-center p-6 sm:p-8 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border-2 border-amber-200">
						<h4 className="font-bold text-xl text-slate-900 mb-2">Ready to Experience Excellence?</h4>
						<p className="text-slate-600 mb-4">Join hundreds of satisfied clients who trust TPTS for their maintenance needs.</p>
						<button
							onClick={() => scrollTo("contact")}
							className="px-6 py-3 rounded-lg bg-sky-600 text-white font-semibold hover:bg-sky-700 transition-colors shadow-lg"
						>
							Get Your Free Quote
						</button>
					</div>
				</section>

				{/* CONTACT */}
				<section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 bg-gradient-to-b from-slate-50 to-white">
					<div className="text-center mb-12">
						<div className="inline-block mb-3 px-3 py-1 bg-sky-50 text-sky-700 rounded-full text-xs font-semibold uppercase tracking-wide">
							Get In Touch
						</div>
						<h3 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
							Request Your Free Quote Today
						</h3>
						<p className="text-slate-600 max-w-2xl mx-auto">
							Tell us about your project and we'll provide a detailed, no-obligation quote within 24 hours. Our team is standing by to help.
						</p>
					</div>

					<div className="grid lg:grid-cols-5 gap-8">
						<div className="lg:col-span-2 space-y-4">
							{contactMethods.map((c, i) => (
								<motion.div
									key={i}
									initial={{ opacity: 0, x: -20 }}
									whileInView={{ opacity: 1, x: 0 }}
									viewport={{ once: true }}
									transition={{ delay: i * 0.1 }}
									className="p-5 rounded-xl bg-white border-2 border-gray-200 hover:border-sky-600 transition-all flex items-start gap-4 group"
								>
									<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-50 to-sky-100 flex items-center justify-center text-sky-600 flex-shrink-0 group-hover:scale-110 transition-transform">
										{c.icon}
									</div>
									<div className="flex-1">
										<div className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-1">{c.label}</div>
										{c.label === "Call Us" ? (
											<>
												<a href={`tel:${c.value.replace(/\s/g, '')}`} className="font-bold text-slate-900 hover:text-sky-600 transition-colors block">{c.value}</a>
												{c.value2 && <a href={`tel:${c.value2.replace(/\s/g, '')}`} className="font-bold text-slate-900 hover:text-sky-600 transition-colors block">{c.value2}</a>}
											</>
										) : c.label === "Email" ? (
											<a href={`mailto:${c.value}`} className="font-bold text-slate-900 hover:text-sky-600 transition-colors break-all">{c.value}</a>
										) : (
											<>
												<div className="font-bold text-slate-900">{c.value}</div>
												{c.value2 && <div className="font-bold text-slate-900">{c.value2}</div>}
											</>
										)}
									</div>
								</motion.div>
							))}

							<div className="p-6 rounded-xl bg-gradient-to-br from-sky-600 to-blue-700 text-white mt-6">
								<h4 className="font-bold text-lg mb-2">Emergency Service Available</h4>
								<p className="text-sky-100 text-sm mb-4">Need urgent repairs? We offer 24/7 emergency response for critical issues.</p>
								<a href="tel:+971503682005" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-sky-600 rounded-lg font-semibold hover:bg-sky-50 transition-colors">
									<PhoneCall className="w-4 h-4" /> Call Emergency Line
								</a>
							</div>
						</div>

						<motion.form
							ref={formRef}
							onSubmit={handleSubmit}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							className="lg:col-span-3 bg-white p-6 sm:p-8 rounded-2xl border-2 border-gray-200 shadow-xl"
						>
							<h4 className="font-bold text-xl text-slate-900 mb-6">Send Us Your Requirements</h4>

							{/* Form Status Messages */}
							{formStatus.message && (
								<motion.div
									initial={{ opacity: 0, y: -10 }}
									animate={{ opacity: 1, y: 0 }}
									className={`mb-6 p-4 rounded-xl ${formStatus.type === "success"
										? "bg-emerald-50 border-2 border-emerald-200 text-emerald-800"
										: "bg-red-50 border-2 border-red-200 text-red-800"
										}`}
								>
									<div className="flex items-start gap-3">
										{formStatus.type === "success" ? (
											<CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
										) : (
											<X className="w-5 h-5 flex-shrink-0 mt-0.5" />
										)}
										<p className="text-sm font-medium">{formStatus.message}</p>
									</div>
								</motion.div>
							)}

							<div className="grid sm:grid-cols-2 gap-4 mb-4">
								<div>
									<label className="block text-sm font-medium text-slate-700 mb-2">Full Name *</label>
									<input
										required
										name="from_name"
										disabled={formStatus.loading}
										className="px-4 py-3 border-2 border-gray-200 rounded-xl w-full outline-none focus:border-sky-500 transition-colors duration-300 disabled:bg-gray-50 disabled:cursor-not-allowed"
										placeholder="Your Name"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-slate-700 mb-2">Phone / WhatsApp *</label>
									<input
										required
										type="tel"
										name="phone"
										disabled={formStatus.loading}
										className="px-4 py-3 border-2 border-gray-200 rounded-xl w-full outline-none focus:border-sky-500 transition-colors duration-300 disabled:bg-gray-50 disabled:cursor-not-allowed"
										placeholder="+971 50 123 4567"
									/>
								</div>
							</div>

							<div className="mb-4">
								<label className="block text-sm font-medium text-slate-700 mb-2">Email Address *</label>
								<input
									required
									type="email"
									name="reply_to"
									disabled={formStatus.loading}
									className="px-4 py-3 border-2 border-gray-200 rounded-xl w-full outline-none focus:border-sky-500 transition-colors duration-300 disabled:bg-gray-50 disabled:cursor-not-allowed"
									placeholder="user@example.com"
								/>
							</div>

							<div className="grid sm:grid-cols-2 gap-4 mb-4">
								<div>
									<label className="block text-sm font-medium text-slate-700 mb-2">Service Required *</label>
									<select
										name="service"
										required
										disabled={formStatus.loading}
										className="px-4 py-3 border-2 border-gray-200 rounded-xl w-full outline-none focus:border-sky-500 transition-colors duration-300 bg-white disabled:bg-gray-50 disabled:cursor-not-allowed"
									>
										<option value="">Select a Service</option>
										{services.map((s) => <option key={s.name} value={s.name}>{s.name}</option>)}
									</select>
								</div>
								<div>
									<label className="block text-sm font-medium text-slate-700 mb-2">Your Emirate *</label>
									<select
										name="emirate"
										required
										disabled={formStatus.loading}
										className="px-4 py-3 border-2 border-gray-200 rounded-xl w-full outline-none focus:border-sky-500 transition-colors duration-300 bg-white disabled:bg-gray-50 disabled:cursor-not-allowed"
									>
										<option value="">Select your Emirate</option>
										{locations.map((l) => <option key={l} value={l}>{l}</option>)}
									</select>
								</div>
							</div>

							<div className="mb-6">
								<label className="block text-sm font-medium text-slate-700 mb-2">Project Details</label>
								<textarea
									name="message"
									disabled={formStatus.loading}
									className="px-4 py-3 border-2 border-gray-200 rounded-xl w-full outline-none focus:border-sky-500 transition-colors duration-300 disabled:bg-gray-50 disabled:cursor-not-allowed"
									rows={4}
									placeholder="Tell us about your project requirements..."
								/>
							</div>

							<button
								type="submit"
								disabled={formStatus.loading}
								className="w-full sm:w-auto px-8 py-4 rounded-xl bg-sky-600 text-white font-bold hover:bg-sky-700 transition-all shadow-lg shadow-sky-600/30 flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:shadow-none"
							>
								{formStatus.loading ? (
									<>
										<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
										Sending...
									</>
								) : (
									<>
										<Send className="w-5 h-5" /> Send Request
									</>
								)}
							</button>

							<p className="mt-4 text-xs text-slate-500">
								By submitting this form, you agree to be contacted by TPTS regarding your inquiry. We respect your privacy and never share your information.
							</p>
						</motion.form>
					</div>
				</section>
			</main>

			<footer className="bg-slate-900 text-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
					<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
						<div>
							<div className="flex items-center gap-2 mb-4">
								<img src={logo} alt="TPTS Logo" className="h-8 brightness-0 invert" />
							</div>
							<h3 className="font-bold text-lg mb-2">Top Performance Technical Services</h3>
							<p className="text-slate-400 text-sm leading-relaxed">
								Your trusted partner for comprehensive maintenance and contracting solutions across the UAE.
							</p>
						</div>

						<div>
							<h4 className="font-bold mb-4">Quick Links</h4>
							<div className="space-y-2">
								{sectionIds.map((id) => (
									<button
										key={id}
										onClick={() => scrollTo(id)}
										className="block text-slate-400 hover:text-white transition-colors text-sm"
									>
										{id.charAt(0).toUpperCase() + id.slice(1)}
									</button>
								))}
							</div>
						</div>

						<div>
							<h4 className="font-bold mb-4">Our Services</h4>
							<div className="space-y-2">
								{services.slice(0, 5).map((s) => (
									<div key={s.name} className="text-slate-400 text-sm">{s.name}</div>
								))}
								<button onClick={() => scrollTo("services")} className="text-sky-400 hover:text-sky-300 text-sm font-medium">
									View All Services →
								</button>
							</div>
						</div>

						<div>
							<h4 className="font-bold mb-4">Contact Info</h4>
							<div className="space-y-3 text-sm">
								<a href="tel:+971503682005" className="flex items-start gap-2 text-slate-400 hover:text-white transition-colors">
									<PhoneCall className="w-4 h-4 mt-0.5 flex-shrink-0" />
									<span>+971 50 368 2005</span>
								</a>
								<a href="mailto:tpts.dxb@gmail.com" className="flex items-start gap-2 text-slate-400 hover:text-white transition-colors">
									<Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
									<span>tpts.dxb@gmail.com</span>
								</a>
								<div className="flex items-start gap-2 text-slate-400">
									<MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
									<span>Hor Al Anz, Dubai, UAE</span>
								</div>
								<div className="flex items-start gap-2 text-slate-400">
									<Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
									<span>Mon-Sat: 9AM-10PM</span>
								</div>

								{/* Social Media Links in Footer */}
								<div className="pt-4">
									<p className="text-slate-400 mb-3">Follow Us:</p>
									<div className="flex gap-3">
										{socialLinks.map((social) => (
											<a
												key={social.name}
												href={social.link}
												target="_blank"
												rel="noopener noreferrer"
												className={`${social.color} ${social.hoverColor} p-2.5 rounded-lg transition-all shadow-md hover:scale-110`}
												aria-label={social.name}
											>
												<social.icon className="w-5 h-5 text-white" />
											</a>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
						<p className="text-slate-400 text-sm text-center sm:text-left">
							© {new Date().getFullYear()} Top Performance Technical Services. All rights reserved.
						</p>
						<div className="flex items-center gap-4 text-sm text-slate-400">
							<button className="hover:text-white transition-colors">Privacy Policy</button>
							<span>•</span>
							<button className="hover:text-white transition-colors">Terms of Service</button>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}