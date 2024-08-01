import React, { useEffect, useRef, lazy, Suspense } from 'react';
import { useNavigate, useLocation, useOutletContext } from 'react-router-dom';
import Loading from '../../components/Loader/LoadSpinner';

const LandingPage = lazy(() => import('../Landing/Landing'));
const Home = lazy(() => import('../Home/Home'));
const About = lazy(() => import('../About/About'));
const Blog = lazy(() => import('../Blog/Blog'));

function MainContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setShowHeader } = useOutletContext() || { setShowHeader: () => {} };
  const sectionRefs = {
    landing: useRef(null),
    home: useRef(null),
    about: useRef(null),
    blog: useRef(null),
  };

  useEffect(() => {
    setShowHeader(false);
  }, [setShowHeader]);

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
