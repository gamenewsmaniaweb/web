header: function() {
			
			const toggleDarkMode = (scheme) => {
				const prevScheme = (scheme == 'dark' ? 'light' : 'dark');

				const htmlClass = $('html').data('origClass');
				let initialScheme;
				if (htmlClass) {
					initialScheme = htmlClass.includes('s-dark') ? 'dark' : 'light';
				}

				if (scheme !== initialScheme) {
					localStorage.setItem(schemeKey, scheme);
				}
				else {
					localStorage.removeItem(schemeKey);
				}
				
				$('html')
					.removeClass(`s-${prevScheme} site-s-${prevScheme}`)
					.addClass(`s-${scheme} site-s-${scheme}`);
			};
			
			$('.scheme-switcher .toggle').on('click', function() {
				const ele  = $(this);
				let scheme = ele.hasClass('toggle-dark') ? 'dark' : 'light';

				toggleDarkMode(scheme);

				
				document.querySelectorAll('iframe.spc-auto-load-post').forEach(element => {
					element.contentWindow.postMessage({
						action: 'toggle-dark-mode',
						scheme
					}, '*');
				});

				return false;
			});

			if (isIframe) {
				window.addEventListener('message', e => {
					if (!e.data || e.data.action !== 'toggle-dark-mode') {
						return;
					}

					toggleDarkMode(e.data.scheme);
				});
			}
		},
		stickySidebar: function() {

			const stickyHeaderHeight = () => {
				const stickyHead = $('.smart-head-sticky');
				let addHeight = 0;
				if (stickyHead.length) {
					let height = window.getComputedStyle(stickyHead[0]).getPropertyValue('--head-h');
					addHeight = parseInt(height) || 0;
				}

				return addHeight;
			}

			const initNative = () => {
				if (!$('.ts-sticky-native').length) {
					return;
				}

				let baseTop = 20;
				if ($('.admin-bar').length) {
					baseTop += $('#wpadminbar').height();
				}
				
				const setTop = top => $('body').css('--ts-sticky-top', top + 'px');				

				$(document).on('sticky-bar-show', () => setTop(baseTop + stickyHeaderHeight()));
				$(document).on('sticky-bar-hide', () => setTop(baseTop));
			}

			const init = (addExtra) => {

				const sticky = $('.ts-sticky-col, .main-sidebar[data-sticky=1]');
				if (!sticky.length) {
					return;
				}
				
				let add = 20;
				if ($('.admin-bar').length) {
					add += $('#wpadminbar').height();
				}
				add += addExtra || 0;

				sticky.each(function() {

					var stickyCol = $(this);
					if (stickyCol.data('init') || stickyCol.hasClass('.ts-sticky-native')) {
						return;
					}

					stickyCol.data('init', 1);
					
		
					if (!stickyCol.find('.theiaStickySidebar').length) {
						stickyCol.find('.elementor-widget-wrap').first().addClass('theiaStickySidebar');
						stickyCol.css({display: 'block'});
					}

					stickyCol.theiaStickySidebar({
						minWidth: 940, 
						updateSidebarHeight: false,
						additionalMarginTop: add,
						additionalMarginBottom: 20,
						disableOnResponsiveLayouts: false
					});
					

						if (newMarginTop !== options.additionalMarginTop) {
							// Ignore unexpected negative transform of scrolling down.
							if (!sticky.css('transform').includes('-')) {
								options.additionalMarginTop = newMarginTop;
								setTimeout(() => $(window).trigger('scroll.TSS'), 300);
							}
						}
					});

					// Reset margins on sticky bar hide.
					$(document).on('sticky-bar-hide', () => {
						options.additionalMarginTop = add;
						setTimeout(() => $(window).trigger('scroll.TSS'), 300);
					});
				});
			};

			init();
			initNative();
			
			// for iframe loads in sidebar
			Bunyad.util.onLoad(() => setTimeout(() => {
				$(window).trigger('resize.TSS');
			}, 3500));
		},
		responsiveNav: function() {
			this.initResponsiveNav();
		},

		initResponsiveNav: function() {
			
			if (responsiveMenu || !$('.off-canvas').length) {
				responsiveMenu = true;
				return;
			}
			
			// Set responsive initialized
			responsiveMenu = true;

		
			const hasOverlayScroll = () => {
				const ele = document.createElement("div");
				ele.setAttribute("style", "width:30px;height:30px;overflow:scroll;opacity:0");
				document.body.appendChild(ele);

				const result = ele.offsetWidth === ele.clientWidth;
				document.body.removeChild(ele);
				
				return result;
			}

			const setupScroll = () => {
				if (!hasTouch && !hasOverlayScroll()) {
					document.body.classList.add("has-scrollbar");
	
					// Reflow to fix scrollbars.
					const ele = $('.off-canvas-content');
					ele.css('display', 'block');
	
					requestAnimationFrame(function() {
						ele.css('display', 'flex');
					});
				}
			}

			const setupMenuHandlers = () => {
				// Setup mobile menu click handlers
				$('.mobile-menu li > a').each(function() {
					
					if ($(this).parent().children('ul').length) {
						$('<span class="chevron"><i class="tsi tsi-chevron-down"></i></span>').insertAfter($(this));
					}
				});
				
				$('.mobile-menu li .chevron').on('click', function() {
					$(this).closest('li').find('ul')
						.first()
						.parent()
						.toggleClass('active item-active');

					return false;
				});
			}

			const setupMobileMenu = () => {
				var container = $('.mobile-menu-container');

				// No items for mobile menu? Grab from others
				if (!container.find('.mobile-menu').children().length) {
					
					// Merge existing menus
					var mobileMenu = container.find('.mobile-menu'),
						mainMenu = $('.navigation-main .menu');
						
					if (!mainMenu.length) {
						return;
					}

					var menu = mainMenu.children().clone();
					
					// add category mega menu links
					menu.find('.mega-menu .sub-cats').each(function() {
						var container = $(this).closest('.menu-item');
						
						container.append($(this).find('.sub-nav'));
						container.find('.sub-nav').replaceWith(function() {
							return $('<ul />', {html: $(this).html()});
						});
						
						$(this).remove();
					});
					
					mobileMenu.append(menu);
				}
			}

			// Delayed setup.
			let isMenuSetup = false;
			const initSetup = () => {
				setupScroll();
				setupMobileMenu();
				setupMenuHandlers();
				
				isMenuSetup = true;
			};

 requestIdleCallback(initSetup, {timeout: 1000}));
			const showMenu = () => {
				if (!isMenuSetup) {
					initSetup();
				}
				
				$('html').toggleClass('off-canvas-active');
			}
		
			$('.mobile-head .menu-icon a, .smart-head .offcanvas-toggle')
				.on('click', function() {
					$(document).trigger('ts-sticky-bar-remove');
					showMenu();
				});

		
			$('.off-canvas .close').on('click', function() {
				showMenu();
				return false;
			});

			$('.off-canvas-backdrop').on('click', function() {
				$('.off-canvas .close').click();
				return false;
			})
		},

		megaMenus: function() {
			const media = window.matchMedia('(min-width: 940px)');
			const init  = e => {
				if (e.matches) {
					this.initMegaMenus();
				}
				media.removeListener(init);
			};

			init(media);
			media.addListener(init);
		},

		initMegaMenus: function() {
			// Bind events for mega menus
			$('.navigation .mega-menu-a').each(function() {
				
				var menu = $(this),
				    number = menu.find('.recent-posts').data('columns');
				
				// Init mega menus
				var default_mega_menu = function f() {
					menu.find('.posts').last().addClass('active');
					return f;
				}();

				// Mega-menu sub-cats handling.
				menu.find('.menu-item').on('mouseenter', function() {

					var id = parseInt( $(this).attr('class').match(/menu-cat-(\d+)/)[1] || 0 ),
					    menu = $(this).parents('.mega-menu'),
					    view_all = $(this).hasClass('view-all');
				
					if (!view_all && !id) {
						return;
					}
					
			
					menu.find('.active, .current-menu-item').removeClass('active current-menu-item');

					// Activate current
					$(this).addClass('current-menu-item');
					var posts = menu.find('[data-id=' + id + ']').addClass('active');
					
					return false;
				});
				
				menu.parent().on('mouseenter', function() {
					
					var menu = $(this).find('.mega-menu');
					
					// reset at beginning
					menu.find('.active, .current-menu-item')
						.removeClass('active current-menu-item');

					$(this)[0].offsetWidth; // reflow
					default_mega_menu();
				});
				
			});
		},
		
		touchNav: function() {
			
			var targets = $('.menu:not(.mobile-menu) a'),
				open_class = 'item-active',
				child_tag = 'ul, .mega-menu';
			
			targets.each(function() {
				
				var $this = $(this),
					$parent = $this.parent('li'),
					$siblings = $parent.siblings().find('a');
				
				$this.on('click', function(e) {

					var $this = $(this);
					e.stopPropagation();
					
					$siblings.parent('li').removeClass(open_class);
					
					// has a child? open the menu on tap
					if (!$this.parent().hasClass(open_class) && $this.next(child_tag).length > 0 && !$this.parents('.mega-menu.links').length) {
						e.preventDefault();
						$this.parent().addClass(open_class);
					}
				});
			});
			
			// close all menus
			$(document).on('click', function(e) {
				if (!$(e.target).is('.menu') && !$(e.target).parents('.menu').length) {
					targets.parent('li').removeClass(open_class);
				}
			});
		},

		initStickySidebar: function() {

			let hasInit  = false;
			const events = 'resize orientationchange scroll';
			const init = () => {
				if (hasInit) {
					return;
				}

				if (document.documentElement.clientWidth >= 940) {
					self.stickySidebar();
					hasInit = true;
					$(window).off(events, init);
				}
			}

			$(window).on(events, init);
			Bunyad.util.onLoad(init);
		},