"use strict";
const JSCCommon = {
	modalCall() {
		const link = '[data-fancybox="modal"], .link-modal-js';

		Fancybox.bind(link, {
			arrows: false,
			// infobar: false,
			touch: false,
			trapFocus: false,
			placeFocusBack: false,
			infinite: false,
			dragToClose: false,
			type: 'inline',
			autoFocus: false,
			groupAll: false,
			groupAttr: false,
			// showClass: "fancybox-throwOutUp",
			// hideClass: "fancybox-throwOutDown",
			l10n: {
				Escape: "Закрыть",
				NEXT: "Вперед",
				PREV: "Назад",
			},
		});
		document.querySelectorAll(".modal-close-js").forEach(el => {
			el.addEventListener("click", () => {
				Fancybox.close();
			})
		})
		Fancybox.bind('[data-fancybox]', {
			placeFocusBack: false,
		});
		document.addEventListener('click', (event) => {
			let element = event.target.closest(link)
			if (!element) return;
			let modal = document.querySelector("#" + element.dataset.src);
			const data = element.dataset;

			function setValue(val, elem) {
				if (elem && val) {
					const el = modal.querySelector(elem)
					el.tagName == "INPUT"
						? el.value = val
						: el.innerHTML = val;
					// console.log(modal.querySelector(elem).tagName)
				}
			}
			setValue(data.title, '.ttu');
			setValue(data.text, '.after-headline');
			setValue(data.btn, '.btn');
			setValue(data.order, '.order');
		})
	},
	// /modalCall
	toggleMenu() {
		document.addEventListener("click", function (event) {
			const toggle = document.querySelectorAll(".toggle-menu-mobile--js");
			const menu = document.querySelector(".menu-mobile--js");
			const toggleEv = event.target.closest(".toggle-menu-mobile--js");
			if (!toggleEv) return;
			toggle.forEach(el => el.classList.toggle("on"));
			menu.classList.toggle("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.toggle("fixed"));
		}, { passive: true });
	},
	closeMenu() {
		const toggle = document.querySelectorAll(".toggle-menu-mobile--js");
		const menu = document.querySelector(".menu-mobile--js");
		if (!menu) return;
		if (menu.classList.contains("active")) {
			toggle.forEach(element => element.classList.remove("on"));
			menu.classList.remove("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.remove("fixed"));
		}

	},
	mobileMenu() {
		const menu = document.querySelector(".menu-mobile--js");
		if (!menu) return;
		this.toggleMenu();
		document.addEventListener('mouseup', (event) => {
			let container = event.target.closest(".menu-mobile--js.active"); // (1)
			let link = event.target.closest(".menu-mobile .menu a"); // (1)
			let toggle = event.target.closest('.toggle-menu-mobile--js.on'); // (1)
			if (!container && !toggle) this.closeMenu();
		}, { passive: true });

		window.addEventListener('resize', () => {
			if (window.matchMedia("(min-width: 992px)").matches) this.closeMenu();
		}, { passive: true });
	},

	// tabs  .
	tabscostume(tab) {
		// const tabs = document.querySelectorAll(tab);
		// const indexOf = element => Array.from(element.parentNode.children).indexOf(element);
		// tabs.forEach(element => {
		// 	let tabs = element;
		// 	const tabsCaption = tabs.querySelector(".tabs__caption");
		// 	const tabsBtn = tabsCaption.querySelectorAll(".tabs__btn");
		// 	const tabsWrap = tabs.querySelector(".tabs__wrap");
		// 	const tabsContent = tabsWrap.querySelectorAll(".tabs__content");
		// 	const random = Math.trunc(Math.random() * 1000);
		// 	tabsBtn.forEach((el, index) => {
		// 		const data = `tab-content-${random}-${index}`;
		// 		el.dataset.tabBtn = data;
		// 		const content = tabsContent[index];
		// 		content.dataset.tabContent = data;
		// 		if (!content.dataset.tabContent == data) return;

		// 		const active = content.classList.contains('active') ? 'active' : '';
		// 		// console.log(el.innerHTML);
		// 		content.insertAdjacentHTML("beforebegin", `<div class="tabs__btn-accordion  btn btn-primary  mb-1 ${active}" data-tab-btn="${data}">${el.innerHTML}</div>`)
		// 	})


		// 	tabs.addEventListener('click', function (element) {
		// 		const btn = element.target.closest(`[data-tab-btn]:not(.active)`);
		// 		if (!btn) return;
		// 		const data = btn.dataset.tabBtn;
		// 		const tabsAllBtn = this.querySelectorAll(`[data-tab-btn`);
		// 		const content = this.querySelectorAll(`[data-tab-content]`);
		// 		tabsAllBtn.forEach(element => {
		// 			element.dataset.tabBtn == data
		// 				? element.classList.add('active')
		// 				: element.classList.remove('active')
		// 		});
		// 		content.forEach(element => {
		// 			element.dataset.tabContent == data
		// 				? (element.classList.add('active'), element.previousSibling.classList.add('active'))
		// 				: element.classList.remove('active')
		// 		});
		// 	})
		// })

		$('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
			$(this)
				.addClass('active').siblings().removeClass('active')
				.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
				.eq($(this).index()).fadeIn().addClass('active');

		});

	},
	// /tabs

	inputMask() {
		// mask for input
		let InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(element => element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}"));
		Inputmask({ "mask": "+9(999)999-99-99", showMaskOnHover: false }).mask(InputTel);
	},
	// /inputMask
	sendForm() {
		var gets = (function () {
			var a = window.location.search;
			var b = new Object();
			var c;
			a = a.substring(1).split("&");
			for (var i = 0; i < a.length; i++) {
				c = a[i].split("=");
				b[c[0]] = c[1];
			}
			return b;
		})();
		// form
		$(document).on('submit', "form", function (e) {
			e.preventDefault();
			const th = $(this);
			var data = th.serialize();
			th.find('.utm_source').val(decodeURIComponent(gets['utm_source'] || ''));
			th.find('.utm_term').val(decodeURIComponent(gets['utm_term'] || ''));
			th.find('.utm_medium').val(decodeURIComponent(gets['utm_medium'] || ''));
			th.find('.utm_campaign').val(decodeURIComponent(gets['utm_campaign'] || ''));
			$.ajax({
				url: 'action.php',
				type: 'POST',
				data: data,
			}).done(function (data) {

				Fancybox.close();
				Fancybox.show([{ src: "#modal-thanks", type: "inline" }]);
				// window.location.replace("/thanks.html");
				setTimeout(function () {
					// Done Functions
					th.trigger("reset");
					// $.magnificPopup.close();
					// ym(53383120, 'reachGoal', 'zakaz');
					// yaCounter55828534.reachGoal('zakaz');
				}, 4000);
			}).fail(function () { });

		});
	},
	heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01;
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		// We listen to the resize event
		window.addEventListener('resize', () => {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}, { passive: true });
	},
	heightSlide() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		function getSlideH() {
			let slideI = document.querySelectorAll('.article-item__img-wrap');
			if (slideI.length == 0) return;
			let slideH, index = 0;
			for (const iterator of slideI) {
				if (index < 1) {
					slideH = iterator.offsetHeight;
					index++;
				} else break;
			};
			// console.log(slideH);
			document.documentElement.style.setProperty('--slideH', `${slideH}px`);
		};
		getSlideH();
		// We listen to the resize event
		window.addEventListener('resize', () => {
			// We execute the same script as before
			getSlideH();
		}, { passive: true });
	},
	animateScroll() {
		$(document).on('click', " .menu li a, .scroll-link", function () {
			const elementClick = $(this).attr("href");
			if (!document.querySelector(elementClick)) {
				$(this).attr("href", '/' + elementClick)
			}
			else {
				let destination = $(elementClick).offset().top;
				$('html, body').animate({ scrollTop: destination - 80 }, 0);
				return false;
			}
		});
	},
	getCurrentYear(el) {
		let now = new Date();
		let currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear();
	},
	toggleShow(toggle, drop) {

		let catalogDrop = drop;
		let catalogToggle = toggle;

		$(document).on('click', catalogToggle, function () {
			$(this).toggleClass('active').next().fadeToggle('fast', function () {
				$(this).toggleClass("active")
			});
		})

		document.addEventListener('mouseup', (event) => {
			let container = event.target.closest(catalogDrop + ".active"); // (1)
			let link = event.target.closest(catalogToggle); // (1)
			if (!container || !catalogToggle) {
				$(catalogDrop).removeClass('active').fadeOut();
				$(catalogToggle).removeClass('active');
			};
		}, { passive: true });
	},
	makeDDGroup() {
		let parents = document.querySelectorAll('.dd-group-js');
		for (let parent of parents) {
			if (parent) {
				// childHeads, kind of funny))
				let ChildHeads = parent.querySelectorAll('.dd-head-js:not(.disabled)');
				$(ChildHeads).click(function () {
					let clickedHead = this;

					$(this.parentElement).toggleClass('active');
					$(this.parentElement).find('.dd-content-js').slideToggle(function () {
						$(this).toggleClass('active');
					});
					// $(ChildHeads).each(function () {
						// if (this === clickedHead) {
						// 	//parent element gain toggle class, style head change via parent
						// }
						// else {
						// 	$(this.parentElement).removeClass('active');
						// 	$(this.parentElement).find('.dd-content-js').slideUp(function () {
						// 		$(this).removeClass('active');
						// 	});
						// }
					// });

				});
			}
		}
	},
	imgToSVG() {
		const convertImages = (query, callback) => {
			const images = document.querySelectorAll(query);

			images.forEach(image => {
				fetch(image.src)
					.then(res => res.text())
					.then(data => {
						const parser = new DOMParser();
						const svg = parser.parseFromString(data, 'image/svg+xml').querySelector('svg');

						if (image.id) svg.id = image.id;
						if (image.className) svg.classList = image.classList;

						image.parentNode.replaceChild(svg, image);
					})
					.then(callback)
					.catch(error => console.error(error))
			});
		};

		convertImages('.img-svg-js');
	},
	getRange() {
		var $range = $(".js-range-slider");
		var $inputFrom = $(".js-input-from");
		var $inputTo = $(".js-input-to");
		var instance;
		var min = 0;
		var max = 999999;
		var from = 0;
		var to = 0;

		$range.ionRangeSlider({
			skin: "round",
			type: "double",
			min: min,
			max: max,
			from: 9999,
			to: 999999,
			onStart: updateInputs,
			onChange: updateInputs,
			onFinish: updateInputs
		});
		instance = $range.data("ionRangeSlider");

		function updateInputs(data) {
			from = data.from;
			to = data.to;

			$inputFrom.prop("value", from);
			$inputTo.prop("value", to);
		}

		$inputFrom.on("change", function () {
			var val = $(this).prop("value");
			// console.log(val);
			// validate
			if (val < min) {
				val = min;
			} else if (val > to) {
				val = to;
			}
			instance.update({
				from: val
			});
			$(this).prop("value", val);
		});

		$inputTo.on("change", function () {
			var val = $(this).prop("value");
			// validate
			if (val < from) {
				val = from;
			} else if (val > max) {
				val = max;
			}
			instance.update({
				to: val
			});
			$(this).prop("value", val);
		});
	},

};
const $ = jQuery;

