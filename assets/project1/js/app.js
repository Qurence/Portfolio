window.addEventListener('scroll', e => {
    document.documentElement.style.setProperty('--scrollTop', `${window.scrollY}px`); // Обновление scrollTop
});

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

if (ScrollTrigger.isTouch !== 1) {
    ScrollSmoother.create({
        wrapper: '.wrapper',
        content: '.content',
        // smooth: 1.5, // Увеличение плавности
        effects: true,
    });

    // Для левой галереи
    let itemsL = gsap.utils.toArray('.gallery__left .gallery__item');

    itemsL.forEach(item => {
        gsap.fromTo(item,
            { x: -100, opacity: 0.4 },
            {
                opacity: 1,
                x: 0,
                scrollTrigger: {
                    trigger: item,
                    scrub: true,
                    start: "top 90%", // Начало анимации чуть раньше
                    end: "top 60%",  // Завершение раньше
                }
            }
        );
    });

    // Для правой галереи
    let itemsR = gsap.utils.toArray('.gallery__right .gallery__item');

    itemsR.forEach(item => {
        gsap.fromTo(item,
            { x: 100, opacity: 0.4 },
            {
                opacity: 1,
                x: 0,
                scrollTrigger: {
                    trigger: item,
                    scrub: true,
                    start: "top 90%", // Начало анимации чуть раньше
                    end: "top 60%",  // Завершение раньше
                }
            }
        );
    });
} else {
    // Адаптация для мобильных устройств
    gsap.matchMedia().add("(max-width: 1840px)", () => {
        let itemsL = gsap.utils.toArray('.gallery__left .gallery__item');
        let itemsR = gsap.utils.toArray('.gallery__right .gallery__item');

        itemsL.forEach(item => {
            gsap.fromTo(item,
                { x: -50, opacity: 0 }, // Уменьшенный начальный сдвиг
                {
                    opacity: 1,
                    x: 0,
                    scrollTrigger: {
                        trigger: item,
						scrub: true,
                        start: "top 100%", // Начало ближе к нижней границе экрана
                        end: "bottom 90%",  // Завершение ближе к центру
                    }
                }
            );
        });

        itemsR.forEach(item => {
            gsap.fromTo(item,
                { x: 50, opacity: 0 }, // Уменьшенный начальный сдвиг
                {
                    opacity: 1,
                    x: 0,
                    scrollTrigger: {
                        trigger: item,
						scrub: true,
                        start: "top 100%",
                        end: "bottom 90%",
                    }
                }
            );
        });

    });
}
