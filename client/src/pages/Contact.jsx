import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaCheckCircle, FaUser, FaPen } from "react-icons/fa";
import Container from "../components/layout/Container";
import SEO from "../components/common/SEO";
import Footer from "../components/layout/Footer";
import PageTransition from "../components/common/PageTransition";
import GlowBackground from "../components/common/GlowBackground";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const tempErrors = {};
    if (!form.name.trim()) tempErrors.name = "Name is required";
    if (!form.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      tempErrors.email = "Please enter a valid email address";
    }
    if (!form.subject.trim()) tempErrors.subject = "Subject is required";
    if (!form.message.trim()) {
      tempErrors.message = "Message cannot be empty";
    } else if (form.message.trim().length < 10) {
      tempErrors.message = "Message must be at least 10 characters";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  return (
    <PageTransition>
      <SEO
        title="Contact Us | FitFlowAI Support"
        description="Get in touch with Gautam Jani or the FitFlowAI fitness team for coaching inquiries, feedback, or support."
      />

      <div className="relative bg-slate-50/50 transition-colors duration-500 dark:bg-[#05070d] min-h-screen text-slate-800 dark:text-slate-100 overflow-hidden">
        {/* Animated background glows */}
        <GlowBackground />

        <div className="relative z-10">
          {/* Header Section */}
          <section className="pt-20 pb-16 text-center relative overflow-hidden">
            <Container>
              <div className="mx-auto max-w-2xl">
                <span className="inline-flex items-center rounded-full bg-green-50 px-4 py-1.5 text-xs font-bold text-green-700 dark:bg-green-950/30 dark:text-green-400 border border-green-200/50 dark:border-green-900/30 mb-5">
                  GET IN TOUCH
                </span>
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-650 dark:from-white dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
                  Contact Gautam
                </h1>
                <p className="mt-4 text-slate-550 dark:text-slate-350 font-medium">
                  Have questions about personal training, nutrition timing, or partnerships? Drop us a message below.
                </p>
              </div>
            </Container>
          </section>

          {/* Main Grid Content */}
          <section className="py-12">
            <Container>
              <div className="grid gap-10 lg:grid-cols-12 max-w-5xl mx-auto">
                
                {/* Left Column: Contact info */}
                <div className="lg:col-span-4 space-y-6">
                  
                  <div className="rounded-3xl border border-slate-200/60 bg-white/70 p-8 dark:border-slate-800/40 dark:bg-slate-955/65 backdrop-blur-sm shadow-sm flex flex-col justify-between h-full">
                    <div className="space-y-8">
                      <h3 className="text-xl font-bold text-slate-950 dark:text-white tracking-tight">Contact Info</h3>
                      
                      <div className="flex gap-4 items-start">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-green-500/10 to-emerald-500/20 text-green-600 dark:text-green-400 mt-1 flex-shrink-0 shadow-inner border border-green-500/5">
                          <FaEnvelope size={15} />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-950 dark:text-white text-sm">Email Address</h4>
                          <a href="mailto:info@gomzi.in" className="text-xs text-slate-500 dark:text-slate-400 hover:text-green-500 transition-colors duration-200 mt-1.5 block font-bold">
                            info@gomzi.in
                          </a>
                        </div>
                      </div>

                      <div className="flex gap-4 items-start">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-green-500/10 to-emerald-500/20 text-green-600 dark:text-green-400 mt-1 flex-shrink-0 shadow-inner border border-green-500/5">
                          <FaMapMarkerAlt size={15} />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-950 dark:text-white text-sm">Headquarters</h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 font-medium">
                            Surat, Gujarat, India
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-slate-200/60 dark:border-slate-800/45 pt-6 mt-8">
                      <p className="text-xs text-slate-450 dark:text-slate-500 leading-relaxed font-medium">
                        Gautam Jani reviews emails daily. Please expect a reply within 24 to 48 business hours.
                      </p>
                    </div>
                  </div>

                </div>

                {/* Right Column: Contact form */}
                <div className="lg:col-span-8">
                  
                  <div className="rounded-3xl border border-slate-200/60 bg-white/70 p-8 dark:border-slate-800/40 dark:bg-slate-955/65 backdrop-blur-sm shadow-sm relative overflow-hidden">
                    
                    <AnimatePresence mode="wait">
                      {!isSuccess ? (
                        <motion.form
                          key="contact-form"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          onSubmit={handleSubmit}
                          className="space-y-5"
                        >
                          <div className="grid gap-6 sm:grid-cols-2">
                            {/* Name */}
                            <div>
                              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Name</label>
                              <div className="relative">
                                <input
                                  type="text"
                                  value={form.name}
                                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                                  className={`w-full rounded-2xl border bg-white/50 px-4 py-3.5 pl-10 text-sm outline-none transition-all duration-300 focus:bg-white focus:ring-4 focus:ring-green-500/10 dark:bg-slate-900/45 dark:text-white dark:focus:bg-slate-900 ${
                                    errors.name ? "border-red-400 focus:ring-red-100 dark:border-red-500/50" : "border-slate-205 dark:border-slate-800 focus:border-green-500"
                                  }`}
                                  placeholder="Your Name"
                                />
                                <FaUser className="absolute left-3.5 top-4.5 text-slate-400" size={12} />
                              </div>
                              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                            </div>

                            {/* Email */}
                            <div>
                              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email</label>
                              <div className="relative">
                                <input
                                  type="email"
                                  value={form.email}
                                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                                  className={`w-full rounded-2xl border bg-white/50 px-4 py-3.5 pl-10 text-sm outline-none transition-all duration-300 focus:bg-white focus:ring-4 focus:ring-green-500/10 dark:bg-slate-900/45 dark:text-white dark:focus:bg-slate-900 ${
                                    errors.email ? "border-red-400 focus:ring-red-100 dark:border-red-500/50" : "border-slate-205 dark:border-slate-800 focus:border-green-500"
                                  }`}
                                  placeholder="name@domain.com"
                                />
                                <FaEnvelope className="absolute left-3.5 top-4.5 text-slate-400" size={12} />
                              </div>
                              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                            </div>
                          </div>

                          {/* Subject */}
                          <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Subject</label>
                            <div className="relative">
                              <input
                                type="text"
                                value={form.subject}
                                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                                className={`w-full rounded-2xl border bg-white/50 px-4 py-3.5 pl-10 text-sm outline-none transition-all duration-300 focus:bg-white focus:ring-4 focus:ring-green-500/10 dark:bg-slate-900/45 dark:text-white dark:focus:bg-slate-900 ${
                                    errors.subject ? "border-red-400 focus:ring-red-100 dark:border-red-500/50" : "border-slate-205 dark:border-slate-800 focus:border-green-500"
                                }`}
                                placeholder="Reason for message"
                              />
                              <FaPen className="absolute left-3.5 top-4.5 text-slate-400" size={12} />
                            </div>
                            {errors.subject && <p className="mt-1 text-xs text-red-500">{errors.subject}</p>}
                          </div>

                          {/* Message */}
                          <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Message</label>
                            <textarea
                              rows="5"
                              value={form.message}
                              onChange={(e) => setForm({ ...form, message: e.target.value })}
                              className={`w-full rounded-2xl border bg-white/50 p-4 text-sm outline-none transition-all duration-300 focus:bg-white focus:ring-4 focus:ring-green-500/10 dark:bg-slate-900/45 dark:text-white dark:focus:bg-slate-900 ${
                                errors.message ? "border-red-400 focus:ring-red-100 dark:border-red-500/50" : "border-slate-205 dark:border-slate-800 focus:border-green-500"
                              }`}
                              placeholder="Write your message details..."
                            ></textarea>
                            {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
                          </div>

                          {/* Submit Button */}
                          <motion.button
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full flex justify-center items-center gap-2 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 text-sm transition-all duration-300 shadow shadow-green-500/10 hover:shadow-lg hover:shadow-green-500/20 disabled:opacity-50"
                          >
                            {isSubmitting ? (
                              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            ) : (
                              <>
                                <FaPaperPlane size={11} />
                                Send Message
                              </>
                            )}
                          </motion.button>
                        </motion.form>
                      ) : (
                        <motion.div
                          key="contact-success"
                          initial={{ opacity: 0, scale: 0.96 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="py-16 text-center space-y-4"
                        >
                          <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-green-600 dark:bg-green-950/40 dark:text-green-400 border border-green-500/10 shadow-inner">
                            <FaCheckCircle size={40} className="animate-pulse" />
                          </div>
                          <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">Message Sent!</h2>
                          <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto font-medium">
                            Thank you for reaching out. Your message has been routed to Gautam Jani. We'll respond as soon as possible.
                          </p>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsSuccess(false)}
                            className="mt-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/60 px-6 py-2.5 text-xs font-bold transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900"
                          >
                            Send Another Message
                          </motion.button>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>

                </div>

              </div>
            </Container>
          </section>

          <Footer />
        </div>
      </div>
    </PageTransition>
  );
}

export default Contact;