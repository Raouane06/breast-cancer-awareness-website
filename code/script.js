// تنشيط القائمة المتنقلة
const menuToggle = document.getElementById('menuToggle');
const nav = document.querySelector('nav');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// إغلاق القائمة عند النقر على رابط
const navLinks = document.querySelectorAll('nav ul li a');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
    });
});

// تأثيرات الأرقام المتزايدة
function animateValue(id, start, end, duration) {
    const obj = document.getElementById(id);
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        obj.innerHTML = value.toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// تشغيل تأثيرات الأرقام عند التمرير إلى القسم
function startCounters() {
    animateValue('stat1', 0, 2300000, 2000);
    animateValue('stat2', 0, 98, 1500);
    animateValue('stat3', 0, 40, 1500);
}

const aboutSection = document.querySelector('.about');
const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startCounters();
            aboutObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

aboutObserver.observe(aboutSection);

// تبويبات طرق الكشف
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

tabBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        // إزالة النشاط من جميع الأزرار والألواح
        tabBtns.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        
        // إضافة النشاط إلى الزر واللوح المحدد
        btn.classList.add('active');
        tabPanes[index].classList.add('active');
    });
});

// نموذج التذكير بالموعد
const reminderForm = document.getElementById('setReminder');

reminderForm.addEventListener('click', (e) => {
    e.preventDefault();
    const date = document.getElementById('screeningDate').value;
    const email = document.getElementById('reminderEmail').value;
    
    if (date && email) {
        alert(`تم تسجيل موعدك للكشف في تاريخ ${date}. سيتم إرسال تذكير إلى بريدك الإلكتروني ${email}`);
        document.getElementById('screeningDate').value = '';
        document.getElementById('reminderEmail').value = '';
    } else {
        alert('الرجاء إدخال تاريخ الفحص والبريد الإلكتروني');
    }
});

// نموذج الاتصال
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    if (name && email && message) {
        alert(`شكراً ${name} على رسالتك. سنتواصل معك على بريدك الإلكتروني ${email} في أقرب وقت.`);
        contactForm.reset();
    } else {
        alert('الرجاء ملء جميع الحقول المطلوبة');
    }
});

// تأثيرات التمرير البسيطة
const aosElements = document.querySelectorAll('[data-aos]');

function checkAOS() {
    aosElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const isVisible = (rect.top <= window.innerHeight * 0.8) && (rect.bottom >= 0);
        
        if (isVisible) {
            el.classList.add('aos-animate');
        }
    });
}

window.addEventListener('scroll', checkAOS);
window.addEventListener('load', checkAOS);

// إضافة تاريخ اليوم كقيمة افتراضية لتاريخ الفحص
document.getElementById('screeningDate').min = new Date().toISOString().split('T')[0];