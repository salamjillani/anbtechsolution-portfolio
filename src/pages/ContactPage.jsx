import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, MessageSquare, Send } from "lucide-react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      const serviceId = "service_6snmdtn";
      const templateId = "template_myizwol";
      const publicKey = "YgvHE4u2Jngk8ehbK";

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        to_name: "ANB Tech Solution",
        message: formData.message,
      };

      emailjs
        .send(serviceId, templateId, templateParams, publicKey)
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Message Sent!",
            text: "Your message has been sent successfully. We will get back to you soon!",
            confirmButtonColor: "#7C3AED",
            background: "#1A1A1A",
            color: "#FFFFFF",
            customClass: {
              popup: "rounded-lg shadow-lg",
              title: "text-white font-bold",
              content: "text-gray-300",
            },
          });

          setFormData({
            name: "",
            email: "",
            message: "",
          });
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops!",
            text: "There was an error sending your message. Please try again later.",
            confirmButtonColor: "#7C3AED",
            background: "#1A1A1A",
            color: "#FFFFFF",
            customClass: {
              popup: "rounded-lg shadow-lg",
              title: "text-white font-bold",
              content: "text-gray-300",
            },
          });
          console.error("Error sending email", error);
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A] px-4 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xl xs:max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl xl:max-w-xl 2xl:max-w-2xl"
      >
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 xs:mb-7 sm:mb-8 md:mb-10 lg:mb-12"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-2xl xs:text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold text-white mb-2 xs:mb-3 sm:mb-4"
          >
            Ready to Get Started?
          </motion.h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden"
        >
          <div className="p-4 xs:p-5 sm:p-6 md:p-8 lg:p-10">
            <motion.h2
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-xl xs:text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-center text-white mb-4 xs:mb-5 sm:mb-6 md:mb-8 lg:mb-10 tracking-tight"
            >
              Get In Touch
            </motion.h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-3 xs:space-y-4 sm:space-y-5 md:space-y-6"
            >
              {["name", "email"].map((field) => (
                <motion.div
                  key={field}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="relative"
                >
                  <div className="absolute inset-y-0 left-0 pl-3 xs:pl-4 sm:pl-4 flex items-center pointer-events-none">
                    {field === "name" && (
                      <User className="h-3 w-3 xs:h-4 xs:w-4 sm:h-5 sm:w-5 text-purple-400" />
                    )}
                    {field === "email" && (
                      <Mail className="h-3 w-3 xs:h-4 xs:w-4 sm:h-5 sm:w-5 text-purple-400" />
                    )}
                  </div>

                  <input
                    type={field === "email" ? "email" : "text"}
                    name={field}
                    placeholder={`Enter your ${field}`}
                    value={formData[field]}
                    onChange={handleChange}
                    className={`w-full pl-8 xs:pl-10 sm:pl-12 pr-3 xs:pr-4 sm:pr-4 py-2 xs:py-2.5 sm:py-3 bg-white/10 text-white 
                      rounded-xl border text-xs xs:text-sm sm:text-base transition duration-300 
                      ${
                        errors[field]
                          ? "border-red-500"
                          : "border-white/20 focus:border-purple-500"
                      }`}
                  />
                  {errors[field] && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-1 text-[10px] xs:text-xs sm:text-sm text-red-400 pl-3 xs:pl-4"
                    >
                      {errors[field]}
                    </motion.p>
                  )}
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="relative"
              >
                <MessageSquare className="absolute top-2.5 xs:top-3 sm:top-4 left-3 xs:left-4 sm:left-4 h-3 w-3 xs:h-4 xs:w-4 sm:h-5 sm:w-5 text-purple-400" />
                <textarea
                  name="message"
                  placeholder="Your message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full pl-8 xs:pl-10 sm:pl-12 pr-3 xs:pr-4 sm:pr-4 py-2 xs:py-2.5 sm:py-3 bg-white/10 text-white 
                    rounded-xl border text-xs xs:text-sm sm:text-base transition duration-300 
                    ${
                      errors.message
                        ? "border-red-500"
                        : "border-white/20 focus:border-purple-500"
                    }`}
                />
                {errors.message && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-1 text-[10px] xs:text-xs sm:text-sm text-red-400 pl-3 xs:pl-4"
                  >
                    {errors.message}
                  </motion.p>
                )}
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 xs:py-3 sm:py-4 bg-purple-600 text-white rounded-xl 
                  hover:bg-purple-700 transition duration-300 
                  flex items-center justify-center space-x-2 group text-xs xs:text-sm sm:text-base
                  disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                <Send className="h-3 w-3 xs:h-4 xs:w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition" />
              </motion.button>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ContactPage;