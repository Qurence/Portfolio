import React, { ChangeEvent, FormEvent } from 'react';

interface FormData {
  name: string;
  email: string;
  message: string;
  phone: string;
}

interface ContactFormProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  translations: any; // Передаем объект переводов
  currentLang: string; // Язык, который используется в данный момент
}

const ContactForm: React.FC<ContactFormProps> = ({ isModalOpen, setIsModalOpen, translations, currentLang }) => {
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

    // Здесь будет логика отправки формы через API
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
    //   setIsModalOpen(false); // Закрываем модалку после отправки
    // } else {
    //   alert(translations[currentLang].contactForm.sendMessage); // Сообщение об ошибке
    // }
    setIsModalOpen(false); // Закрываем модалку после отправки
  };

  return (
    <>
      {/* Модальное окно с формой */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 inset-0 overflow-y-auto">
          <div className="bg-gradient-to-br from-purple-900/70 to-black p-8 rounded-lg w-96">
            <h2 className="text-2xl font-bold mb-4 text-white">
              {translations[currentLang].hero.contactMe} {/* Используем перевод для заголовка */}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-300" htmlFor="name">
                  {translations[currentLang].contactForm.name} {/* Перевод для метки */}
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  className="w-full px-4 py-2 border rounded-lg mt-2"
                  placeholder={translations[currentLang].contactForm.name} // Перевод для плейсхолдера
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-300" htmlFor="email">
                  {translations[currentLang].contactForm.email} {/* Перевод для метки */}
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  className="w-full px-4 py-2 border rounded-lg mt-2"
                  placeholder={translations[currentLang].contactForm.email} // Перевод для плейсхолдера
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-300" htmlFor="phone">
                  {translations[currentLang].contactForm.phone} {/* Перевод для метки */}
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  className="w-full px-4 py-2 border rounded-lg mt-2"
                  placeholder={translations[currentLang].contactForm.phone} // Перевод для плейсхолдера
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-300" htmlFor="message">
                  {translations[currentLang].contactForm.message} {/* Перевод для метки */}
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="w-full px-4 py-2 border rounded-lg mt-2"
                  placeholder={translations[currentLang].contactForm.message} // Перевод для плейсхолдера
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  className="px-6 py-2 bg-gray-500 text-white rounded-lg"
                  onClick={() => setIsModalOpen(false)} // Закрыть модалку
                >
                  {translations[currentLang].contactForm.cancel} {/* Перевод для кнопки отмены */}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg"
                >
                  {translations[currentLang].contactForm.sendMessage} {/* Перевод для кнопки отправки */}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactForm;
