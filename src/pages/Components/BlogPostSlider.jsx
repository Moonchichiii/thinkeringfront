import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper';
import BlogCard from '../../components/Blogcard/BlogCard';
import styles from './BlogPostSlider.module.css';

const BlogPostSlider = ({ posts }) => {
  return (
    <div className={styles.blogPostSlider}>
      <h2>Featured Posts</h2>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
      >
        {posts.map(post => (
          <SwiperSlide key={post.id}>
            <BlogCard post={post} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BlogPostSlider;