function eventHandler() {
	JSCCommon.modalCall();
	JSCCommon.tabscostume('tabs');
	JSCCommon.mobileMenu();
	JSCCommon.inputMask();
	// JSCCommon.sendForm();
	JSCCommon.heightwindow();
	JSCCommon.getRange();
	JSCCommon.makeDDGroup();
	// JSCCommon.toggleShow(".catalog-block__toggle--desctop", '.catalog-block__dropdown');
	// JSCCommon.animateScroll();

	// JSCCommon.CustomInputFile(); 
	var x = window.location.host;
	let screenName;
	screenName = document.body.dataset.bg;
	if (screenName && x.includes("localhost:30")) {
		document.body.insertAdjacentHTML("beforeend", `<div class="pixel-perfect" style="background-image: url(screen/${screenName});"></div>`);
	}


	function setFixedNav() {
		let topNav = document.querySelector('.top-nav  ');
		if (!topNav) return;
		window.scrollY > 0
			? topNav.classList.add('fixed')
			: topNav.classList.remove('fixed');
	}

	function whenResize() {
		setFixedNav();
	}

	window.addEventListener('scroll', () => {
		setFixedNav();

	}, { passive: true })
	window.addEventListener('resize', () => {
		whenResize();
	}, { passive: true });

	whenResize();


	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		spaceBetween: 0,
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true,
			// renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }
		},
	}

	const swiperbreadcrumb = new Swiper('.breadcrumb-slider--js', {
		slidesPerView: 'auto',
		freeMode: true,
		watchOverflow: true
	});
	const menuSlider = new Swiper('.menu-slider--js', {
		slidesPerView: 'auto',
		watchOverflow: true,
		spaceBetween: 16
	});
	const swiperTabsb = new Swiper('.tabs-swiper', {
		slidesPerView: 'auto',
		freeMode: true,
		watchOverflow: true
	});

	const swiper4 = new Swiper('.sBanners__slider--js', {
		// slidesPerView: 5,
		...defaultSl,
		slidesPerView: 'auto',
		freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		freeModeMomentum: true,

	});
	const headerBlocks = document.querySelectorAll('.headerBlock');
	for (const headerBlock of headerBlocks) {
		const headerBlockSlider = new Swiper(headerBlock.querySelector('.headerBlock__slider--js'), {
			slidesPerView: 'auto',
			loopFillGroupWithBlank: true,
			lazy: {
				loadPrevNext: true,
			},
			watchOverflow: true,
			spaceBetween: 16,
			// loop: true,
			navigation: {
				nextEl: headerBlock.querySelector('.swiper-button-next'),
				prevEl: headerBlock.querySelector('.swiper-button-prev'),
			},
			pagination: {
				el: headerBlock.querySelector('.swiper-pagination'),
				type: 'bullets',
				clickable: true,
				// renderBullet: function (index, className) {
				// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
				// }
			},
		});
	};
	const productCards = document.querySelectorAll('.product-card');
	for (const productCard of productCards) {
		const productCardSlider = new Swiper(productCard.querySelector('.product-card__slider--js'), {
			slidesPerView: 'auto',
			loopFillGroupWithBlank: true,
			lazy: {
				loadPrevNext: true,
			},
			watchOverflow: true,
			spaceBetween: 4,
			loop: true,
			pagination: {
				el: productCard.querySelector('.swiper-pagination'),
				type: 'bullets',
				clickable: true,
				// renderBullet: function (index, className) {
				// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
				// }
			},
		});
	};

	const sCategoriesSlider = new Swiper('.sCategories__slider--js', {
		slidesPerView: 'auto',
		loopFillGroupWithBlank: true,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		spaceBetween: 16,
		navigation: {
			nextEl: '.sCategories .swiper-button-next',
			prevEl: '.sCategories .swiper-button-prev',
		},
		breakpoints: {
			// 499.98: {
			// 	slidesPerView: 2.4,
			// 	spaceBetween: 16
			// },
			575.98: {
				slidesPerView: 2.5,
				spaceBetween: 16
			},
			767.98: {
				slidesPerView: 3,
				spaceBetween: 24
			},
			991.98: {
				slidesPerView: 4,
				spaceBetween: 24
			},
			1199.98: {
				slidesPerView: 4,
				spaceBetween: 32
			},
			1399.98: {
				slidesPerView: 4,
				spaceBetween: 40
			},
		}
	});
	const sPopularSlider = new Swiper('.sPopular__slider--js', {
		slidesPerView: 2.5,
		loopFillGroupWithBlank: true,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		spaceBetween: 16,
		navigation: {
			nextEl: '.sPopular .swiper-button-next',
			prevEl: '.sPopular .swiper-button-prev',
		},
		breakpoints: {

			767.98: {
				slidesPerView: 3,
				spaceBetween: 24
			},
			991.98: {
				slidesPerView: 4,
				spaceBetween: 24
			},
			1199.98: {
				slidesPerView: 5,
				spaceBetween: 32
			},
			1399.98: {
				slidesPerView: 6,
				spaceBetween: 40
			},
		}
	});
	const sArticlesSlider = new Swiper('.sArticles__slider--js', {
		slidesPerView: 'auto',
		loopFillGroupWithBlank: true,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		spaceBetween: 16,
		navigation: {
			nextEl: '.sArticles .swiper-button-next',
			prevEl: '.sArticles .swiper-button-prev',
		},
		breakpoints: {
			// 575.98: {
			// 	slidesPerView: 1.5,
			// 	spaceBetween: 16
			// },
			767.98: {
				slidesPerView: 2,
				spaceBetween: 24
			},
			991.98: {
				slidesPerView: 3,
				spaceBetween: 24
			},
			1199.98: {
				slidesPerView: 3,
				spaceBetween: 32
			},
			1399.98: {
				slidesPerView: 3,
				spaceBetween: 40
			},
		}
	});
	const sCatalogSlider = new Swiper('.sCatalog__slider--js', {
		slidesPerView: 'auto',
		loopFillGroupWithBlank: true,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		spaceBetween: 16,
		navigation: {
			nextEl: '.sCatalog .swiper-button-next',
			prevEl: '.sCatalog .swiper-button-prev',
		},
		breakpoints: {
			// 575.98: {
			// 	slidesPerView: 1.5,
			// 	spaceBetween: 16
			// },
			767.98: {
				slidesPerView: 2,
				spaceBetween: 24
			},
			991.98: {
				slidesPerView: 3,
				spaceBetween: 24
			},
			1199.98: {
				slidesPerView: 4,
				spaceBetween: 32
			},
			1399.98: {
				slidesPerView: 4,
				spaceBetween: 40
			},
		}
	});
	// $(".dd-head-js").click(function () {
	// 	$(this).toggleClass("active").next().slideToggle();
	// })

	$('.sFilter__filterCloseBtn').click(function () {
		$('.sFilter__wrap').removeClass('active');
		$('.sFilter__btn').removeClass('active');
		document.body.classList.remove("fixed");
	});

	$(".sFilter__btn").click(function () {
		$('.sFilter__wrap').addClass('active');
		// $(this).toggleClass("active").next().slideToggle();
		document.body.classList.add("fixed");
		$(window).resize(function () {
			if ($(window).width() > 992) {
				$('.sFilter__wrap').removeClass('active');
				document.body.classList.remove("fixed");
			}
		});
	});

	$('.sFilter__filterCloseBtn').click(function () {
		$('.sFilter__wrap').removeClass('active');
		$('.sGoods__btn-bottom').removeClass('active');
		document.body.classList.remove("fixed");
	});

	var StickySummary = new hcSticky('.summary--js', {
		mobileFirst: true,
		responsive: {
			1200: {
				stickTo: '.summary-container-js',
				top: 32,
			}
		}
	});
	var StickySideMenu = new hcSticky('.page-head__aside--js', {
		mobileFirst: true,
		responsive: {
			992: {
				stickTo: '.page-head .asideCol',
				top: 32,
			}
		}
	});



	JSCCommon.heightSlide();

	// modal window

	const sProductCardThumbSwiper = new Swiper('.sProductCard__thumb-slider--thumb-js', {
		// slidesPerView: 6,
		// spaceBetween: 16,
		slidesPerView: 'auto',
		direction: 'vertical',
		// observer: true,
		navigation: {
			nextEl: '.sProductCard__thumb-arrow-wrap .swiper-button-next',
			prevEl: '.sProductCard__thumb-arrow-wrap .swiper-button-prev',
		},
	});
	const sProductCardSwiper2 = new Swiper('.sProductCard__slider--js', {
		slidesPerView: 1,
		// observer: true,
		navigation: {
			nextEl: '.sProductCard__swiper-wrap .swiper-button-next',
			prevEl: '.sProductCard__swiper-wrap .swiper-button-prev',
		},
		thumbs: {
			swiper: sProductCardThumbSwiper,
		},
		pagination: {
			el: '.sProductCard__swiper-wrap .swiper-pagination',
			type: 'bullets',
			clickable: true,
		},
	});

	const sProductCardThumbSwiper2 = new Swiper('.sProductCard__thumb-slider--thumb-js-2', {
		// slidesPerView: 6,
		// spaceBetween: 16,
		slidesPerView: 'auto',
		direction: 'vertical',
		// observer: true,
		navigation: {
			nextEl: '.sProductCard__thumb-arrow-wrap .swiper-button-next',
			prevEl: '.sProductCard__thumb-arrow-wrap .swiper-button-prev',
		},
	});
	const sProductCardSwiper22 = new Swiper('.sProductCard__slider--js-2', {
		slidesPerView: 1,
		// observer: true,
		navigation: {
			nextEl: '.sProductCard__swiper-wrap .swiper-button-next',
			prevEl: '.sProductCard__swiper-wrap .swiper-button-prev',
		},
		thumbs: {
			swiper: sProductCardThumbSwiper2,
		},
		pagination: {
			el: '.sProductCard__swiper-wrap .swiper-pagination',
			type: 'bullets',
			clickable: true,
		},
	});

	sProductCardSwiper22.controller.control = [sProductCardSwiper2];
	sProductCardSwiper2.controller.control = sProductCardSwiper22;

	var StickyMenu = new hcSticky('.sProdCardTabs__fixed-wrap', {
		mobileFirst: true,
		stickTo: '.fixed-tabs-js',
		top: 105,
		responsive: {
			992: {
				top: 120,
			},
		}
	});

	$('.sProdCardTabs__inner-tabs--js').on('click', '.tabs__btn-inner:not(.active)', function (e) {
		$(this)
			.addClass('active').siblings().removeClass('active')
			.closest('.tabs').find('.tabs__content-inner').hide().removeClass('active')
			.eq($(this).index()).fadeIn().addClass('active');

	});

	// Catalog

	let catalog = document.querySelector(".catalog-menu--js");
	
	document.addEventListener("click", function (event) {
		let toggleCatalog = document.querySelectorAll(".catalog-toggle-js");
		
		let menutoggle = document.querySelector(".toggle-menu-mobile");
		let menutoggletarget =  event.target.closest(".toggle-menu-mobile.catalog-toggle-js");
		let target = event.target.closest(".catalog-toggle-js");
		
		let targetcatalog = event.target.closest(".catalog-menu--js.active");
		
		
		let col = $(".col-top-js");
		// let targetMobile = event.target.closest(".top-btns__btn");
		if (target) {
			if (target.classList.contains("top-btns__btn")) {
				event.preventDefault();
					
					catalog.classList.toggle('mobile-active');
					// target.classList.toggle('active');
					
				menutoggle.classList.toggle('toggle-menu-mobile--js');
				menutoggle.classList.toggle('on');
				menutoggle.classList.toggle('catalog-toggle-js');
			}
			catalog.classList.toggle('active');
			col.toggleClass('active');
			// target.classList.toggle('active');
			target.classList.remove('on');
			document.querySelector("body").classList.toggle('fixed-catalog');
			toggleCatalog.forEach(el => el.classList.toggle('active'))
		}
		if (menutoggletarget) {
			catalog.classList.remove('mobile-active');
			menutoggletarget.classList.add('toggle-menu-mobile--js');
			menutoggletarget.classList.remove('on');
			menutoggletarget.classList.remove('catalog-toggle-js');
		}
		// 	else if (!target && !targetcatalog && catalog.classList.contains("active")) {
		// 	catalog.classList.remove('active');
		// 	catalog.classList.remove('mobile-active');
		// 	document.querySelector("body").classList.remove('fixed-catalog');
		// 	toggleCatalog.forEach(el => el.classList.remove('active'))
			
		// }
	})

	if (catalog) {
		catalog.addEventListener("click", function (event) {
			if (!this.classList.contains("mobile-active")) return;
			let link = event.target.closest(".menu-item-has-children>a")
			if (!link) return;
			event.preventDefault();
			console.log(link);
			let parent = link.parentElement;
			let subMenu = parent.querySelector(".sub-menu");
	
			let btnBack = document.createElement("li");
			btnBack.classList.add('catalog-menu-back')
			btnBack.innerHTML = link.innerText;
			
			subMenu.insertAdjacentElement('afterbegin', btnBack);
			
			btnBack.addEventListener("click", function () { 
				subMenu.classList.remove('active');
				document.querySelector(".overflowAll").classList.remove('overflowAll');
				setTimeout(() => {
					
					this.remove();
				}, 200);
			})
				 // console.log(1);
			catalog.classList.add('overflowAll');
			subMenu.classList.add('active');
		})
	};

	$(".search-toggle--js, .search-block__close").click(function () {
		$(this).toggleClass("active")
		$('.searchBlock-wrap--js').toggleClass("active")
	})

	document.addEventListener('mouseup', (event) => {
		let container2 = event.target.closest("   .searchBlock-wrap--js.active"); 
		let container3 = event.target.closest(" .search-toggle--js.active"); 
		if (!container2 && !container3) { 
			$(' .searchBlock-wrap--js.active').removeClass('active')
			$(".search-toggle--js.active").removeClass('active'); 
			};
	}, { passive: true });

	let accountTables = document.querySelectorAll('.lcTable table');
	if(accountTables) {
		for (let accountTable of accountTables) {
			accountTable.querySelector('thead').addEventListener('click', function() {
				accountTable.classList.toggle('active');
			})
		}
	}

	$('.header--js').hcSticky({
    // stickTo: $('#content')
  });
};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}

