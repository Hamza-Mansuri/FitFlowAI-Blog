import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaCheckCircle, FaUser, FaPen } from "react-icons/fa";
import Container from "../components/layout/Container";
import SEO from "../components/common/SEO";
import Footer from "../components/layout/Footer";

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
    <>
      <SEO
        title="Contact Us | FitFlowAI Support"
        description="Get in touch with Gautam Jani or the FitFlowAI fitness team for coaching inquiries, feedback, or support."
      />

      <div className="bg-slate-50 transition-colors duration-300 dark:bg-slate-900 min-h-screen text-slate-800 dark:text-slate-100 pb-1">
        
        {/* Header Section */}
        <section className="bg-gradient-to-b from-green-50 to-slate-50 py-16 dark:from-slate-950 dark:to-slate-900 text-center">
          <Container>
            <div className="mx-auto max-w-2xl">
              <span className="inline-block rounded-full bg-green-100 px-4 py-1.5 text-xs font-bold text-green-700 dark:bg-green-950/40 dark:text-green-400 mb-4">
                GET IN TOUCH
              </span>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-600 dark:from-white dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
                Contact Gautam
              </h1>
              <p className="mt-4 text-slate-500 dark:text-slate-350">
                Have questions about personal training, nutrition timing, or partnerships? Drop us a message below.
              </p>
            </div>
          </Container>
        </section>

        {/* Main Grid Content */}
        <section className="py-16">
          <Container>
            <div className="grid gap-12 lg:grid-cols-12 max-w-5xl mx-auto">
              
              {/* Left Column: Contact info */}
              <div className="lg:col-span-4 space-y-6">
                
                <div className="rounded-3xl border border-slate-200 bg-white p-8 dark:border-slate-850 dark:bg-slate-950 shadow-sm flex flex-col justify-between h-full">
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-slate-950 dark:text-white">Contact Info</h3>
                    
                    <div className="flex gap-4 items-start">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-400 mt-1 flex-shrink-0">
                        <FaEnvelope size={16} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-950 dark:text-white text-sm">Email Address</h4>
                        <a href="mailto:info@gomzi.in" className="text-xs text-slate-500 dark:text-slate-450 hover:text-green-500 transition mt-1 block">
                          info@gomzi.in
                        </a>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-400 mt-1 flex-shrink-0">
                        <FaMapMarkerAlt size={16} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-950 dark:text-white text-sm">Headquarters</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-450 mt-1">
                          Surat, Gujarat, India
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 dark:border-slate-900 pt-6 mt-8">
                    <p className="text-xs text-slate-400 dark:text-slate-500 leading-5">
                      Gautam Jani review emails daily. Please expect a reply within 24 to 48 business hours.
                    </p>
                  </div>
                </div>

              </div>

              {/* Right Column: Contact form */}
              <div className="lg:col-span-8">
                
                <div className="rounded-3xl border border-slate-200 bg-white p-8 dark:border-slate-850 dark:bg-slate-950 shadow-sm relative overflow-hidden">
                  
                  <AnimatePresence mode="wait">
                    {!isSuccess ? (
                      <motion.form
                        key="contact-form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSubmit}
                        className="space-y-6"
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
                                className={`w-full rounded-2xl border bg-slate-50/50 px-4 py-3.5 pl-10 text-sm outline-none transition focus:bg-white focus:ring-4 focus:ring-green-100 dark:bg-slate-900/40 dark:text-white dark:focus:bg-slate-900 ${
                                  errors.name ? "border-red-400 focus:ring-red-100" : "border-slate-200 dark:border-slate-800 focus:border-green-500"
                                }`}
                                placeholder="Your Name"
                              />
                              <FaUser className="absolute left-3.5 top-4.5 text-slate-400" size={13} />
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
                                className={`w-full rounded-2xl border bg-slate-50/50 px-4 py-3.5 pl-10 text-sm outline-none transition focus:bg-white focus:ring-4 focus:ring-green-100 dark:bg-slate-900/40 dark:text-white dark:focus:bg-slate-900 ${
                                  errors.email ? "border-red-400 focus:ring-red-100" : "border-slate-200 dark:border-slate-800 focus:border-green-500"
                                }`}
                                placeholder="name@domain.com"
                              />
                              <FaEnvelope className="absolute left-3.5 top-4.5 text-slate-400" size={13} />
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
                              className={`w-full rounded-2xl border bg-slate-50/50 px-4 py-3.5 pl-10 text-sm outline-none transition focus:bg-white focus:ring-4 focus:ring-green-100 dark:bg-slate-900/40 dark:text-white dark:focus:bg-slate-900 ${
                                  errors.subject ? "border-red-400 focus:ring-red-100" : "border-slate-200 dark:border-slate-800 focus:border-green-500"
                              }`}
                              placeholder="Reason for message"
                            />
                            <FaPen className="absolute left-3.5 top-4.5 text-slate-400" size={13} />
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
                            className={`w-full rounded-2xl border bg-slate-50/50 p-4 text-sm outline-none transition focus:bg-white focus:ring-4 focus:ring-green-100 dark:bg-slate-900/40 dark:text-white dark:focus:bg-slate-900 ${
                              errors.message ? "border-red-400 focus:ring-red-100" : "border-slate-200 dark:border-slate-800 focus:border-green-500"
                            }`}
                            placeholder="Write your message details..."
                          ></textarea>
                          {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
                        </div>

                        {/* Submit Button */}
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full flex justify-center items-center gap-2 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-semibold py-4 text-sm transition shadow shadow-green-600/10 hover:shadow-lg hover:shadow-green-600/20 disabled:opacity-50"
                        >
                          {isSubmitting ? (
                            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          ) : (
                            <>
                              <FaPaperPlane size={12} />
                              Send Message
                            </>
                          )}
                        </button>
                      </motion.form>
                    ) : (
                      <motion.div
                        key="contact-success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="py-16 text-center space-y-4"
                      >
                        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-400">
                          <FaCheckCircle size={40} />
                        </div>
                        <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white">Message Sent!</h2>
                        <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                          Thank you for reaching out. Your message has been routed to Gautam Jani. We'll respond as soon as possible.
                        </p>
                        <button
                          onClick={() => setIsSuccess(false)}
                          className="mt-6 inline-flex items-center gap-2 rounded-full border border-slate-200 px-6 py-2.5 text-xs font-bold transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900"
                        >
                          Send Another Message
                        </button>
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
    </>
  );
}

export default Contact;