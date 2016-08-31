'use strict';

$(document).ready(function () {
	var App = function App() {
		$('[data-phone="true"]').mask("+7 (999) 999-99-99");
		var stackModal = 0;
		$(document).on('show.bs.modal', '.modal', function (event) {
			var zIndex = 1040 + 10 * $('.modal:visible').length;
			$(this).css('z-index', zIndex);
			stackModal++;
			setTimeout(function () {
				$('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
			}, 0);
		});
		$(document).on('hidden.bs.modal', '.modal', function (event) {
			stackModal--;
			if (stackModal > 0) {
				$('body').addClass("modal-open");
			} else {
				$('body').removeClass("modal-open");
			}
		});

		var mainSlider = $('[data-item="main-slider"]');
		var secondSlider = $('[data-item="second-slider"]');
		$('a.smooth').click(function () {
			$('html, body').animate({
				scrollTop: $($.attr(this, 'href')).offset().top - 133
			}, 1000);
			return false;
		});
		$('#datetimepicker1').datetimepicker({
			locale: 'ru',
			viewMode: 'days',
			format: 'DD/MM/YYYY',
			defaultDate: new Date()
		});

		$('.data-picker').on('click', function (e) {
			$(this).find('input').focus();
		});
		$('#datetimepicker1').on('dp.hide', function () {
			$('.data-picker').find('.input-group-addon').removeClass('active');
		});
		$('#datetimepicker1').on('dp.show', function () {
			$('.data-picker').find('.input-group-addon').addClass('active');
		});
		$('[data-item="btn-more"]').on('click', function (e) {
			e.preventDefault();
			$('[data-item="hidden"]').removeClass('hidden');
			$(this).attr('href', '#contactForm');
			$(this).text('Заказать планировку');
			$(this).on('click', function (e) {
				$('html, body').animate({
					scrollTop: $($.attr(this, 'href')).offset().top - 133
				}, 1000);
				return false;
			});
		});
		mainSlider.on('initialized.owl.carousel', function callback(event) {
			var step = 100 / event.item.count;
			var percent = ~ ~((event.item.index + 1) * step);
			$('[data-item="ID1"] .indicator-line div').width(percent + '%');

			var ind = $('[data-item="ID1"] ul li');

			var i;
			for (i = 0; i < ind.length; i++) {
				$(ind[i]).on('click', function () {
					var a = this.getAttribute('data-item');
					mainSlider.trigger('to.owl.carousel', [a, 1000]);
				});
			}

			var indicatorText = $('[data-item="ID1"] ul li');

			$(indicatorText).removeClass('active');
			$(indicatorText[event.item.index]).addClass('active');
		});
		mainSlider.owlCarousel({
			loop: false,
			items: 1,
			autoplay: true,
			smartSpeed: 1000,
			animateOut: 'fadeOut',
			animateIn: 'fadeIn'
		});
		mainSlider.on('changed.owl.carousel', function callback(event) {
			var step = 100 / event.item.count;
			var percent = ~ ~((event.item.index + 1) * step);

			$('[data-item="ID1"] .indicator-line div').width(percent + '%');
			var indicatorText = $('[data-item="ID1"] ul li');
			var i;
			var count = event.item.index;
			$(indicatorText).removeClass('active');
			for (i = 0; i <= count; i++) {
				$(indicatorText[i]).addClass('active');
			}
		});

		secondSlider.on('initialized.owl.carousel', function callback(event) {
			var step = 100 / event.item.count;
			var percent = ~ ~((event.item.index + 1) * step);
			$('[data-item="ID2"] .indicator-line div').width(percent + '%');

			var ind = $('[data-item="ID2"] ul li');

			var i;
			for (i = 0; i < ind.length; i++) {
				$(ind[i]).on('click', function () {
					var a = this.getAttribute('data-item');
					secondSlider.trigger('to.owl.carousel', [a, 1000]);
				});
			}

			var indicatorText = $('[data-item="ID2"] ul li');
			$(indicatorText).removeClass('active');
			$(indicatorText[event.item.index]).addClass('active');
		});
		secondSlider.owlCarousel({
			loop: false,
			items: 1,
			autoplay: true,
			nav: true,
			smartSpeed: 1000,
			animateOut: 'fadeOut',
			animateIn: 'fadeIn',
			navText: ["<i class='icon icon-slider-left'></i>", "<i class='icon icon-slider-right'></i>"]
		});

		secondSlider.on('changed.owl.carousel', function callback(event) {
			var step = 100 / event.item.count;
			var percent = ~ ~((event.item.index + 1) * step);
			$('[data-item="ID2"] .indicator-line div').width(percent + '%');
			var indicatorText = $('[data-item="ID2"] ul li');
			var i;
			var count = event.item.index;
			$(indicatorText).removeClass('active');
			for (i = 0; i <= count; i++) {
				$(indicatorText[i]).addClass('active');
			}
		});

		$('#plans').on('show.bs.modal', function (e) {
			//get name plane
			var planName = $(e.relatedTarget).data('name');
			var modalName = $(e.currentTarget).find('h3');

			//get size plane
			var planSize = $(e.relatedTarget).data('size');
			var modalSize = $(e.currentTarget).find('.modal-plan-size');

			//get size plane
			var planDescription = $(e.relatedTarget).data('description');
			var modalDescription = $(e.currentTarget).find('.modal-plan-description p');

			//get srcImg plane
			var planImg = $(e.relatedTarget).data('img');
			var modalImg = $(e.currentTarget).find('.modal-plan-img img');

			//set title modal
			modalName.html(planName);

			//set size modal
			modalSize.html(planSize);

			//set description modal
			modalDescription.html(planDescription);

			//set srcImg modal
			console.log(planImg);
			modalImg.attr('src', planImg);
		});
		$('.hide-map').on('click', function (e) {
			e.preventDefault();
			var item = e.currentTarget;
			$(item).parents('.overflow').toggleClass('hide-m');
		});
		var Form = {
			ValidationOptions: {
				framework: 'bootstrap',

				locale: 'ru_RU',

				fields: {
					userName: {
						trigger: 'blur keyup focus',
						validators: {
							notEmpty: {
								message: 'Это поле не может быть пустым!'
							},
							blank: {}
						}
					},
					userPhoneNumber: {
						trigger: 'blur keyup focus',
						validators: {
							notEmpty: {
								message: 'Это поле не может быть пустым!'
							},
							blank: {}
						}
					},
					userEmail: {
						trigger: 'blur keyup focus',
						validators: {
							notEmpty: {
								message: 'Это поле не может быть пустым!'
							},
							blank: {}
						}
					}

				}
			},

			initialize: function initialize() {
				this.Validation('form');
			},
			Validation: function Validation(form) {
				$(form).formValidation(this.ValidationOptions)
				/*.on('err.field.fv', function(e, data) {
    	data.element
    	.data('fv.messages')
    	.find('.help-block[data-fv-for="' + data.field + '"]').hide();
    })*/
				.on('success.form.fv', function (e) {
					e.preventDefault();
					var $form = $(e.target),
					    fv = $form.data('formValidation');

					$form.ajaxSubmit({
						success: function success(responseText, statusText, xhr, $form) {
							console.log(responseText, statusText, xhr, $form);

							var thxCheck = $form.data('thx');
							$('.modal').modal('hide');
							if (thxCheck === 'one') {
								$('#thxCall').modal('show');
							} else if (thxCheck === 'two') {
								$('#thxPlans').modal('show');
							} else {
								$('#thxCall').modal('show');
							}
						}
					});
				});
			}
		};
		Form.initialize();
	};

	App();
});