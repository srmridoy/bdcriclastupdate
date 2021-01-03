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

  defaults.global.defaultFontFamily = "'Montserrat', sans-serif";

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
                            {loaded && match.status === 3 ? (
                              <Link href={"/match/details/" + history.query.matchId + "/" + history.query.matchSlug + "/live"}>
                                <a className="nav-item nav-link">
                                  Live
                                </a>
                              </Link>
                            ) : null}
                            {loaded && match.status === 1 ? null : (
                              <>
                                <Link href={"/match/details/" + history.query.matchId + "/" + history.query.matchSlug + "/scorecard"}>
                                  <a className="nav-item nav-link active">
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
                            className="tab-pane fade show active"
                            id="tbTwo"
                            role="tabpanel"
                            aria-labelledby="tbTwo-tab"
                          >
                            <div className="tb-content-wrap">
                              <div className="tabContainer-inner-1">
                                <nav>
                                  <div
                                    className="nav nav-link-wrap inner-1"
                                    id="nav-tab"
                                    role="tablist"
                                  >
                                    {loaded
                                      ? match.innings.map((item, index) => (
                                        <a
                                          key={index}
                                          className={
                                            index < 1
                                              ? 'nav-item nav-link active'
                                              : 'nav-item nav-link'
                                          }
                                          id={
                                            'tbOne-line-' + index + '-tab'
                                          }
                                          data-toggle="tab"
                                          href={'#tbOne-card-' + index}
                                          role="tab"
                                          aria-controls="nav-home"
                                          aria-selected="true"
                                        >
                                          <span className="fullName">
                                            {item.name}
                                          </span>
                                          <span className="shortName">
                                            {item.short_name}
                                          </span>

                                          <span className="extra-border"></span>
                                        </a>
                                      ))
                                      : null}
                                  </div>
                                </nav>
                                <div
                                  className="tab-content"
                                  id="nav-tabContent"
                                >
                                  {loaded
                                    ? match.innings.map((item, index) => (
                                      <div
                                        key={index}
                                        className={
                                          index < 1
                                            ? 'tab-pane fade show active'
                                            : 'tab-pane fade show'
                                        }
                                        id={'tbOne-card-' + index}
                                        role="tabpanel"
                                        aria-labelledby={
                                          'tbOne-inner-' + index + '-tab'
                                        }
                                      >
                                        <div className="tb-content-wrap inner-1">
                                          <div className="strike-table-wrap under-scorecard">
                                            <table className="table strike-table">
                                              <thead>
                                                <tr>
                                                  <th>Batsmen</th>
                                                  <th className="d-n"></th>
                                                  <th className="text-center">
                                                    R
                                                        </th>
                                                  <th className="text-center">
                                                    B
                                                        </th>
                                                  <th className="text-center">
                                                    4s
                                                        </th>
                                                  <th className="text-center">
                                                    6s
                                                        </th>
                                                  <th className="text-center">
                                                    SR
                                                        </th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                {item.batsmen.map(
                                                  (batsman, index) => (
                                                    <tr
                                                      key={index}
                                                      className="b-btm-none"
                                                    >
                                                      <td>
                                                        <div className="player-name-img">
                                                          <Link
                                                            href={
                                                              '/player/profile/' +
                                                              batsman.batsman_id +
                                                              '/' +
                                                              batsman.name
                                                                .toLowerCase()
                                                                .replace(
                                                                  ' ',
                                                                  '-'
                                                                )
                                                            }
                                                          >
                                                            <a>
                                                              <img
                                                                src="/img/player-img.svg"
                                                                alt=""
                                                              />
                                                              <span>
                                                                {
                                                                  batsman.name
                                                                }
                                                              </span>
                                                            </a>
                                                          </Link>
                                                        </div>
                                                      </td>

                                                      <td className="d-n">
                                                        {batsman.how_out}
                                                      </td>
                                                      <td className="text-center">
                                                        <strong>
                                                          {batsman.runs}
                                                        </strong>
                                                      </td>
                                                      <td className="text-center">
                                                        {
                                                          batsman.balls_faced
                                                        }
                                                      </td>
                                                      <td className="text-center">
                                                        {batsman.fours}
                                                      </td>
                                                      <td className="text-center">
                                                        {batsman.sixes}
                                                      </td>
                                                      <td className="text-center">
                                                        {
                                                          batsman.strike_rate
                                                        }
                                                      </td>
                                                    </tr>
                                                  )
                                                )}
                                                <tr className="b-tp-none">
                                                  <td colSpan="7">
                                                    <p className="d-block d-sm-none">
                                                      c Fielder b Bowler
                                                          </p>
                                                  </td>
                                                </tr>

                                                <tr>
                                                  <td>
                                                    <strong>
                                                      Extras
                                                          </strong>
                                                  </td>
                                                  <td colSpan="2">
                                                    (NB{' '}
                                                    {
                                                      item.extra_runs
                                                        .noballs
                                                    }
                                                          , W{' '}
                                                    {
                                                      item.extra_runs
                                                        .wides
                                                    }
                                                          , B{' '}
                                                    {item.extra_runs.byes}
                                                          , LB{' '}
                                                    {
                                                      item.extra_runs
                                                        .legbyes
                                                    }
                                                          )
                                                        </td>
                                                  <td colSpan="5">
                                                    <strong>
                                                      {
                                                        item.extra_runs
                                                          .total
                                                      }
                                                    </strong>
                                                  </td>
                                                </tr>
                                                <tr className="total-table-count">
                                                  <td colSpan="2">
                                                    <strong>Total</strong>
                                                  </td>
                                                  <td colSpan="5">
                                                    <strong>
                                                      {item.scores}
                                                    </strong>{' '}
                                                          (
                                                          {item.equations.overs}{' '}
                                                          Overs, RR:{' '}
                                                    {
                                                      item.equations
                                                        .runrate
                                                    }
                                                          )
                                                        </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </div>

                                          <div className="similar-blk mb-20">
                                            <div
                                              style={{
                                                textAlign: 'center',
                                              }}
                                            >
                                              <Advertisement
                                                size={72890}
                                                style={{
                                                  marginBottom: '15px',
                                                }}
                                              />
                                            </div>

                                            <h3 className="tertiary-title">
                                              Fall of Wickets
                                                  </h3>
                                            <div className="fall-wicket-wrap">
                                              <div className="fall-wicket-wrap-inner">
                                                {item.fows.map(
                                                  (fow, index) => (
                                                    <div
                                                      key={index}
                                                      className="fall-item"
                                                    >
                                                      <span className="fall-run">
                                                        {fow.number}-
                                                              {
                                                          fow.score_at_dismissal
                                                        }
                                                      </span>
                                                      <p>
                                                        {fow.name.substr(
                                                          0,
                                                          8
                                                        )}{' '}
                                                        <br />
                                                              at{' '}
                                                        {
                                                          fow.overs_at_dismissal
                                                        }{' '}
                                                              over
                                                            </p>
                                                    </div>
                                                  )
                                                )}
                                              </div>
                                            </div>
                                          </div>

                                          <div className="strike-table-wrap under-scorecard">
                                            <table className="table strike-table table-responsive-sm">
                                              <thead>
                                                <tr>
                                                  <th>Bowler</th>
                                                  <th className="text-center">
                                                    O
                                                        </th>
                                                  <th className="text-center">
                                                    M
                                                        </th>
                                                  <th className="text-center">
                                                    R
                                                        </th>
                                                  <th className="text-center">
                                                    W
                                                        </th>
                                                  <th className="text-center">
                                                    WD
                                                        </th>
                                                  <th className="text-center">
                                                    NB
                                                        </th>
                                                  <th className="text-center">
                                                    ER
                                                        </th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                {item.bowlers.map(
                                                  (bowler, index) => (
                                                    <tr key={index}>
                                                      <td>
                                                        <div className="player-name-img">
                                                          <Link href="#">
                                                            <a>
                                                              <img
                                                                src="/img/player-img.svg"
                                                                alt={
                                                                  bowler.name
                                                                }
                                                              />
                                                              <span>
                                                                {
                                                                  bowler.name
                                                                }
                                                              </span>
                                                            </a>
                                                          </Link>
                                                        </div>
                                                      </td>
                                                      <td className="text-center">
                                                        {bowler.overs}
                                                      </td>
                                                      <td className="text-center">
                                                        {bowler.maidens}
                                                      </td>
                                                      <td className="text-center">
                                                        <strong>
                                                          {
                                                            bowler.runs_conceded
                                                          }
                                                        </strong>
                                                      </td>
                                                      <td className="text-center">
                                                        {bowler.wickets}
                                                      </td>
                                                      <td className="text-center">
                                                        {bowler.wides}
                                                      </td>
                                                      <td className="text-center">
                                                        {bowler.noballs}
                                                      </td>
                                                      <td className="text-center">
                                                        {bowler.econ}
                                                      </td>
                                                    </tr>
                                                  )
                                                )}
                                              </tbody>
                                            </table>
                                          </div>
                                          {item.current_partnership
                                            .batsmen ? (
                                              <div className="similar-blk mb-20">
                                                <h3 className="tertiary-title">
                                                  Partnerships
                                                    </h3>
                                                <div className="partnarship-f-wrap">
                                                  <div className="partnarship-single">
                                                    <div className="pt-left d-n">
                                                      <div className="player-name-img">
                                                        <img
                                                          src="/img/player-img.svg"
                                                          alt=""
                                                        />
                                                        <span>
                                                          {
                                                            item
                                                              .current_partnership
                                                              .batsmen[0]
                                                              .name
                                                          }
                                                          <span className="all-bol-and-run">
                                                            {
                                                              item
                                                                .current_partnership
                                                                .batsmen[0]
                                                                .runs
                                                            }
                                                            <span>
                                                              (
                                                                  {
                                                                item
                                                                  .current_partnership
                                                                  .batsmen[0]
                                                                  .balls
                                                              }
                                                                  )
                                                                </span>
                                                          </span>
                                                        </span>
                                                      </div>
                                                    </div>
                                                    <div className="pt-middle">
                                                      <div className="player-dets-mb-wrp">
                                                        <div className="player-dets-mb-wrp-inner">
                                                          <div className="player-dets-mb">
                                                            <img
                                                              src="/img/player-img.svg"
                                                              alt=""
                                                            />
                                                            <span>
                                                              Bowler Name{' '}
                                                              <span className="all-bol-and-run">
                                                                100{' '}
                                                                <span>
                                                                  (90)
                                                                    </span>
                                                              </span>
                                                            </span>
                                                          </div>
                                                          <div className="player-dets-mb">
                                                            <img
                                                              src="/img/player-img.svg"
                                                              alt=""
                                                            />
                                                            <span>
                                                              Bowler Name{' '}
                                                              <span className="all-bol-and-run">
                                                                100{' '}
                                                                <span>
                                                                  (90)
                                                                    </span>
                                                              </span>
                                                            </span>
                                                          </div>
                                                        </div>
                                                      </div>
                                                      <span className="fall-run style-2">
                                                        {
                                                          item
                                                            .current_partnership
                                                            .runs
                                                        }
                                                            (
                                                            {
                                                          item
                                                            .current_partnership
                                                            .balls
                                                        }
                                                            )
                                                          </span>
                                                    </div>
                                                    <div className="pt-left right-reverse  d-n">
                                                      <div className="player-name-img">
                                                        <img
                                                          src="/img/player-img.svg"
                                                          alt=""
                                                        />
                                                        <span>
                                                          {
                                                            item
                                                              .current_partnership
                                                              .batsmen[1]
                                                              .name
                                                          }
                                                          <span className="all-bol-and-run">
                                                            {
                                                              item
                                                                .current_partnership
                                                                .batsmen[1]
                                                                .runs
                                                            }
                                                            <span>
                                                              (
                                                                  {
                                                                item
                                                                  .current_partnership
                                                                  .batsmen[1]
                                                                  .balls
                                                              }
                                                                  )
                                                                </span>
                                                          </span>
                                                        </span>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            ) : null}
                                        </div>
                                      </div>
                                    ))
                                    : null}
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

    return {
      props: {
        match: match.data.response,
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
