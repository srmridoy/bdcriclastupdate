import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';
import he from 'he';

import MostPopular from '../src/Components/MostPopular';
import LatestNews from '../src/Components/LatestNews';
import NewsCards from '../src/Components/NewsCards';
import Error from '../src/pages/Error';

function News(props) {
  if (props.error) {
    return <Error message={props.error} />;
  }
  const news = props.news;
  const loaded = props.loaded;

  return (
    <>
      <Head>
        <title>News - BDCricTime</title>
      </Head>
      <div className="news-content-area fx-padding">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-9">
              {props.menus[0] ? (
                <div className="page-inner-content mb-10">
                  <div className="team-menu">
                    <ul>
                      <li>
                        <Link href="/news">
                          <a className="active-menu">All News</a>
                        </Link>
                      </li>
                      {props.menus.map((menu, index) => (
                        <li key={index}>
                          <Link href={"/news/"+menu.id+"/"+menu.slug}>
                              {menu.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : null}
              <div className="news-main-content">
                <div className="news-widget">
                  {news[0] ? (
                    <>
                      <div className="row">
                        {news.map((news, index) =>
                          index < 3 ? (
                            <div key={index} className="col-lg-4 col-md-6">
                              <NewsCards
                                format="boxed-down"
                                headline={loaded ? news.title : null}
                                thumbnail={
                                  loaded
                                    ? news.post_image
                                    : null
                                }
                                leadText={
                                  loaded
                                    ? news.description
                                    : null
                                }
                                id={news.id}
                                slug={news.post_url}
                              />
                            </div>
                          ) : null
                        )}
                      </div>
                      {news.map((news, index) =>
                        index > 2 ? (
                          <NewsCards
                            key={index}
                            format="boxed-side"
                            headline={loaded ? news.title : null}
                            thumbnail={
                              loaded
                                ? news.post_image
                                : null
                            }
                            leadText={
                              loaded
                                ? news.description
                                : null
                            }
                            id={news.id}
                            slug={news.post_url}
                          />
                        ) : null
                      )}
                    </>
                  ) : (
                    <div
                      style={{
                        fontWeight: 'bold',
                        fontSize: '30px',
                        color: '#cccccc',
                        textAlign: 'center',
                        padding: '100px',
                      }}
                    >
                      NO NEWS IN THIS CATEGORY
                    </div>
                  )}
                  {/* <div className="seemore-btn-inner">
                            <Link href="" ><a className="ld-more-btn">Load More</a></Link>
                            </div> */}
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="sidebar-widget-wrapper">
                <LatestNews />
                <MostPopular />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export async function getServerSideProps() {
  try {
    const res = await axios.get('http://128.199.31.164/api/category-list', { headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'app-secret': 'BDCRICTIMEALLAPIRESPONSESECURITY' } });
    const news = await axios.get('http://128.199.31.164/api/news-list', { headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'app-secret': 'BDCRICTIMEALLAPIRESPONSESECURITY' } });

    return {
      props: {
        menus: res.data.data,
        news: news.data.data.news,
        loaded: true,
      },
    };
  } catch (err) {
    return {
      props: {
        error: err.message,
      },
    };
  }
}
export default News;
