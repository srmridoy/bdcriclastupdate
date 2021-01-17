import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import axios from 'axios';

function MostPopular() {

  const [newstoday, setnewstoday] = useState([{}, {}]);
  const [newsweek, setnewsweek] = useState([{}, {}]);
  const [newsmonth, setnewsmonth] = useState([{}, {}]);
  const [newstodayloaded, setnewstodayLoaded] = useState(false);
  const [newsweekloaded, setnewsweekLoaded] = useState(false);
  const [newsmonthloaded, setnewsmonthLoaded] = useState(false);

  async function getNewstoday() {
    axios
      .get('http://128.199.31.164/api/popular_news?days=1&limit=5', { headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'app-secret': 'BDCRICTIMEALLAPIRESPONSESECURITY' } })
      .then((res) => {
        setnewstoday(res.data.data);
        setnewstodayLoaded(true);
      })
      .catch((err) => console.log('Error in most popular' + err.message));
  }
  
  async function getNewsweek() {
    axios
      .get('http://128.199.31.164/api/popular_news?days=7&limit=5', { headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'app-secret': 'BDCRICTIMEALLAPIRESPONSESECURITY' } })
      .then((res) => {
        setnewsweek(res.data.data);
        setnewsweekLoaded(true);
      })
      .catch((err) => console.log('Error in most popular' + err.message));
  }
  
  async function getNewsmonth() {
    axios
      .get('http://128.199.31.164/api/popular_news?days=30&limit=5', { headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'app-secret': 'BDCRICTIMEALLAPIRESPONSESECURITY' } })
      .then((res) => {
        setnewsmonth(res.data.data);
        setnewsmonthLoaded(true);
      })
      .catch((err) => console.log('Error in most popular' + err.message));
  }

  useEffect(() => {
    getNewstoday();
    getNewsweek();
    getNewsmonth();
  }, []);


  return (
    <>
      <div className="sidebar-widget popular-widget">
        <h4 className="heading-title">Most Popular</h4>

        <div>
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <a
              className="nav-item nav-link active"
              data-toggle="tab"
              href="#nav-7"
            >
              Today
            </a>
            <a className="nav-item nav-link" data-toggle="tab" href="#nav-8">
              Last 7 Days
            </a>
            <a className="nav-item nav-link" data-toggle="tab" href="#nav-9">
              Last 30 Days
            </a>
          </div>
        </div>
        <div className="tab-content" id="nav-tabContent">
          <div className="tab-pane fade show active" id="nav-7">
            <nav>
              <ul>
                {newstodayloaded ? newstoday.map((item, index) =>
                  <li>
                    <span>{++index}</span>
                    <Link href={"/news/details/"+item.post_url}>
                      <a>
                        <p>{item.title}</p>
                      </a>
                    </Link>
                  </li>
                ) : null}
              </ul>
            </nav>
          </div>
          <div className="tab-pane fade" id="nav-8">
            <nav>
              <ul>
                {newsweekloaded ? newsweek.map((item, index) =>
                  <li>
                    <span>{++index}</span>
                    <Link href={"/news/details/"+item.post_url}>
                      <a>
                        <p>{item.title}</p>
                      </a>
                    </Link>
                  </li>
                ) : null}
              </ul>
            </nav>
          </div>
          <div className="tab-pane fade" id="nav-9">
            <nav>
              <ul>
                {newsmonthloaded ? newsmonth.map((item, index) =>
                  <li>
                    <span>{++index}</span>
                    <Link href={"/news/details/"+item.post_url}>
                      <a>
                        <p>{item.title}</p>
                      </a>
                    </Link>
                  </li>
                ) : null}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default MostPopular;
