import React, { useState } from "react";

export default function FAQS() {
  const faqs = [
    { question: "How do I get started with EduNavigator?", answer: "Getting started is easy! Simply sign up for a free account, browse our course catalog, and enroll in courses that interest you. Many of our courses offer free previews so you can get a feel for the content before committing." },
    { question: "Are the certificates recognized by employers?", answer: "Yes! Our certificates are widely recognized by industry professionals and employers. We partner with leading companies and educational institutions to ensure our certifications meet industry standards and add real value to your career." },
    { question: "Can I learn at my own pace?", answer: "Absolutely! All our courses are designed for self-paced learning. You can start and stop whenever you want, and your progress is automatically saved. Most courses remain accessible for life after enrollment." },
    { question: "What payment methods do you accept?", answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. We also offer flexible payment plans for premium courses and enterprise subscriptions." },
    { question: "Do you offer refunds?", answer: "Yes, we offer a 30-day money-back guarantee on all paid courses. If you're not satisfied with a course for any reason, you can request a full refund within 30 days of purchase." },
    { question: "Can I access courses on mobile devices?", answer: "Our platform is fully responsive and works great on all devices. We also have dedicated mobile apps for iOS and Android that provide an optimized learning experience on the go." },
    { question: "How do I contact support?", answer: "You can reach our support team 24/7 through live chat, email (support@edunavigator.com), or phone. We also have an extensive help center with articles and tutorials to help you get the most out of our platform." },
    { question: "Do you offer group discounts?", answer: "Yes! We offer special pricing for teams, schools, and organizations. Contact our enterprise team for custom pricing based on your group size and needs. We also provide dedicated account management for larger organizations." },
    { question: "What makes EduNavigator different from other platforms?", answer: "We focus on practical, real-world skills taught by industry experts. Our courses include hands-on projects, personalized feedback, and career guidance. Plus, our community features let you connect with peers and mentors in your field." },
    { question: "Can I become an instructor on EduNavigator?", answer: "We're always looking for qualified instructors! If you have expertise in a particular field and passion for teaching, you can apply to become an instructor. We provide training, marketing support, and competitive revenue sharing." }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200">
              <button
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
                id={`faq-question-${index}`}
                className="w-full flex justify-between items-center py-3 text-left focus:outline-none"
              >
                <span className="text-lg font-medium text-black hover:text-blue-600 hover:underline transition-colors duration-200">
                  {faq.question}
                </span>
                <svg
                  className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${openIndex === index ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <div
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                  className="pb-4 text-gray-700"
                >
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
