const FAQ = () => {
  return (
    <div className=" py-16 px-4 md:px-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center">
        Frequently Asked Questions
      </h2>
      <div className="max-w-3xl mx-auto space-y-4 mt-12">
        {/* FAQ 1 */}
        <div className="collapse collapse-plus bg-white rounded-lg shadow">
          <input type="radio" name="faq-accordion" defaultChecked />
          <div className="collapse-title text-lg font-bold">
            What time is check-in and check-out?
          </div>
          <div className="collapse-content text-gray-600 font-semibold">
            <p>Check-in starts at 2:00 PM and check-out is until 12:00 PM. Early check-in or late check-out may be arranged upon request.</p>
          </div>
        </div>

        {/* FAQ 2 */}
        <div className="collapse collapse-plus bg-white rounded-lg shadow">
          <input type="radio" name="faq-accordion" />
          <div className="collapse-title text-lg font-bold">
            Do you offer airport shuttle service?
          </div>
          <div className="collapse-content text-gray-600 font-semibold">
            <p>Yes, we provide an airport shuttle for our guests at an additional cost. Please contact reception in advance to arrange pickup.</p>
          </div>
        </div>

        {/* FAQ 3 */}
        <div className="collapse collapse-plus bg-white rounded-lg shadow">
          <input type="radio" name="faq-accordion" />
          <div className="collapse-title text-lg font-bold">
            Is breakfast included in the booking?
          </div>
          <div className="collapse-content text-gray-600 font-semibold">
            <p>Yes, complimentary breakfast is included with all room reservations, served daily from 7:00 AM to 10:30 AM.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
