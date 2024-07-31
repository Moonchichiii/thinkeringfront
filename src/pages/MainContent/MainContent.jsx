import React, { useEffect, useRef, lazy, Suspense } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Loading from '../../components/Loader/LoadSpinner';

const LandingPage = lazy(() => import('../Landing/LandingPage'));
const Home = lazy(() => import('../Home/Home'));
const About = lazy(() => import('../About/About'));
const Blog = lazy(() => import('../Blog/BlogPage'));

function MainContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const sectionRefs = {
    landing: useRef(null),
    home: useRef(null),
    about: useRef(null),
    blog: useRef(null),
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          navigate(`/${sectionId === 'landing' ? '' : sectionId}`, { replace: true });
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      Object.values(sectionRefs).forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [navigate]);

  useEffect(() => {
    const sectionId = location.pathname.slice(1) || 'landing';
    sectionRefs[sectionId]?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [location]);

  return (
    <div>
      <section id="landing" ref={sectionRefs.landing}>
        <Suspense fallback={<Loading />}>
          <LandingPage />
        </Suspense>
      </section>
      <section id="home" ref={sectionRefs.home}>
        <Suspense fallback={<Loading />}>
          <Home />
        </Suspense>
      </section>
      <section id="about" ref={sectionRefs.about}>
        <Suspense fallback={<Loading />}>
          <About />
        </Suspense>
      </section>
      <section id="blog" ref={sectionRefs.blog}>
        <Suspense fallback={<Loading />}>
          <Blog />
        </Suspense>
      </section>
    </div>
  );
}

export default MainContent;
