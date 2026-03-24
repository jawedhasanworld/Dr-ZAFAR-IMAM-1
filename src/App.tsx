/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ChevronRight, 
  Star, 
  MessageCircle, 
  Menu, 
  X, 
  ArrowRight,
  Activity,
  User,
  ShieldCheck,
  Award,
  Users,
  Calendar,
  Plus,
  Minus,
  Instagram,
  Facebook,
  Linkedin
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-brand-blue p-2 rounded-lg">
            <Activity className="text-white w-6 h-6" />
          </div>
          <span className={`text-xl font-bold font-display ${scrolled ? 'text-brand-blue' : 'text-brand-blue'}`}>
            Dr. Zafar Imam
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-slate-700 hover:text-brand-blue font-medium transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a href="#booking" className="bg-brand-blue text-white px-6 py-2.5 rounded-full font-semibold hover:bg-blue-700 transition-all">
            Book Now
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-slate-800" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-xl border-t md:hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-lg font-medium text-slate-800"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#booking" 
                className="bg-brand-blue text-white px-6 py-3 rounded-xl font-semibold text-center"
                onClick={() => setIsOpen(false)}
              >
                Book Appointment
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const ServiceCard = ({ title, description, benefits, icon: Icon }: { title: string, description: string, benefits: string[], icon: any, key?: any }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all"
  >
    <div className="bg-brand-light-blue w-14 h-14 rounded-xl flex items-center justify-center mb-6">
      <Icon className="text-brand-blue w-8 h-8" />
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-slate-600 mb-6 leading-relaxed">{description}</p>
    <div className="space-y-2">
      {benefits.map((benefit, idx) => (
        <div key={idx} className="flex items-start gap-2 text-sm text-slate-700">
          <CheckCircle2 className="text-brand-green w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>{benefit}</span>
        </div>
      ))}
    </div>
  </motion.div>
);

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-200 py-4">
      <button 
        className="w-full flex justify-between items-center text-left py-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-semibold text-slate-800">{question}</span>
        {isOpen ? <Minus className="text-brand-blue" /> : <Plus className="text-brand-blue" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="text-slate-600 py-3 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  const [formData, setFormData] = useState({ name: '', phone: '', problem: '', time: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hello Dr. Zafar Imam, I'd like to book an appointment.\nName: ${formData.name}\nPhone: ${formData.phone}\nProblem: ${formData.problem}\nPreferred Time: ${formData.time}`;
    window.open(`https://wa.me/916200260997?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="relative">
      {/* SEO Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "PhysiotherapyClinic",
          "name": "Dr. Zafar Imam Physiotherapy Clinic",
          "image": "https://picsum.photos/seed/clinic/600/400",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Nihal Vihar, 50 Feet Road, Gali No. 5",
            "addressLocality": "New Delhi",
            "addressRegion": "Delhi",
            "postalCode": "110041",
            "addressCountry": "IN"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 28.67,
            "longitude": 77.0664
          },
          "url": "https://drzafarimam.com",
          "telephone": "+916200260997",
          "openingHoursSpecification": [
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
              "opens": "09:00",
              "closes": "20:00"
            }
          ]
        })}
      </script>

      <Navbar />

      {/* WhatsApp Floating Button */}
      <a 
        href="https://wa.me/916200260997" 
        target="_blank" 
        rel="noopener noreferrer"
        className="whatsapp-btn"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-8 h-8" />
      </a>

      {/* Mobile Sticky CTA */}
      <a href="#booking" className="sticky-book-btn">
        BOOK APPOINTMENT NOW
      </a>

      {/* 1. Hero Section */}
      <section id="home" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-brand-light-blue/30 rounded-bl-[200px] hidden lg:block"></div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-brand-light-green text-brand-green px-4 py-2 rounded-full text-sm font-bold mb-6">
              <ShieldCheck className="w-4 h-4" />
              <span>Certified Physiotherapy Specialist</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight mb-6">
              Pain Relief Starts Here – <span className="text-brand-blue text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-blue-400">Expert Physiotherapy</span> Care
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed max-w-xl">
              Personalized treatment plans designed for faster recovery and long-term wellness. Get back to the life you love, pain-free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#booking" className="btn-primary">
                Book Appointment Now
                <ArrowRight className="w-5 h-5" />
              </a>
              <a href="tel:6200260997" className="btn-secondary">
                <Phone className="w-5 h-5" />
                Call Now (6200260997)
              </a>
            </div>
            
            <div className="mt-12 flex items-center gap-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <img 
                    key={i}
                    src={`https://picsum.photos/seed/patient${i}/100/100`} 
                    alt="Patient" 
                    className="w-10 h-10 rounded-full border-2 border-white"
                    referrerPolicy="no-referrer"
                  />
                ))}
              </div>
              <div>
                <div className="flex text-yellow-400">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-sm text-slate-500 font-medium">Trusted by 2,000+ Happy Patients</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
              <img 
                src="https://picsum.photos/seed/physio/800/1000" 
                alt="Physiotherapy Treatment" 
                className="w-full h-auto object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Floating Stats */}
            <div className="absolute -bottom-6 -left-6 z-20 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 hidden sm:block">
              <div className="flex items-center gap-4">
                <div className="bg-brand-light-green p-3 rounded-xl">
                  <Award className="text-brand-green w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">10+ Years</p>
                  <p className="text-sm text-slate-500">Clinical Experience</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Trust Signals / Stats */}
      <section className="bg-brand-blue py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: 'Patients Treated', value: '2,000+', icon: Users },
            { label: 'Success Rate', value: '98%', icon: CheckCircle2 },
            { label: 'Years Experience', value: '10+', icon: Award },
            { label: 'Google Rating', value: '4.9/5', icon: Star },
          ].map((stat, idx) => (
            <div key={idx} className="text-white">
              <stat.icon className="w-8 h-8 mx-auto mb-3 opacity-80" />
              <p className="text-3xl font-bold mb-1">{stat.value}</p>
              <p className="text-blue-100 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. About Dr. Zafar Imam */}
      <section id="about" className="section-padding">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Meet Dr. Zafar Imam</h2>
            <p className="text-lg text-slate-700 font-semibold mb-4 text-brand-blue">BPT, MPT (Orthopedics) - Senior Physiotherapist</p>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Dr. Zafar Imam is a highly skilled and compassionate physiotherapist dedicated to restoring movement and improving quality of life for his patients. With over a decade of experience in orthopedic and sports rehabilitation, he combines evidence-based techniques with a personalized touch.
            </p>
            <p className="text-slate-600 mb-8 leading-relaxed">
              His approach focuses not just on treating symptoms, but on identifying the root cause of pain to ensure long-term recovery and prevent future injuries.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              <div className="flex items-start gap-3">
                <div className="bg-brand-light-blue p-2 rounded-lg">
                  <CheckCircle2 className="text-brand-blue w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold">Personalized Care</h4>
                  <p className="text-sm text-slate-500">Tailored plans for every patient.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-brand-light-blue p-2 rounded-lg">
                  <CheckCircle2 className="text-brand-blue w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold">Modern Equipment</h4>
                  <p className="text-sm text-slate-500">Advanced therapy technology.</p>
                </div>
              </div>
            </div>
            
            <a href="#booking" className="btn-primary w-fit">
              Learn More About My Approach
            </a>
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="relative">
              <div className="absolute inset-0 bg-brand-blue rounded-[3rem] rotate-3 -z-10"></div>
              <img 
                src="https://picsum.photos/seed/doctor/600/700" 
                alt="Dr. Zafar Imam" 
                className="rounded-[3rem] shadow-2xl w-full object-cover aspect-[4/5]"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Services Section */}
      <section id="services" className="bg-slate-50 section-padding">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Specialized Services</h2>
          <p className="text-slate-600">Comprehensive physiotherapy treatments designed to help you recover faster and move better.</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Back Pain Treatment",
              description: "Relieve chronic back pain and sciatica through targeted manual therapy and core strengthening.",
              benefits: ["Improved posture", "Reduced inflammation", "Better mobility"],
              icon: Activity
            },
            {
              title: "Neck Pain Therapy",
              description: "Expert care for cervical spondylosis, stiff neck, and posture-related neck strain.",
              benefits: ["Headache relief", "Muscle relaxation", "Nerve decompression"],
              icon: ShieldCheck
            },
            {
              title: "Sports Injury Rehab",
              description: "Specialized recovery programs for athletes to get back to peak performance safely.",
              benefits: ["Faster healing", "Injury prevention", "Strength rebuilding"],
              icon: Award
            },
            {
              title: "Post-Surgery Rehab",
              description: "Structured rehabilitation following knee, hip, or spine surgeries for optimal recovery.",
              benefits: ["Regained function", "Pain management", "Safe progression"],
              icon: User
            },
            {
              title: "Arthritis Management",
              description: "Gentle exercises and therapy to manage joint pain and improve daily functionality.",
              benefits: ["Joint flexibility", "Stiffness reduction", "Active lifestyle"],
              icon: Users
            },
            {
              title: "Home Physiotherapy",
              description: "Professional physiotherapy care in the comfort of your home for those with limited mobility.",
              benefits: ["Convenient care", "Family involvement", "Personalized attention"],
              icon: MapPin
            }
          ].map((service, idx) => (
            <ServiceCard 
              key={idx} 
              title={service.title} 
              description={service.description} 
              benefits={service.benefits} 
              icon={service.icon} 
            />
          ))}
        </div>
      </section>

      {/* 5. Why Choose Us */}
      <section className="section-padding">
        <div className="bg-brand-blue rounded-[3rem] p-8 md:p-16 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8">Why Choose Dr. Zafar Imam?</h2>
              <div className="space-y-6">
                {[
                  { title: "Evidence-Based Treatment", desc: "We use scientifically proven methods for the best results." },
                  { title: "Personalized Care", desc: "Every body is different. Your treatment plan will be too." },
                  { title: "Affordable Pricing", desc: "Quality healthcare shouldn't be a financial burden." },
                  { title: "Friendly Environment", desc: "A warm, welcoming clinic where you're treated like family." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="bg-white/20 p-2 rounded-lg h-fit">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-1">{item.title}</h4>
                      <p className="text-blue-100">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://picsum.photos/seed/clinic/600/400" 
                alt="Modern Clinic" 
                className="rounded-3xl shadow-2xl border-4 border-white/20"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. Testimonials */}
      <section id="testimonials" className="section-padding bg-slate-50">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Patients Say</h2>
          <p className="text-slate-600">Real stories of recovery and transformation from our valued patients.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Rahul Sharma", problem: "Chronic Back Pain", text: "I had severe back pain for 2 years. After just 5 sessions with Dr. Zafar, I'm now able to play cricket again. Highly recommended!", rating: 5 },
            { name: "Anita Devi", problem: "Post-Knee Surgery", text: "The rehabilitation process was smooth and very professional. Dr. Zafar's patience and expertise made my recovery much faster.", rating: 5 },
            { name: "Vikram Singh", problem: "Sports Injury", text: "Best physiotherapist in Nihal Vihar. He understood my injury perfectly and gave me a clear roadmap to recovery.", rating: 5 }
          ].map((review, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-slate-700 italic mb-6">"{review.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-light-blue rounded-full flex items-center justify-center font-bold text-brand-blue">
                  {review.name[0]}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{review.name}</h4>
                  <p className="text-xs text-brand-blue font-semibold uppercase tracking-wider">{review.problem}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Appointment Booking Section */}
      <section id="booking" className="section-padding">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden grid md:grid-cols-2">
          <div className="p-8 md:p-12 bg-brand-blue text-white">
            <h2 className="text-3xl font-bold mb-6">Book Your Session</h2>
            <p className="mb-8 text-blue-100">Take the first step towards a pain-free life. Fill out the form and we'll get back to you shortly.</p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-white/10 p-3 rounded-xl">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-blue-200">Call Us Directly</p>
                  <p className="text-lg font-bold">6200260997</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-white/10 p-3 rounded-xl">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-blue-200">WhatsApp Us</p>
                  <p className="text-lg font-bold">Available 24/7</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">What's the problem?</label>
                <select 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all"
                  value={formData.problem}
                  onChange={e => setFormData({...formData, problem: e.target.value})}
                >
                  <option value="">Select a condition</option>
                  <option value="Back Pain">Back Pain</option>
                  <option value="Neck Pain">Neck Pain</option>
                  <option value="Sports Injury">Sports Injury</option>
                  <option value="Post-Surgery">Post-Surgery</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Preferred Time</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all"
                  placeholder="e.g. Morning, 10 AM"
                  value={formData.time}
                  onChange={e => setFormData({...formData, time: e.target.value})}
                />
              </div>
              <button type="submit" className="btn-primary w-full mt-4">
                Book Your Session
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 8. Clinic Details & Maps */}
      <section id="contact" className="section-padding bg-slate-50">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl font-bold mb-8">Visit Our Clinic</h2>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="bg-white p-3 rounded-xl shadow-sm h-fit">
                  <MapPin className="text-brand-blue w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Address</h4>
                  <p className="text-slate-600">Nihal Vihar, 50 Feet Road, Gali No. 5, New Delhi</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-white p-3 rounded-xl shadow-sm h-fit">
                  <Clock className="text-brand-blue w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Working Hours</h4>
                  <p className="text-slate-600">Mon - Sat: 9:00 AM - 8:00 PM</p>
                  <p className="text-slate-600">Sunday: By Appointment Only</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-white p-3 rounded-xl shadow-sm h-fit">
                  <Phone className="text-brand-blue w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Contact</h4>
                  <p className="text-slate-600">Phone: 6200260997</p>
                  <p className="text-slate-600">Email: info@drzafarimam.com</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="rounded-3xl overflow-hidden shadow-xl h-[400px] border-4 border-white">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.672457476834!2d77.0664!3d28.67!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDQwJzEyLjAiTiA3N8KwMDMnNTkuMCJF!5e0!3m2!1sen!2sin!4v1648000000000!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy"
              title="Google Maps"
            ></iframe>
          </div>
        </div>
      </section>

      {/* 9. FAQ Section */}
      <section className="section-padding">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-2">
            <FAQItem 
              question="How many sessions are needed?" 
              answer="The number of sessions depends on the severity of your condition and how your body responds to treatment. Most patients see significant improvement within 5-10 sessions."
            />
            <FAQItem 
              question="Do you provide home visits?" 
              answer="Yes, we provide professional home physiotherapy services for patients with limited mobility or those who prefer treatment in the comfort of their home."
            />
            <FAQItem 
              question="What conditions do you treat?" 
              answer="We treat a wide range of conditions including back pain, neck pain, sports injuries, post-surgery recovery, arthritis, paralysis rehabilitation, and more."
            />
            <FAQItem 
              question="Is physiotherapy painful?" 
              answer="Physiotherapy is generally not painful. Some techniques might cause mild discomfort as we work on stiff muscles or joints, but our goal is always to reduce your pain, not increase it."
            />
          </div>
        </div>
      </section>

      {/* 10. Footer */}
      <footer className="bg-slate-900 text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-brand-blue p-2 rounded-lg">
                <Activity className="text-white w-6 h-6" />
              </div>
              <span className="text-xl font-bold font-display">Dr. Zafar Imam</span>
            </div>
            <p className="text-slate-400 leading-relaxed mb-6">
              Expert physiotherapy care dedicated to restoring your movement and improving your quality of life.
            </p>
            <div className="flex gap-4">
              <a href="#" className="bg-slate-800 p-2 rounded-lg hover:bg-brand-blue transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="bg-slate-800 p-2 rounded-lg hover:bg-brand-blue transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="bg-slate-800 p-2 rounded-lg hover:bg-brand-blue transition-colors"><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a></li>
              <li><a href="#booking" className="hover:text-white transition-colors">Book Appointment</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Services</h4>
            <ul className="space-y-4 text-slate-400">
              <li>Back Pain Treatment</li>
              <li>Neck Pain Therapy</li>
              <li>Sports Injury Rehab</li>
              <li>Post-Surgery Rehab</li>
              <li>Home Physiotherapy</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Contact Info</h4>
            <ul className="space-y-4 text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-blue flex-shrink-0" />
                <span>Nihal Vihar, 50 Feet Road, Gali No. 5, New Delhi</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-blue flex-shrink-0" />
                <span>6200260997</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-brand-blue flex-shrink-0" />
                <span>Mon - Sat: 9AM - 8PM</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} Dr. Zafar Imam Physiotherapy Clinic. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
