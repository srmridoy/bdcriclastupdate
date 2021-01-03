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
  const [commentary1st, setCommentary1st] = useState(props.commentary1st);
  const [commentary2nd, setCommentary2nd] = useState(props.commentary2nd);
  const [loaded, setLoaded] = useState(props.loaded);
  const players = loaded ? match.players : [];

  console.log(commentary1st);

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
          getCommentary();
        });
    }
    function getCommentary() {
      axios
        .get(
          'https://rest.entitysport.com/v2/matches/' +
          history.query.matchId +
          '/innings/1/commentary'
        )
        .then((res) => {
          setCommentary1st(
            res.data.response.commentaries
              ? res.data.response.commentaries.reverse()
              : []
          );
        });
      axios
        .get(
          'https://rest.entitysport.com/v2/matches/' +
          history.query.matchId +
          '/innings/2/commentary'
        )
        .then((res) => {
          setCommentary2nd(
            res.data.response.commentaries
              ? res.data.response.commentaries.reverse()
              : []
          );
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
                                  <a className="nav-item nav-link">
                                    Scorecard
                                  </a>
                                </Link>
                                <Link href={"/match/details/" + history.query.matchId + "/" + history.query.matchSlug + "/commentary"}>
                                  <a className="nav-item nav-link active">
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
                            id="tbThree"
                            role="tabpanel"
                            aria-labelledby="tbThree-tab"
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
                                            'tbOne-inner-' +
                                            index +
                                            '-tab'
                                          }
                                          data-toggle="tab"
                                          href={'#tbOne-inner-' + index}
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
                                  <div
                                    className="tab-pane fade show active"
                                    id="tbOne-inner-0"
                                    role="tabpanel"
                                    aria-labelledby="tbOne-inner-0-tab"
                                  >
                                    <div className="tb-content-wrap inner-1">
                                      <div className="similar-blk mb-20 mt-20">
                                        <div className="commentry-common-wrap">
                                          <div
                                            style={{ textAlign: 'center' }}
                                          >
                                            <Advertisement
                                              size={72890}
                                              style={{
                                                marginBottom: '15px',
                                              }}
                                            />
                                          </div>
                                          {commentary1st.map(
                                            (item, index) =>
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
                                                        <li>
                                                          {item.commentary}
                                                        </li>
                                                      </ul>
                                                    </div>
                                                    <div className="bottom-bar">
                                                      <div className="btm-bar-left-p">
                                                        {item.bats.map(
                                                          (
                                                            batsman,
                                                            index
                                                          ) => (
                                                              <p key={index}>
                                                                {findPlayer(
                                                                  batsman.batsman_id
                                                                )}{' '}
                                                                  :{' '}
                                                                {batsman.runs}{' '}
                                                                  (
                                                                {
                                                                  batsman.balls_faced
                                                                }
                                                                  )
                                                              </p>
                                                            )
                                                        )}
                                                      </div>
                                                      <div className="btm-bar-right-p">
                                                        <p>
                                                          {findPlayer(
                                                            item.bowls[0]
                                                              .bowler_id
                                                          )}{' '}
                                                              :{' '}
                                                          {
                                                            item.bowls[0]
                                                              .overs
                                                          }
                                                              -
                                                              {
                                                            item.bowls[0]
                                                              .wickets
                                                          }
                                                              -
                                                              {
                                                            item.bowls[0]
                                                              .runs_conceded
                                                          }
                                                              -
                                                              {
                                                            item.bowls[0]
                                                              .maidens
                                                          }
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
                                                        : item.run === 4
                                                          ? 'single-comentry light-blue-bgg'
                                                          : item.run === 6
                                                            ? 'single-comentry light-green-bgg'
                                                            : 'single-comentry gray-bgg'
                                                    }
                                                  >
                                                    <div className="left-trans-over">
                                                      {item.over +
                                                        '.' +
                                                        item.ball}
                                                      <span
                                                        className={
                                                          item.event ===
                                                            'wicket'
                                                            ? 'over-oval red-bg'
                                                            : item.run === 4
                                                              ? 'over-oval blue-bg'
                                                              : item.run === 6
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
                                    </div>
                                  </div>

                                  <div
                                    className="tab-pane fade"
                                    id="tbOne-inner-1"
                                    role="tabpanel"
                                    aria-labelledby="tbOne-inner-1-tab"
                                  >
                                    <div className="tb-content-wrap inner-1">
                                      <div className="similar-blk mb-20 mt-20">
                                        <div className="commentry-common-wrap">
                                          {commentary2nd.map(
                                            (item, index) =>
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
                                                        {match.innings[1].short_name.replace(
                                                          ' Inning',
                                                          ''
                                                        )}{' '}
                                                            : {item.score}
                                                      </p>
                                                      <ul className="h-current-statistics">
                                                        <li>
                                                          {item.commentary}
                                                        </li>
                                                      </ul>
                                                    </div>
                                                    <div className="bottom-bar">
                                                      <div className="btm-bar-left-p">
                                                        {item.bats.map(
                                                          (
                                                            batsman,
                                                            index
                                                          ) => (
                                                              <p key={index}>
                                                                {findPlayer(
                                                                  batsman.batsman_id
                                                                )}{' '}
                                                                  :{' '}
                                                                {batsman.runs}{' '}
                                                                  (
                                                                {
                                                                  batsman.balls_faced
                                                                }
                                                                  )
                                                              </p>
                                                            )
                                                        )}
                                                      </div>
                                                      {item.bowls[0] ? (
                                                        <div className="btm-bar-right-p">
                                                          <p>
                                                            {findPlayer(
                                                              item.bowls[0]
                                                                .bowler_id
                                                            )}{' '}
                                                                :{' '}
                                                            {
                                                              item.bowls[0]
                                                                .overs
                                                            }
                                                                -
                                                                {
                                                              item.bowls[0]
                                                                .wickets
                                                            }
                                                                -
                                                                {
                                                              item.bowls[0]
                                                                .runs_conceded
                                                            }
                                                                -
                                                                {
                                                              item.bowls[0]
                                                                .maidens
                                                            }
                                                          </p>
                                                        </div>
                                                      ) : null}
                                                    </div>
                                                  </div>
                                                </div>
                                              ) : (
                                                  <div
                                                    key={index}
                                                    className={
                                                      item.event === 'wicket'
                                                        ? 'single-comentry light-red-bgg'
                                                        : item.run === 4
                                                          ? 'single-comentry light-blue-bgg'
                                                          : item.run === 6
                                                            ? 'single-comentry light-green-bgg'
                                                            : 'single-comentry gray-bgg'
                                                    }
                                                  >
                                                    <div className="left-trans-over">
                                                      {item.over +
                                                        '.' +
                                                        item.ball}
                                                      <span
                                                        className={
                                                          item.event ===
                                                            'wicket'
                                                            ? 'over-oval red-bg'
                                                            : item.run === 4
                                                              ? 'over-oval blue-bg'
                                                              : item.run === 6
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

    const commentry1 = await axios.get(
      'https://rest.entitysport.com/v2/matches/' +
      params.matchId +
      '/innings/1/commentary',
      param
    );

    console.log(commentry1.data);

    const commentry2 = await axios.get(
      'https://rest.entitysport.com/v2/matches/' +
      params.matchId +
      '/innings/2/commentary',
      param
    );

    return {
      props: {
        match: match.data.response,
        commentary1st: commentry1.data.response.commentaries
          ? commentry1.data.response.commentaries.reverse()
          : [],
        commentary2nd: commentry2.data.response.commentaries
          ? commentry2.data.response.commentaries.reverse()
          : [],
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
