import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, AfterViewInit, HostListener } from '@angular/core';

interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
}

interface Testimonial {
  id: string;
  text: string;
  author: string;
  location: string;
  rating: number;
}

interface WhyChooseUs {
  id: string;
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  private observer?: IntersectionObserver;
  private scrollY = 0;

  services: Service[] = [
    {
      id: '1',
      icon: '📝',
      title: 'Individual Tax Preparation',
      description:
        'Whether you have a simple return or multiple income sources, we maximize deductions and ensure accuracy.',
    },
    {
      id: '2',
      icon: '💼',
      title: 'Self-Employed & 1099 Income',
      description:
        'Freelancers, contractors, and side hustlers deserve expert guidance. We optimize your business deductions.',
    },
    {
      id: '3',
      icon: '🏢',
      title: 'Small Business Tax Services',
      description:
        'S-Corp, Partnership, or LLC? We handle all business structures and maximize business deductions.',
    },
    {
      id: '4',
      icon: '🏠',
      title: 'Real Estate & Rental Property Tax',
      description:
        'Investment property owners trust us to handle complex depreciation and multi-property optimization.',
    },
    {
      id: '5',
      icon: '🗺️',
      title: 'Multi-State Returns',
      description:
        'Working in multiple states? We navigate complex multi-state tax requirements so you don\'t have to.',
    },
    {
      id: '6',
      icon: '📊',
      title: 'Year-Round Tax Planning',
      description:
        'Don\'t wait until April. Quarterly planning, IRS representation, and strategic guidance throughout the year.',
    },
  ];

  whyChooseUs: WhyChooseUs[] = [
    {
      id: '1',
      icon: '🏆',
      title: '19 Years Local Expertise',
      description:
        'Since 2006, Richard Schwartz has been helping Denver professionals, business owners, and investors navigate complex tax situations with confidence.',
    },
    {
      id: '2',
      icon: '👥',
      title: 'Your Friend, Not Just a Number',
      description:
        'We believe you\'re more than just a tax return. Richard personally handles your account with expert guidance tailored to your unique situation.',
    },
    {
      id: '3',
      icon: '💰',
      title: 'Fair, Transparent Pricing',
      description:
        'Starting at just $77 for simple returns. We\'re upfront about costs—quality tax preparation shouldn\'t drain your bank account.',
    },
    {
      id: '4',
      icon: '📅',
      title: 'Expert Help When You Need It',
      description:
        'Tax planning doesn\'t end on April 15th. We\'re available throughout the year for planning, IRS issues, and strategic guidance.',
    },
  ];

  testimonials: Testimonial[] = [
    {
      id: '1',
      text: 'Went here after calling ahead to make an appointment. Met with Richard and he made the process painless and easy. Half an hour and my taxes were filed electronically. He charged me just $77.',
      author: 'John J.',
      location: 'Denver, CO',
      rating: 5,
    },
    {
      id: '2',
      text: 'This is my first year working with Richard and I\'m very glad I found his business. This man is an excellent, excellent accountant. His secretary is extremely friendly and responsive.',
      author: 'Krista A.',
      location: 'Denver, CO',
      rating: 5,
    },
    {
      id: '3',
      text: 'Richard has been my accountant for the past 5 years and I cannot praise him enough. He is terrific with our taxes, real estate transactions, and giving us good guidance. Highly recommended!',
      author: 'Michael T.',
      location: 'Denver, CO',
      rating: 5,
    },
    {
      id: '4',
      text: 'I had a complex tax situation with rental properties and multiple income streams. Richard took everything off my plate and got me every deduction I deserved. Worth every penny.',
      author: 'Sarah M.',
      location: 'Denver, CO',
      rating: 5,
    },
  ];

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.scrollY = window.scrollY;
    this.applyParallaxEffect();
  }

  ngOnInit(): void {
    this.setupScrollAnimations();
  }

  ngAfterViewInit(): void {
    this.observeElements();
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupScrollAnimations(): void {
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px 0px -100px 0px',
      threshold: 0.15,
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);
  }

  private observeElements(): void {
    if (!this.observer) return;

    const elementsToAnimate = document.querySelectorAll(
      '.scroll-animate, .why-card, .service-card, .testimonial-card, .section-header, .hero__container, .services-intro__card, .about-richard__content, .cta-content, .why-choose-us__highlight, .about-richard__image-wrapper, .testimonials__stats-banner, .services-cta'
    );

    elementsToAnimate.forEach((element) => {
      this.observer?.observe(element);
    });
  }

  private applyParallaxEffect(): void {
    const heroBackground = document.querySelector('.hero__background') as HTMLElement;
    if (heroBackground) {
      const offset = this.scrollY * 0.5;
      heroBackground.style.transform = `translateY(${offset}px)`;
    }
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}