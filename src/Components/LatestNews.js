import React, { useState, useEffect } from 'react';
import NewsCards from '../Components/NewsCards';
import axios from 'axios';
import Link from 'next/link';

function LatestNews() {
  const [news, setNews] = useState([{}, {}, {}, {}, {}]);
  const [loaded, setLoaded] = useState(false);

  async function getNews() {
    axios
      .get('http://128.199.31.164/api/news-list', { headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'app-secret': 'BDCRICTIMEALLAPIRESPONSESECURITY' } })
      .then((res) => {
        setNews(res.data.data.news);
        setLoaded(true);
      })
      .catch((err) => console.log('Error in Live News' + err.message));
  }

  useEffect(() => {
    getNews();
  }, []);

  return (
    <>
      <div className="sidebar-widget trend-widget">
        <h4 className="heading-title">Latest News</h4>

        <nav>
          <ul>
            {news.map((news, index) => (
              <NewsCards
                key={index}
                format="small-side"
                headline={loaded ? news.title : null}
                thumbnail={
                  loaded
                    ? news.post_image
                    : null
                }
                id={news.id}
                slug={news.post_url}
              />
            ))}
          </ul>
        </nav>
        <Link href="/news">
          <a className="ld-more-btn"> Load More</a>
        </Link>
      </div>
    </>
  );
}

export default LatestNews;
