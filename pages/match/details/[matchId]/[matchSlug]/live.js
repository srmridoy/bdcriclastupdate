import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import Moment from 'react-moment';
import { Bar, Line, HorizontalBar, defaults } from 'react-chartjs-2';
import { isMobile } from 'react-device-detect';

import LatestNews from '../../../../../src/Components/LatestNews';
import Advertisement from '../../../../../src/Components/Advertisement';
import PlayerCard from '../../../../../src/Components/PlayerCard';
import ICCTeamRanking from '../../../../../src/Components/ICCTeamRanking';
import MostPopular from '../../../../../src/Components/MostPopular';
import Error from '../../../../../src/pages/Error';

function MatchDetails(props) {
  //IF THIS(error) PROPS AVAILABLE YOU CAN RENDER ERROR VIEW ANYWHERE
  //INSTEAD OF YOUR MAIN DATA
  if (props.error) {
    return <Error message={props.error} />;
  }
  const history = useRouter();
  const [match, setMatch] = useState(props.match);
  const [loaded, setLoaded] = useState(props.loaded);
  const [live, setLive] = useState(props.live);
  const players = loaded ? match.players : [];

  const findPlayer = (ID) => {
    return players.find((player) => {
      return player.pid === parseInt(ID);
    })
      ? players.find((player) => {
        return player.pid === parseInt(ID);
      }).title
      : null;
  };

  useEffect(() => {
    function getMatch() {
      axios
        .get(
          'https://rest.entitysport.com/v2/matches/' +
          history.query.matchId +
          '/scorecard'
        )
        .then((res) => {
          setMatch(res.data.response);
          getLive();
        });
    }
    function getLive() {
      axios
        .get(
          'https://rest.entitysport.com/v2/matches/' +
          history.query.matchId +
          '/live'
        )
        .then((res) => {
          setLive(res.data.response);
        });
    }
    getMatch();
  }, [history.query.matchId]);

  return (
    <>
      <Head>
        <title>{loaded ? match.title + ' - BDCricTime' : null}</title>
      </Head>
      <div className="news-content-area fx-padding r-cmntr">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-9">
              <div className="lins-up-inner-blk">
                <SkeletonTheme
                  color="rgba(255, 255, 255, .1)"
                  highlightColor="rgba(255, 255, 255, .05)"
                >
                  <div className="ln-top-main">
                    <div className="ln-top-des-blk">
                      <div className="row">
                        <div className="col-md-7">
                          <div className="lntop-left-des">
                            <h2>
                              <span className="shortName">
                                {loaded ? (
                                  match.short_title
                                ) : (
                                    <Skeleton width={100} />
                                  )}
                              </span>
                              <span className="fullName">
                                {loaded ? (
                                  match.title
                                ) : (
                                    <Skeleton width={150} />
                                  )}
                              </span>
                            </h2>
                            <div className="ln-des-info">
                              <span>
                                {loaded ? (
                                  match.subtitle
                                ) : (
                                    <Skeleton width={50} />
                                  )}
                              </span>
                              <span>
                                {loaded ? (
                                  <Moment format="D-MMM-YYYY">
                                    {match.date_start}
                                  </Moment>
                                ) : (
                                    <Skeleton width="100px" />
                                  )}
                              </span>
                              <span>
                                {loaded ? (
                                  <Moment format="h:mm A">
                                    {match.date_start}
                                  </Moment>
                                ) : (
                                    <Skeleton width="100px" />
                                  )}
                              </span>
                            </div>
                            <p>
                              {loaded ? (
                                match.venue.name
                              ) : (
                                  <Skeleton width={100} />
                                )}
                            </p>
                          </div>
                        </div>
                        <div className="col-md-5">
                          <div
                            style={{ textAlign: 'right', marginTop: '15px' }}
                          >
                            {isMobile ? (
                              <Advertisement
                                size={32050}
                                imgstyle={{ width: '100%' }}
                              />
                            ) : (
                                <Advertisement
                                  size={320100}
                                  style={{ marginBottom: '15px' }}
                                />
                              )}
                          </div>
                          {loaded && match.status === 3 ? (
                            <div className="fx-inner-top-info">
                              <span>Live</span>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </SkeletonTheme>
                {loaded ? (
                  <div
                    className="line-ups-inner-all-info"
                    style={{
                      backgroundImage: 'url("/img/l-info-img.jpg")',
                    }}
                  >
                    <div className="row">
                      <div className="col-md-7 col-lg-7 col-xl-7">
                        <div className="line-up-inner-left-blk">
                          <div className="line-up-lft">
                            <div className="line-up-left-blk-single-row">
                              <img
                                src={match.teama.thumb_url}
                                alt={match.teama.name}
                              />
                              <h3>
                                {match.teama.name}
                                {/*<img src="/assets/img/ball-golden.svg" alt=""/> <img src="/assets/img/bat-mian.svg" alt=""/>*/}
                              </h3>
                            </div>
                            <div className="line-up-rt-blk">
                              <h3>
                                {match.teama.scores ? (
                                  match.teama.scores +
                                  ' (' +
                                  match.teama.overs +
                                  ')'
                                ) : (
                                    <small style={{ opacity: '.5' }}>
                                      To be played
                                    </small>
                                  )}
                              </h3>
                            </div>
                          </div>
                          <div className="line-up-lft">
                            <div className="line-up-left-blk-single-row">
                              <img
                                src={match.teamb.thumb_url}
                                alt={match.teamb.name}
                              />
                              <h3>
                                {match.teamb.name}
                                {/*<img src="/assets/img/ball-golden.svg" alt=""/> <img src="/assets/img/ball.svg" alt=""/>*/}
                              </h3>
                            </div>
                            <div className="line-up-rt-blk">
                              <h3>
                                {match.teamb.scores ? (
                                  match.teamb.scores +
                                  ' (' +
                                  match.teamb.overs +
                                  ')'
                                ) : (
                                    <small style={{ opacity: '.5' }}>
                                      To be played
                                    </small>
                                  )}
                              </h3>
                            </div>
                          </div>
                          <p>{match.status_note}</p>
                        </div>
                      </div>
                      <div className="col-md-5 col-lg-5 col-xl-5">
                        <div className="line-info-right-table">
                          <table className="table">
                            <tbody>
                              {loaded ? (
                                match.status === 2 ? (
                                  <>
                                    <tr>
                                      <td>Man of the match</td>
                                      <td className="text-right">
                                        {match.man_of_the_match.name}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Win Margin</td>
                                      <td className="text-right">
                                        {match.win_margin}
                                      </td>
                                    </tr>
                                  </>
                                ) : null
                              ) : null}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}

                <div className="menu-tab-wrapper ">
                  <div className="row">
                    <div className="col-12">
                      <div className="tabContainer">
                        <nav>
                          <div
                            className="nav nav-link-wrap bdr-btm-three"
                            id="nav-tab"
                            role="tablist"
                          >
                            <Link href={"/match/details/" + history.query.matchId + "/" + history.query.matchSlug + "/live"}>
                              <a className="nav-item nav-link active">
                                Live
                              </a>
                            </Link>
                            {loaded && match.status === 1 ? null : (
                              <>
                                <Link href={"/match/details/" + history.query.matchId + "/" + history.query.matchSlug + "/scorecard"}>
                                  <a className="nav-item nav-link">
                                    Scorecard
                                  </a>
                                </Link>
                                <Link href={"/match/details/" + history.query.matchId + "/" + history.query.matchSlug + "/commentary"}>
                                  <a className="nav-item nav-link">
                                    Commentary
                                  </a>
                                </Link>
                                <Link href={"/match/details/" + history.query.matchId + "/" + history.query.matchSlug + "/statistics"}>
                                  <a className="nav-item nav-link">
                                    Statistics
                                  </a>
                                </Link>
                              </>
                            )}
                            <Link href={"/match/details/" + history.query.matchId + "/" + history.query.matchSlug + "/line-ups"}>
                              <a className="nav-item nav-link">
                                Line-Ups
                              </a>
                            </Link>
                            <Link href={"/match/details/" + history.query.matchId + "/" + history.query.matchSlug + "/info"}>
                              <a className="nav-item nav-link">
                                Info
                              </a>
                            </Link>
                          </div>
                        </nav>
                        <div className="tab-content" id="nav-tabContent">
                          <div
                            className="tab-pane fade active show"
                            id="tbOne"
                            role="tabpanel"
                            aria-labelledby="tbOne-tab"
                          >
                            <div className="tb-content-wrap">
                              <Link href="#">
                                <a className="bdr-btm-three btm-arrow-shape link-full">
                                  {live.team_batting} - In Play
                                  </a>
                              </Link>
                              <div className="strike-table-wrap">
                                <table className="table strike-table">
                                  <thead>
                                    <tr>
                                      <th>Batsmen</th>
                                      <th className="text-center">R</th>
                                      <th className="text-center">B</th>
                                      <th className="text-center">4s</th>
                                      <th className="text-center">6s</th>
                                      <th className="text-center">SR</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {live.batsmen.map((item, index) => (
                                      <tr key={index}>
                                        <td>
                                          <div className="player-name-img">
                                            <img
                                              src="/img/player-img.svg"
                                              alt=""
                                            />
                                            <span>{item.name}</span>
                                            {/* <span className="action-indicator">
                                                                                        <img
                                                                                            src="/assets/img/bat.svg"
                                                                                            alt=""
                                                                                        />
                                                                                    </span> */}
                                          </div>
                                        </td>
                                        <td className="text-center">
                                          <strong>{item.runs}</strong>
                                        </td>
                                        <td className="text-center">
                                          {item.balls_faced}
                                        </td>
                                        <td className="text-center">
                                          {item.fours}
                                        </td>
                                        <td className="text-center">
                                          {item.sixes}
                                        </td>
                                        <td className="text-center">
                                          {item.strike_rate}
                                        </td>
                                      </tr>
                                    ))}
                                    <tr>
                                      <td>
                                        <strong>Current Partnership</strong>
                                      </td>
                                      <td colSpan="5">
                                        <strong>
                                          {
                                            live.live_inning
                                              .current_partnership.runs
                                          }
                                        </strong>{' '}
                                          (
                                          {
                                          live.live_inning.current_partnership
                                            .balls
                                        }
                                          )
                                        </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <div className="strike-table-wrap">
                                <table className="table strike-table">
                                  <thead>
                                    <tr>
                                      <th>Bowler</th>
                                      <th className="text-center">O</th>
                                      <th className="text-center">M</th>
                                      <th className="text-center">R</th>
                                      <th className="text-center">W</th>
                                      <th className="text-center">ER</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {live.bowlers.map((item, index) => (
                                      <tr key={index}>
                                        <td>asdfasdsdfasddf
                                            <div className="player-name-img">
                                            <img
                                              src="/img/player-img.svg"
                                              alt=""
                                            />
                                            <span>{item.name}</span>
                                          </div>
                                        </td>
                                        <td className="text-center">
                                          {item.overs}
                                        </td>
                                        <td className="text-center">
                                          {item.maidens}
                                        </td>
                                        <td className="text-center">
                                          {item.runs_conceded}
                                        </td>
                                        <td className="text-center">
                                          <strong>{item.wickets}</strong>
                                        </td>
                                        <td className="text-center">
                                          {item.econ}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>

                              <div className="similar-blk mb-20">
                                <h3 className="tertiary-title">Recent</h3>
                                <div className="over-wrap">
                                  <div className="single-over">
                                    <span className="ball-of-over">1</span>
                                    <span className="ball-of-over">2</span>
                                    <span className="ball-of-over">0</span>
                                    <span className="ball-of-over green-bg">
                                      4
                                      </span>
                                    <span className="ball-of-over green-bg">
                                      6
                                      </span>
                                    <span className="ball-of-over red-bg">
                                      W
                                      </span>
                                  </div>
                                  <div className="single-over">
                                    <span className="ball-of-over">1</span>
                                    <span className="ball-of-over">2</span>
                                    <span className="ball-of-over">0</span>
                                    <span className="ball-of-over green-bg">
                                      4
                                      </span>
                                    <span className="ball-of-over green-bg">
                                      6
                                      </span>
                                    <span className="ball-of-over red-bg">
                                      W
                                      </span>
                                  </div>
                                  <div className="single-over">
                                    <span className="ball-of-over">1</span>
                                    <span className="ball-of-over">2</span>
                                    <span className="ball-of-over">0</span>
                                    <span className="ball-of-over green-bg">
                                      4
                                      </span>
                                    <span className="ball-of-over green-bg">
                                      6
                                      </span>
                                    <span className="ball-of-over red-bg">
                                      W
                                      </span>
                                  </div>
                                  <div className="single-over">
                                    <span className="ball-of-over">1</span>
                                    <span className="ball-of-over">2</span>
                                    <span className="ball-of-over">0</span>
                                    <span className="ball-of-over green-bg">
                                      4
                                      </span>
                                    <span className="ball-of-over green-bg">
                                      6
                                      </span>
                                    <span className="ball-of-over red-bg">
                                      W
                                      </span>
                                  </div>
                                </div>
                              </div>

                              <div className="similar-blk mb-20">
                                <h3 className="tertiary-title mb-10">
                                  Live Commentary
                                  </h3>
                                <div className="commentry-common-wrap">
                                  {live.commentaries
                                    .reverse()
                                    .map((item, index) =>
                                      item.event === 'overend' ? (
                                        <div
                                          key={index}
                                          className="hybried-title mb-10"
                                        >
                                          <div className="h-left-roudn">
                                            <span className="end-of-over">
                                              End of
                                                <br />
                                                over
                                              </span>
                                            <span className="round-ou">
                                              <span className="round-in">
                                                {item.over}
                                              </span>
                                            </span>
                                          </div>

                                          <div className="h-right-content">
                                            <div className="top-bar">
                                              <p>
                                                {match.innings[0].short_name.replace(
                                                  ' Inning',
                                                  ''
                                                )}{' '}
                                                  : {item.score}
                                              </p>
                                              <ul className="h-current-statistics">
                                                <li>{item.commentary}</li>
                                              </ul>
                                            </div>
                                            <div className="bottom-bar">
                                              <div className="btm-bar-left-p">
                                                {item.bats.map(
                                                  (batsman, index) => (
                                                    <p key={index}>
                                                      {findPlayer(
                                                        batsman.batsman_id
                                                      )}{' '}
                                                        : {batsman.runs} (
                                                      {batsman.balls_faced})
                                                    </p>
                                                  )
                                                )}
                                              </div>
                                              <div className="btm-bar-right-p">
                                                <p>
                                                  {findPlayer(
                                                    item.bowls[0].bowler_id
                                                  )}{' '}
                                                    : {item.bowls[0].overs}-
                                                    {item.bowls[0].wickets}-
                                                    {
                                                    item.bowls[0]
                                                      .runs_conceded
                                                  }
                                                    -{item.bowls[0].maidens}
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      ) : (
                                          <div
                                            key={index}
                                            className={
                                              item.event === 'wicket'
                                                ? 'single-comentry light-red-bgg'
                                                : item.score === 4
                                                  ? 'single-comentry light-blue-bgg'
                                                  : item.score === 6
                                                    ? 'single-comentry light-green-bgg'
                                                    : 'single-comentry gray-bgg'
                                            }
                                          >
                                            <div className="left-trans-over">
                                              {item.over + '.' + item.ball}
                                              <span
                                                className={
                                                  item.event === 'wicket'
                                                    ? 'over-oval red-bg'
                                                    : item.score === 4
                                                      ? 'over-oval blue-bg'
                                                      : item.score === 6
                                                        ? 'over-oval green-bg'
                                                        : 'over-oval'
                                                }
                                              >
                                                {item.score}
                                              </span>
                                            </div>
                                            <p>{item.commentary}</p>
                                          </div>
                                        )
                                    )}
                                </div>
                              </div>

                              <div className="middle-btn">
                                <Link href="#">
                                  <a className="round-btn">
                                    Watch full commentary
                                    </a>
                                </Link>
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="sidebar-widget-wrapper">
                <Advertisement size={320100} style={{ marginBottom: '15px' }} />
                <LatestNews />
                <MostPopular />
                <ICCTeamRanking />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const param = {
      params: { token: '437214169d9be2a73e91d22f76f68b52' },
    };
    const match = await axios.get(
      'https://rest.entitysport.com/v2/matches/' +
      params.matchId +
      '/scorecard',
      param
    );

    const live = await axios.get(
      'https://rest.entitysport.com/v2/matches/' + params.matchId + '/live',
      param
    );

    return {
      props: {
        match: match.data.response,
        live: live.data.response,
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
export default MatchDetails;
