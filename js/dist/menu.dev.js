"use strict";

document.addEventListener('DOMContentLoaded', function () {
  var menuButton = document.querySelector('.header__menu-button');
  var menu = document.getElementById('header__nav');
  var menuLinks = document.querySelectorAll('.header__nav-link');
  var html = document.documentElement;

  if (menuButton && menu) {
    var isMobileView = function isMobileView() {
      return mobileMediaQuery.matches;
    };

    var toggleMenu = function toggleMenu(isOpen) {
      if (isAnimating) return;
      isAnimating = true;
      menuButton.setAttribute('aria-expanded', isOpen);
      menu.setAttribute('aria-hidden', !isOpen);

      if (isMobileView()) {
        menuLinks.forEach(function (link) {
          link.setAttribute('tabindex', isOpen ? '0' : '-1');
        });

        if (isOpen) {
          menu.classList.add('open');
          html.classList.add('menu-open');
          setTimeout(function () {
            isAnimating = false;
          }, 400);
        } else {
          setTimeout(function () {
            menu.classList.remove('open');
            html.classList.remove('menu-open');
            isAnimating = false;
          }, 300);
        }
      } else {
        menuLinks.forEach(function (link) {
          link.removeAttribute('tabindex');
        });
        menu.classList.remove('open');
        html.classList.remove('menu-open');
        isAnimating = false;
      }
    };

    var isAnimating = false;
    var mobileMediaQuery = window.matchMedia('(max-width: 768px)');
    menuButton.addEventListener('click', function () {
      var isExpanded = this.getAttribute('aria-expanded') === 'true';
      toggleMenu(!isExpanded);
    });
    menuLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        if (isMobileView()) {
          setTimeout(function () {
            toggleMenu(false);
          }, 200);
        }
      });
    });
    var resizeTimeout;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(function () {
        if (!isMobileView()) {
          menuButton.setAttribute('aria-expanded', 'false');
          menu.setAttribute('aria-hidden', 'true');
          menuLinks.forEach(function (link) {
            link.removeAttribute('tabindex');
          });
          menu.classList.remove('open');
          html.classList.remove('menu-open');
          isAnimating = false;
        }
      }, 100);
    });
    document.addEventListener('click', function (event) {
      if (isMobileView() && menu.classList.contains('open') && !menu.contains(event.target) && !menuButton.contains(event.target)) {
        toggleMenu(false);
      }
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && menu.classList.contains('open')) {
        toggleMenu(false);
        menuButton.focus();
      }
    });

    if (isMobileView()) {
      menu.classList.remove('open');
    }
  }
});
document.addEventListener('DOMContentLoaded', function () {
  var questionItems = document.querySelectorAll('.questions__item');

  if (questionItems.length) {
    questionItems.forEach(function (item, index) {
      var header = item.querySelector('.questions__item-header');
      var button = item.querySelector('.questions__item-button');
      var content = item.querySelector('.questions__item-content');

      if (content) {
        var answerId = "faq-answer-".concat(index);
        content.id = answerId;

        if (button) {
          button.setAttribute('aria-controls', answerId);
          button.setAttribute('aria-expanded', item.classList.contains('questions__item_open') ? 'true' : 'false');
        }
      }
    });
    questionItems.forEach(function (item) {
      var header = item.querySelector('.questions__item-header');
      var button = item.querySelector('.questions__item-button');
      if (!header) return;

      var toggleQuestion = function toggleQuestion() {
        var isOpen = item.classList.contains('questions__item_open');

        if (isOpen) {
          item.classList.remove('questions__item_open');
          if (button) button.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('questions__item_open');
          if (button) button.setAttribute('aria-expanded', 'true');
        }
      };

      header.style.cursor = 'pointer';
      header.addEventListener('click', toggleQuestion);
      header.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleQuestion();
        }
      });

      if (button) {
        button.addEventListener('click', function (e) {
          e.stopPropagation();
          toggleQuestion();
        });
        button.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            e.stopPropagation();
            toggleQuestion();
          }
        });
      }
    });
  }
});