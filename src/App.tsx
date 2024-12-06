import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Github, Code2, Briefcase, User } from 'lucide-react';
import { translations } from './i18n/translations';
import { LanguageToggle } from './components/LanguageToggle';
import { ScrollToTop } from './components/ScrollToTop';
import { ProjectsCarousel } from './components/ProjectsCarousel';
import ContactForm from './components/СontactForm';
import ContactFormPage from './components/ContackFormPage'; // Путь к файлу с компонентом
import { useEffect } from 'react';



function App() {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true); // Видимость навигации
  const [lastScrollY, setLastScrollY] = useState(0); // Последняя позиция прокрутки
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 250) {
        // Скролл вниз: скрываем навигацию
        setIsNavbarVisible(false);
      } else {
        // Скролл вверх: показываем навигацию
        setIsNavbarVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const [lang, setLang] = useState('en');
  const handleToggleLanguage = (lang: string) => {
    setLang(lang);
  };
  const t = translations[lang as keyof typeof translations];

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 3000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);

  // Состояние для контроля отображения модалки
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Функция для открытия модалки
  const openModal = () => setIsModalOpen(true);

  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [skillsRef, skillsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const skills = [
    { name: 'HTML', level: 85 },
    { name: 'CSS', level: 80 },
    { name: 'JavaScript', level: 70 },
    { name: 'React', level: 55 },
  ];

  const projects = [
    {
      title: 'Parallax',
      description: t.projects.descProject1,
      image: 'project1/img/demo.png',
      link: 'project1/index.html',
      technologies: ['HTML', 'CSS', 'JS', 'GSAP'],
    },
    {
      title: 'Witcher',
      description: t.projects.descProject2,
      image: 'project2/img/demo.png',
      link: 'project2/index.html',
      technologies: ['HTML', 'CSS', 'JS', 'SwiperJS'],
    },
    {
      title: 'Weather',
      description: t.projects.descProject3,
      image: 'project3/img/demo.png',
      link: 'project3/index.html',
      technologies: ['HTML', 'CSS', 'JS'],
    },
    {
      title: 'Hohwards',
      description: t.projects.descProject4,
      image: 'project4/Sources/demo.png',
      link: 'project4/index.html',
      technologies: ['HTML', 'CSS', 'JS'],
    },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };



  return (
    <div className="bg-black text-white min-h-screen">
      <LanguageToggle currentLang={lang} onToggle={setLang} />

      {/* Parallax Background */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute h-1/2 w-[200vw] left-[-50vw] bottom-0 inset-0 bg-gradient-to-br from-purple-900/35 to-black"
          style={{ y: y1, rotate: 5 }}
        />
        <motion.div
          className="absolute inset-0 bottom-[-45vw] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent"
          style={{ y: y2 }}
        />
      </div>

      <nav
        className={`fixed top-0 w-full z-40 bg-black/50 backdrop-blur-sm duration-1000 transition-transform duration-300 ${isNavbarVisible ? 'translate-y-0' : '-translate-y-full'
          }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Логотип */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex self-start items-center gap-2 text-2xl font-bold text-purple-500"
            >
              <img src="img/icon.png" alt="Icon" className="h-8" />
              Portfolio
            </motion.div>

            {/* Ссылки */}
            <div className="flex flex-wrap justify-center gap-6 md:flex-grow 2xl:justify-end 2xl:mr-20">
              {[
                { icon: User, label: t.nav.about, id: 'about' },
                { icon: Code2, label: t.nav.skills, id: 'skills' },
                { icon: Briefcase, label: t.nav.projects, id: 'projects' },
                { icon: Mail, label: t.nav.contact, id: 'contact' },
              ].map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-2 hover:text-purple-400 transition-colors"
                >
                  <item.icon className="w-7 h-7" />
                  <span>{item.label}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </nav>


      {/* Hero Section */}
      <motion.section
        id="about"
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center px-6 pt-40 2xl:pt-0 "
        initial={{ opacity: 0 }}
        animate={heroInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto">
          <div className="max-w-3xl ">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-purple-400 mb-4 text-center sm:text-left sm:mt-0 mt-[0px] pt-0 z-15"
            >
              {t.hero.greeting}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="text-6xl font-bold mb-6"
            >
              {t.hero.name}
              <br />
              <span className="text-purple-500">{t.hero.role}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="text-gray-400 text-lg mb-8"
            >
              {t.hero.description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="flex gap-4 z-11"
            >
              <button
                className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg flex items-center gap-2 transition-colors sm:ml-0 ml-auto mr-auto sm:mr-0"
                onClick={openModal}
              >
                <Mail className="w-4 h-4" />
                {t.hero.contactMe}

              </button>

              {/* Передаем состояние и функцию закрытия в ContactForm */}
              <LanguageToggle currentLang={lang} onToggle={handleToggleLanguage} />
              <ContactForm currentLang={lang} translations={translations} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />

              {/* <button 
                className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
                onClick={openModal}
              >
                <Mail className="w-4 h-4" />
                {t.hero.contactMe}
              </button> */}
              {/* <button className="border border-purple-600 hover:bg-purple-600/10 px-6 py-3 rounded-lg flex items-center gap-2 transition-colors">
                <Download className="w-4 h-4" />
                {t.hero.downloadCV}
              </button> */}
            </motion.div>
            {/* Добавление изображения */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="absolute hidden lg:block right-40 pr-20 top-12 transform -translate-y-1/2 mt-12"
            >
              <img
                src="img/me-photo.png"
                alt="Hero image"
                className="absolute w-auto h-[80vh] z-20"
              />
              <img
                src="img/me-background.png"
                alt="Hero image BG"
                className="relative w-auto h-[80vh] z-0 "
              />
              <motion.img 
                animate={{ rotate: 360 }}
                transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-20 right-14"
                src="img/bg_rotating.png" alt="Rotating image" >
              </motion.img>
            </motion.div>
          </div>
          {/* Фон для мобильной версии */}
          <div className="absolute lg:hidden top-40 right-1 w-full mr-[16px] max-w-[90vw] overflow-hidden mt-[580px]">
            <img
              src="img/me-photo_mobile.png"
              alt="Background image"
              className="absolute object-cover opacity-100 z-10 mt-[10px] ml-[10px] w-[95%]"
            />
            <img
              src="img/me-background_mobile.png"
              alt="Background image"
              className="relative object-cover opacity-90"
            />
            <motion.img 
                animate={{ rotate: 360 }}
                transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-20 opacity-50"
                src="img/bg_rotating.png" alt="Rotating image" >
            </motion.img>
          </div>
        </div>
      </motion.section>



      {/* Skills Section */}
      <section id="skills" ref={skillsRef} className="relative min-h-screen flex items-center px-6 sm:mt-0 mt-[530px]">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={skillsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold mb-12 text-center"
          >
            {t.skills.title}
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                animate={skillsInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                className="bg-purple-900/20 p-6 rounded-lg backdrop-blur-sm"
              >
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-purple-400">{skill.level}%</span>
                </div>
                <div className="h-2 bg-purple-900/50 rounded-full">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={skillsInView ? { width: `${skill.level}%` } : {}}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="h-full bg-purple-500 rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative min-h-screen flex items-center px-6 sm:mt-0 mt-0 p-0 landscape:p-10">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-4xl font-bold mb-12 text-center"
          >
            {t.projects.title}
          </motion.h2>
          <ProjectsCarousel projects={projects} viewProjectText={t.projects.viewProject} />
        </div>
      </section>

      {/* Раздел с формой связи */}
      <section id="contact" className="relative min-h-screen flex items-center justify-center mx-auto p-0 landscape:p-4">
        <ContactFormPage
          translations={translations}
          currentLang={lang}
        />
      </section>

      {/* Social Links */}
      <div className="fixed left-6 bottom-6 flex flex-col gap-4 z-30">
        {[
          { icon: Github, href: 'https://github.com/Qurence' },
          // { icon: Linkedin, href: '#' },
          // { icon: Mail, href: '#' }
        ].map((social, index) => (
          <motion.a
            key={index}
            href={social.href}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 + index * 0.1 }}
            className="w-10 h-10 bg-purple-900/20 hover:bg-purple-600 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors"
          >
            <social.icon className="w-5 h-5" />
          </motion.a>
        ))}
      </div>

      <ScrollToTop text={t.scrollTop} />
    </div>
  );
}

export default App;