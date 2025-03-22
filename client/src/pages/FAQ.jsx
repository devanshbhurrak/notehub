  import React from "react";

  const FAQ = () => {
    const fAQs = [
      {
        question: "How does NoteHub ensure content quality?",
        answer: "Our three-tier verification system combines AI analysis, peer reviews, and expert validation to maintain high-quality standards."
      },
      {
        question: "Can I collaborate on documents in real-time?",
        answer: "Yes! NoteHub offers Google Docs-like collaboration features with version history and comment threads."
      },
      {
        question: "What file formats are supported?",
        answer: "We support PDF, DOCX, PPTX, TXT, and Markdown. Max file size: 50MB."
      },
      {
        question: "How do I earn recognition for my contributions?",
        answer: "Our reputation system awards badges and achievement levels based on upload quality and community engagement."
      },
      {
        question: "Is my personal information secure?",
        answer: "We use enterprise-grade encryption and regular security audits to protect your data. Read our Security Policy for details."
      },
      {
        question: "Can I request specific study materials?",
        answer: "Absolutely! Use our Resource Request board to ask for specific materials. Our community fulfillment rate is 82%."
      },
      {
        question: "Do you offer institutional accounts?",
        answer: "Yes! Universities and colleges can contact us for custom enterprise solutions with enhanced collaboration features."
      },
      {
        question: "How does the rating system work?",
        answer: "Users can rate resources (1-5 stars) and leave detailed reviews. Top-rated content gets featured in our weekly digest."
      },
      {
        question: "Are there mobile apps available?",
        answer: "Our iOS and Android apps offer full functionality with offline access to your saved resources."
      }
    ];
  
    return (
      <div className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-black mb-8 text-gray-800">Knowledge Hub Help Center</h1>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {fAQs.map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h1 className="mb-3 text-lg font-semibold text-teal-600">
                  {item.question}
                </h1>
                <p className="text-gray-600 border-t pt-3 text-sm">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  export default FAQ;