// window.onload = function () {
// 	document.body.classList.add('loaded_hiding');
// 	window.setTimeout(function () {
// 		document.body.classList.add('loaded');
// 		document.body.classList.remove('loaded_hiding');
// 	}, 500);
// }

if (document.querySelector("#map")) {


	ymaps.ready(function () {
		var myMap = new ymaps.Map('map', {
			center: [55.66467685895322,37.63261428703306],
			zoom: 16,
			controls: ['zoomControl']
		}, {
			//searchControlProvider: 'yandex#search'
		}),
			// Создаём макет содержимого.
			// MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
			// 		'<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
			// ),

			myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
				// hintContent: 'Поволжская Металлоломная Компания',
				// balloonContent: 'г. Самара, ул. Земеца, д. 32'
			}, {
				// Опции.
				// Необходимо указать данный тип макета.
				iconLayout: 'default#image',
				// Своё изображение иконки метки.
				iconImageHref: 'img/svg/map-mark.svg',
				// Размеры метки.
				iconImageSize: [48, 48],
				// Смещение левого верхнего угла иконки относительно
				// её "ножки" (точки привязки).
				iconImageOffset: [-24, -48]
			});
		myMap.behaviors.disable('scrollZoom');
		//на мобильных устройствах... (проверяем по userAgent браузера)
		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
			//... отключаем перетаскивание карты
			myMap.behaviors.disable('drag');
		}
		myMap.geoObjects
			.add(myPlacemark);
	});

}