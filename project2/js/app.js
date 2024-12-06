new Swiper('.slider', {
    speed : 2400,
    // direction: 'vertical',
    mousewheel: {
        enabled: true,
        sensitivity: 3
    },
    spaceBetween: 18,
    parallax: true,
    freeMode: true,
})

document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('mouseover', (e) => {
        const textContainer = document.getElementById('text-container');
        const text = e.target.getAttribute('data-text');
        textContainer.innerText = text;
        textContainer.style.display = 'block';
    });

    item.addEventListener('mouseleave', () => {
        const textContainer = document.getElementById('text-container');
        textContainer.style.display = 'none';
    });
});





