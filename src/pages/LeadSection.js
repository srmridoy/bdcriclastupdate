import React, { useState, useEffect } from 'react';
import axios from 'axios';
import he from 'he';
import Link from 'next/link';
import NewsCards from '../Components/NewsCards';

function LeadSection(props) {
  const [leadNews, setLeadNews] = useState(
    props.leadNews ? props.leadNews : []
  );
  const [loaded, setLoaded] = useState(props.loaded ? props.loaded : false);
  const [activeMenu, setActiveMenu] = useState('Headline');

  return (
    <>
      <div className="news-tabs">
        <nav>
          <div className="nav nav-tabs" id="nav-tab">
            <Link href="#">
              <a
                onClick={() => setActiveMenu('Headline')}
                className={
                  activeMenu === 'Headline'
                    ? 'nav-item nav-link active'
                    : 'nav-item nav-link'
                }
                id="nav-home-tab"
                data-toggle="tab"
              >
                Headline
              </a>
            </Link>
            <Link href="#">
              <a
                onClick={() => setActiveMenu('Latest News')}
                className={
                  activeMenu === 'Latest News'
                    ? 'nav-item nav-link active'
                    : 'nav-item nav-link'
                }
                id="nav-profile-tab"
                data-toggle="tab"
              >
                Latest News
              </a>
            </Link>
            <Link href="#">
              <a
                onClick={() => setActiveMenu('Popular News')}
                className={
                  activeMenu === 'Popular News'
                    ? 'nav-item nav-link active'
                    : 'nav-item nav-link'
                }
                id="nav-contact-tab"
                data-toggle="tab"
              >
                Popular News
              </a>
            </Link>
          </div>
        </nav>
        <div className="tab-content">
          <div className="tab-pane fade show active" id="nav-1">
            {activeMenu === 'Headline' ? (
              <NewsCards
                format="lead"
                id={leadNews.id}
                slug={leadNews.post_url}
                thumbnail={
                  loaded
                    ? leadNews.post_image
                    : '/img/post-thumbnail.svg'
                }
                headline={loaded ? he.decode(leadNews.title) : null}
                leadText={
                  loaded
                    ? leadNews.description
                    : null
                }
              />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default LeadSection;
