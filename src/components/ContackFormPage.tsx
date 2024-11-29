import React, { ChangeEvent, FormEvent } from 'react';

interface FormData {
  name: string;
  email: string;
  message: string;
  phone: string;
}

interface ContactFormPageProps {
  translations: any; // Передаем объект переводов
  currentLang: string; // Язык, который используется в данный момент
}

const ContactFormPage: React.FC<ContactFormPageProps> = ({ translations, currentLang }) => {
  const [formData, setFormData] = React.useState<FormData>({
    name: '',
    email: '',
    message: '',
    phone: '', // Новое поле для номера
  });

  // Обработчик изменения значений полей формы
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Функция для отправки формы через API
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, email, message, phone } = formData;

    // Логика отправки формы через API
    await fetch('http://localhost:5000/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        message,
        phone,
      }),
    });

    // if (response.ok) {
    //   alert(translations[currentLang].contactForm.sendMessage); // Сообщение после успешной отправки
    // } else {
    //   alert(translations[currentLang].contactForm.sendMessage); // Сообщение об ошибке
    // }
  };

  return (
    // <section id="contact" className="relative min-h-screen flex items-center w-1/2 min-w-500">
    <section id="contact" className="relative min-h-screen flex items-center w-1/2 sm:w-1/2 w-[90%]">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-5 text-center">
          {translations[currentLang].contactForm.title}
        </h2>
        <form onSubmit={handleSubmit} className="bg-gradient-to-br from-purple-900/70 to-black p-8 rounded-lg mx-auto lg:w-0.8/1">
          <div className="mb-4">
            <label className="block text-gray-300" htmlFor="name">
              {translations[currentLang].contactForm.name}
            </label>
            <input
              id="name"
              type="text"
              name="name"
              className="w-full px-4 py-2 border rounded-lg mt-2"
              placeholder={translations[currentLang].contactForm.name}
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300" htmlFor="email">
              {translations[currentLang].contactForm.email}
            </label>
            <input
              id="email"
              type="email"
              name="email"
              className="w-full px-4 py-2 border rounded-lg mt-2"
              placeholder={translations[currentLang].contactForm.email}
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300" htmlFor="phone">
              {translations[currentLang].contactForm.phone}
            </label>
            <input
              id="phone"
              type="tel"
              name="phone"
              className="w-full px-4 py-2 border rounded-lg mt-2"
              placeholder={translations[currentLang].contactForm.phone}
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300" htmlFor="message">
              {translations[currentLang].contactForm.message}
            </label>
            <textarea
              id="message"
              name="message"
              className="w-full px-4 py-2 border rounded-lg mt-2"
              placeholder={translations[currentLang].contactForm.message}
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex justify-end gap-4">
            {/* <button
              type="reset"
              className="px-6 py-2 bg-gray-500 text-white rounded-lg"
            >
              {translations[currentLang].contactForm.cancel}
            </button> */}
            <button
              type="submit"
              className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg mx-auto"
            >
              {translations[currentLang].contactForm.sendMessage}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactFormPage;
