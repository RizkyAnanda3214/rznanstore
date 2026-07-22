/*=====================================================
            RZNANSTORE
            script.js
=====================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*==========================
          ELEMENT REFERENCES
    ==========================*/

    const header = document.querySelector(".header");
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const backTop = document.querySelector(".back-to-top");
    const copyBtn = document.querySelector(".copy-btn");
    const year = document.querySelector("#year");

    const navLinks = document.querySelectorAll(".nav-menu a");
    const sections = document.querySelectorAll("section");


    /*==========================
          STICKY NAVBAR
    ==========================*/

    let ticking = false;

    const handleScroll = () => {

        const scrollY = window.scrollY;

        /* Sticky Navbar */

        if (header) {
            header.classList.toggle("active", scrollY > 80);
        }

        /* Back To Top */

        if (backTop) {
            const showBackTop = scrollY > 500;

            backTop.style.opacity = showBackTop ? "1" : "0";
            backTop.style.pointerEvents = showBackTop
                ? "auto"
                : "none";
        }

        /* Active Navigation */

        let current = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 120;

            if (scrollY >= sectionTop) {
                current = section.getAttribute("id");
            }

        });

        navLinks.forEach(link => {

            link.classList.toggle(
                "active",
                link.getAttribute("href") === `#${current}`
            );

        });

        /* Scroll 90% GA4 */

        if (!window.scrollSent) {

            const scrollPercent =
                (scrollY + window.innerHeight) /
                document.documentElement.scrollHeight;

            if (scrollPercent >= 0.9) {

                window.scrollSent = true;

                if (typeof gtag === "function") {

                    gtag("event", "scroll_90");

                }

            }

        }

        ticking = false;

    };


    window.addEventListener("scroll", () => {

        if (!ticking) {

            window.requestAnimationFrame(handleScroll);

            ticking = true;

        }

    }, { passive: true });


    /*==========================
          HAMBURGER MENU
    ==========================*/

    if (hamburger && navMenu) {

        hamburger.addEventListener("click", () => {

            hamburger.classList.toggle("active");

            navMenu.classList.toggle("active");

        });

    }


    /*==========================
          CLOSE MOBILE MENU
    ==========================*/

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            if (hamburger) {
                hamburger.classList.remove("active");
            }

            if (navMenu) {
                navMenu.classList.remove("active");
            }

        });

    });


    /*==========================
          SMOOTH SCROLL
    ==========================*/

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(anchor => {

            anchor.addEventListener("click", function (e) {

                const href = this.getAttribute("href");

                if (!href || href === "#") {
                    return;
                }

                const target =
                    document.querySelector(href);

                if (target) {

                    e.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            });

        });


    /*==========================
          COPY VOUCHER
    ==========================*/

    if (copyBtn) {

        copyBtn.addEventListener("click", async () => {

            const voucher = "RZNANEW10";

            try {

                await navigator.clipboard.writeText(voucher);

                copyBtn.innerHTML = "✓ Berhasil Disalin";

                if (typeof gtag === "function") {

                    gtag("event", "copy_voucher", {
                        voucher: voucher
                    });

                }

                setTimeout(() => {

                    copyBtn.innerHTML = "Salin Kode";

                }, 2000);

            } catch (error) {

                console.error(
                    "Gagal menyalin voucher:",
                    error
                );

            }

        });

    }


    /*==========================
          COUNTER ANIMATION
    ==========================*/

    const counters =
        document.querySelectorAll(".counter");

    const startCounter = () => {

        counters.forEach(counter => {

            const target =
                Number(counter.dataset.target);

            let count = 0;

            const speed = target / 150;

            const update = () => {

                count += speed;

                if (count < target) {

                    counter.innerText =
                        Math.floor(count)
                        .toLocaleString();

                    requestAnimationFrame(update);

                } else {

                    counter.innerText =
                        target.toLocaleString();

                }

            };

            update();

        });

    };


    /*==========================
       COUNTER INTERSECTION
    ==========================*/

    const statistics =
        document.querySelector(".statistics");

    if (
        statistics &&
        counters.length &&
        "IntersectionObserver" in window
    ) {

        let counterStarted = false;

        const counterObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting &&
                            !counterStarted
                        ) {

                            counterStarted = true;

                            startCounter();

                            counterObserver.disconnect();

                        }

                    });

                },
                {
                    threshold: 0.2
                }
            );

        counterObserver.observe(statistics);

    }


    /*==========================
          REVEAL ANIMATION
    ==========================*/

    const reveals =
        document.querySelectorAll(
            ".hero, .problem, .why-us, .cta, " +
            ".testimonial, .statistics, .about, " +
            ".video-section, .promo, .footer"
        );


    /* Initial State */

    reveals.forEach(element => {

        element.classList.add("reveal-element");

    });


    /* Intersection Observer */

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "reveal-visible"
                            );

                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.1,
                    rootMargin: "0px 0px -80px 0px"
                }
            );


        reveals.forEach(element => {

            revealObserver.observe(element);

        });

    } else {

        reveals.forEach(element => {

            element.classList.add(
                "reveal-visible"
            );

        });

    }


    /*==========================
          CURRENT YEAR
    ==========================*/

    if (year) {

        year.textContent =
            new Date().getFullYear();

    }


    /*==========================
          TOP UP BUTTON GA4
    ==========================*/

    document
        .querySelectorAll(".btn-primary")
        .forEach(button => {

            button.addEventListener("click", () => {

                if (typeof gtag === "function") {

                    gtag("event", "topup_click", {

                        button_name:
                            button.innerText.trim()

                    });

                }

            });

        });


    /*==========================
          LOGIN BUTTON GA4
    ==========================*/

    const login =
        document.querySelector(".btn-login");

    if (login) {

        login.addEventListener(
            "click",
            () => {

                if (typeof gtag === "function") {

                    gtag(
                        "event",
                        "login_click"
                    );

                }

            }
        );

    }


    /*==========================
          MENU CLICK GA4
    ==========================*/

    navLinks.forEach(menu => {

        menu.addEventListener(
            "click",
            () => {

                if (typeof gtag === "function") {

                    gtag(
                        "event",
                        "menu_click",
                        {
                            menu:
                                menu.innerText.trim()
                        }
                    );

                }

            }
        );

    });


    /*==========================
          VIDEO CLICK GA4
    ==========================*/

    const videoButton =
        document.querySelector(
            ".play-button a"
        );

    if (videoButton) {

        videoButton.addEventListener(
            "click",
            () => {

                if (typeof gtag === "function") {

                    gtag(
                        "event",
                        "video_click"
                    );

                }

            }
        );

    }


    /*==========================
          BACK TO TOP GA4
    ==========================*/

    if (backTop) {

        backTop.addEventListener(
            "click",
            () => {

                if (typeof gtag === "function") {

                    gtag(
                        "event",
                        "back_to_top"
                    );

                }

            }
        );

    }


    /*==========================
          SOCIAL CLICK GA4
    ==========================*/

    document
        .querySelectorAll(".social-media a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    const icon =
                        link.querySelector("i");

                    if (
                        typeof gtag === "function"
                    ) {

                        gtag(
                            "event",
                            "social_click",
                            {
                                social:
                                    icon
                                        ? icon.className
                                        : "unknown"
                            }
                        );

                    }

                }
            );

        });


    /*==========================
          TIME ON PAGE
    ==========================*/

    let startTime = Date.now();

    const sendTimeOnPage = () => {

        if (!startTime) {
            return;
        }

        const seconds =
            Math.round(
                (Date.now() - startTime) / 1000
            );

        if (
            seconds > 0 &&
            typeof gtag === "function"
        ) {

            gtag(
                "event",
                "time_on_page",
                {
                    seconds: seconds
                }
            );

        }

        startTime = null;

    };


    document.addEventListener(
        "visibilitychange",
        () => {

            if (
                document.visibilityState ===
                "hidden"
            ) {

                sendTimeOnPage();

            }

        }
    );


    /*==========================
          JAVASCRIPT ERROR GA4
    ==========================*/

    window.addEventListener(
        "error",
        event => {

            if (
                typeof gtag === "function"
            ) {

                gtag(
                    "event",
                    "javascript_error",
                    {
                        message:
                            event.message ||
                            "Unknown error"
                    }
                );

            }

        }
    );


    /*==========================
          INITIALIZE
    ==========================*/

    handleScroll();

});
