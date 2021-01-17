import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import dateFormat from 'dateformat';
import SlickNext from "./SlickNext";
import SlickPrev from "./SlickPrev";


import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function LiveScoreSlider(props) {
  const [liveMatches, setLiveMatches] = useState(
    props.liveMatches ? props.liveMatches : []
  );
  const [loaded, setLoaded] = useState(props.loaded ? props.loaded : false);
  useEffect(() => {
    console.log('This will run every second!');
    const date = new Date();
    const tomorrow = dateFormat(date.setDate(date.getDate() + 1), 'yyyy-mm-dd');
    const yesterday = dateFormat(
      date.setDate(date.getDate() - 1),
      'yyyy-mm-dd'
    );
    function getLiveMatches() {
      axios
        .get(
          'https://rest.entitysport.com/v2/matches/?per_page=100&date=' +
            yesterday +
            '_' +
            tomorrow,
          {
            params: { token: '437214169d9be2a73e91d22f76f68b52' },
          }
        )
        .then((res) => {
          var filtered = res.data.response.items.filter(function (item) {
            return (
              item.competition.country === 'int' ||
              item.competition.country === 'in' ||
              item.competition.country === 'au' ||
              item.competition.country === 'pk'
            );
          });
          var final = filtered.length > 3 ? filtered : res.data.response.items;
          setLiveMatches(final.reverse());
          setLoaded(true);
          $('.live-match-slider')
            .not('.slick-initialized')
            .slick({
              dots: false,
              centerMode: true,
              arrows: true,
              centerPadding: '50px',
              initialSlide: 1,
              slidesToShow: 5,
              prevArrow: <SlickPrev />,
              nextArrow: <SlickNext />,
              responsive: [
                {
                  breakpoint: 1600,
                  settings: {
                    centerMode: true,
                    centerPadding: '50px',
                    slidesToShow: 5,
                  },
                },
                {
                  breakpoint: 1400,
                  settings: {
                    centerMode: true,
                    centerPadding: '50px',
                    slidesToShow: 3,
                  },
                },
                {
                  breakpoint: 992,
                  settings: {
                    centerMode: true,
                    centerPadding: '50px',
                    slidesToShow: 2,
                  },
                },
                {
                  breakpoint: 768,
                  settings: {
                    centerMode: true,
                    centerPadding: '50px',
                    slidesToShow: 1,
                  },
                },
              ],
            });
        })
        .catch((err) => console.log('Error in Live Score' + err.message));
    }
    getLiveMatches();

    const interval = setInterval(() => {
      getLiveMatches();
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  let settings = {
    dots: false,
    centerMode: true,
    arrows: true,
    infinite: true,
    centerPadding: '50px',
    slidesToShow: 5,
    className: "live-match-slider",
    prevArrow: <SlickPrev/>,
    nextArrow: <SlickNext />,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          centerMode: true,
          centerPadding: '50px',
          slidesToShow: 5
        }
      },
      {
        breakpoint: 1400,
        settings: {
          centerMode: true,
          centerPadding: '50px',
          slidesToShow: 3
        }
      },
      {
        breakpoint: 992,
        settings: {
          centerMode: true,
          centerPadding: '50px',
          slidesToShow: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          centerMode: true,
          centerPadding: '50px',
          slidesToShow: 1
        }
      }
    ]
  };

  return (
    <>
      {loaded ? (
          <div className="live-match-area">
            <Slider {...settings}>
              {liveMatches.map((item, index) => (
                  <Link
                      key={index + index}
                      href={
                        item.status === 1 ? '/match/details/' + item.match_id + '/' + item.title.toLowerCase().split(' ').join('-') + '/line-ups' : item.status === 3 ? '/match/details/' + item.match_id + '/' + item.title.toLowerCase().split(' ').join('-') + '/live' : '/match/details/' + item.match_id + '/' + item.title.toLowerCase().split(' ').join('-') + '/scorecard'
                      }
                      className="item"
                  >
                    <a>
                      <div>
                        <div className="live-match-item">
                          <div className="title">
                            <h5>{item.competition.title}</h5>
                          </div>
                          <div className="compare-country">
                          <span className="country-logo">
                            <img
                                src={item.teama.logo_url}
                                alt={item.teama.name}
                            />
                          </span>
                            <span className="country-vs">
                            <p>VS</p>
                          </span>
                            <span className="country-logo">
                            <img
                                src={item.teamb.logo_url}
                                alt={item.teamb.name}
                            />
                          </span>
                          </div>
                          <div className="compare-run">
                            <div className="run">
                              <h4>
                                {item.teama.short_name}{' '}
                                {item.teama.scores ? item.teama.scores : '0/0'}{' '}
                                <span>
                                {item.teamb.overs
                                    ? item.teama.overs + ' OVERS'
                                    : '0 OVER'}
                              </span>
                              </h4>
                            </div>
                            <div className="div">
                              {' '}
                              <img
                                  src="/assets/img/compare-div.svg"
                                  alt="svg"
                              />{' '}
                            </div>
                            <div className="run">
                              <h4>
                                {item.teamb.short_name}{' '}
                                {item.teamb.scores ? item.teama.scores : '0/0'}{' '}
                                <span>
                                {item.teamb.overs
                                    ? item.teamb.overs + ' OVERS'
                                    : '0 OVER'}
                              </span>{' '}
                              </h4>
                            </div>
                          </div>
                          <div className="compare-match">
                            <p>
                              {item.status_note
                                  ? item.status_note
                                  : 'To be played'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </a>
                  </Link>
              ))}

            </Slider>
          </div>

      ) : null}
    </>
  );
}

export default LiveScoreSlider;
