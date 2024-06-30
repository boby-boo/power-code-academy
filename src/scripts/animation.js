import { gsap } from 'gsap';

const animation = () => {
    const tl = gsap
        .timeline({ once: true })
        .fromTo(
            '.content-description .badge',
            {
                opacity: 0,
                y: 50,
            },
            { opacity: 1, y: 0 },
        )
        .fromTo(
            'h1',
            {
                opacity: 0,
                y: 50,
            },
            {
                opacity: 1,
                y: 0,
            },
            '-=.1',
        )
        .fromTo(
            '.content-subtitle',
            {
                opacity: 0,
                x: -100,
            },
            {
                opacity: 1,
                x: 0,
            },
            '-=.1',
        );
    tl.call(() => splitToLinesAndFadeUp(tl, '.content-description__par'));

    gsap.timeline({ once: true })
        .fromTo(
            '.content-list',
            {
                opacity: 0,
                y: 20,
            },
            {
                opacity: 1,
                y: 0,
            },
        )
        .fromTo(
            '.form',
            {
                opacity: 0,
                y: 10,
            },
            {
                opacity: 1,
                y: 0,
            },
        );

    function splitToLinesAndFadeUp(timeline, selector) {
        document.querySelector(selector).style.opacity = '1';
        document.querySelectorAll(selector).forEach(text => {
            let mathM = text.innerHTML.match(
                /<\s*(\w+\b)(?:(?!<\s*\/\s*\1\b)[\s\S])*<\s*\/\s*\1\s*>|\S+/g,
            );
            if (mathM === null) return;
            mathM = mathM.map(
                el =>
                    `<span style="display:inline-flex"><span>${el}</span></span>`,
            );
            text.innerHTML = mathM.join(' ');
            gsap.set(text.children, { overflow: 'hidden' });
            gsap.set(text.querySelectorAll('span>span'), {
                overflow: 'initial',
                display: 'inline-block',
            });
            timeline
                .fromTo(
                    text.querySelectorAll('span>span'),
                    { yPercent: 100 },
                    {
                        yPercent: 0,
                        stagger: 1 / text.querySelectorAll('span>span').length,
                        duration: 1,
                        ease: 'power4.out',
                    },
                    '-<4',
                )
                .add(() => {
                    text.innerHTML = text.textContent; // Возвращает исходный текст без спанов после завершения анимации
                });
        });
    }

    gsap.timeline({ once: true })
        .fromTo(
            '.subline',
            {
                opacity: 0,
                y: 100,
            },
            {
                opacity: 1,
                y: 0,
            },
        )
        .fromTo(
            '.css',
            {
                opacity: 0,
                y: 100,
            },
            {
                opacity: 1,
                y: 0,
            },
            '<.1',
        )
        .fromTo(
            '.js',
            {
                opacity: 0,
                y: 100,
            },
            {
                opacity: 1,
                y: 0,
            },
            '<.1',
        )
        .fromTo(
            '.html',
            {
                opacity: 0,
                y: 100,
            },
            {
                opacity: 1,
                y: 0,
            },
            '<.1',
        )
        .fromTo(
            '.vs-code',
            {
                opacity: 0,
                y: 100,
            },
            {
                opacity: 1,
                y: 0,
            },
            '<.1',
        );
    gsap.to('.content-decor', {
        duration: 3,
        ease: 'none',
        repeat: -1,
        yoyo: true,
        y: -40,
    });
};

export default animation;
