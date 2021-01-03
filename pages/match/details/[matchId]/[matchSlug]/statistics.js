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
  const [statistics, setStatistics] = useState(props.statistics);
  const [loaded, setLoaded] = useState(props.loaded);

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

  const data = {
    labels:
      loaded && statistics[0]
        ? statistics[0].statistics.manhattan.map((item) => item.over)
        : [],
    datasets: [
      {
        label: loaded && statistics[0] ? statistics[0].name : '1',
        backgroundColor: '#00CCCC',
        data: statistics[0]
          ? statistics[0].statistics.manhattan.map((item) => item.runs)
          : [],
      },
      {
        label: loaded && statistics[1] ? statistics[1].name : '2',
        backgroundColor: '#FFE100',
        data:
          loaded && statistics[1]
            ? statistics[1].statistics.manhattan.map((item) => item.runs)
            : [],
      },
    ],
  };

  const data2 = {
    labels:
      loaded && statistics[0]
        ? statistics[0].statistics.manhattan.map((item) => item.over)
        : [],
    datasets: [
      {
        label: loaded && statistics[0] ? statistics[0].name : '3',
        fill: false,
        lineTension: 0.1,
        borderColor: '#00CCCC',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: '#00CCCC',
        pointBackgroundColor: '#00CCCC',
        pointBorderWidth: 1,
        pointRadius: 3,
        pointHitRadius: 10,
        data:
          loaded && statistics[0]
            ? statistics[0].statistics.worm.map((item) => item.runs)
            : [],
      },
      {
        label: loaded && statistics[1] ? statistics[1].name : '4',
        fill: false,
        lineTension: 0.1,
        borderColor: '#FFE100',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: '#FFE100',
        pointBackgroundColor: '#FFE100',
        pointBorderWidth: 1,
        pointRadius: 3,
        pointHitRadius: 10,
        data:
          loaded && statistics[1]
            ? statistics[1].statistics.worm.map((item) => item.runs)
            : [],
      },
    ],
  };

  //   const data3 = {
  //     labels: loaded && statistics[0] ? statistics[0].statistics.p2p.map((item) => findPlayer(item.batsman_id)) : [],
  //     datasets: [
  //       {
  //         label: loaded && statistics[0] ? statistics[0].name : null,
  //         backgroundColor: '#00CCCC',
  //         data: loaded && statistics[0] ? statistics[0].statistics.p2p.map((item) => item.runs) : []
  //       },
  //       {
  //         label: loaded && statistics[1] ? statistics[1].name : null,
  //         backgroundColor: '#FFE100',
  //         data: loaded && statistics[1] ? statistics[1].statistics.p2p.map((item) => item.runs) : []
  //       }
  //     ]
  //   };

  const data4 = {
    labels:
      loaded && statistics[0]
        ? statistics[0].statistics.runtypes.map((item) => item.name)
        : [],
    datasets: [
      {
        label: loaded && statistics[0] ? statistics[0].name : '5',
        backgroundColor: '#00CCCC',
        data:
          loaded && statistics[0]
            ? statistics[0].statistics.runtypes.map((item) => item.value)
            : [],
      },
      {
        label: loaded && statistics[1] ? statistics[1].name : '6',
        backgroundColor: '#FFE100',
        data:
          loaded && statistics[1]
            ? statistics[1].statistics.runtypes.map((item) => item.value)
            : [],
      },
    ],
  };

  const data5 = {
    labels:
      loaded && statistics[0]
        ? statistics[0].statistics.wickets.map((item) => item.name)
        : [],
    datasets: [
      {
        label: loaded && statistics[0] ? statistics[0].name : '7',
        backgroundColor: '#00CCCC',
        data:
          loaded && statistics[0]
            ? statistics[0].statistics.wickets.map((item) => item.value)
            : [],
      },
      {
        label: loaded && statistics[1] ? statistics[1].name : '8',
        backgroundColor: '#FFE100',
        data:
          loaded && statistics[1]
            ? statistics[1].statistics.wickets.map((item) => item.value)
            : [],
      },
    ],
  };

  const data6 = {
    labels:
      loaded && statistics[0]
        ? statistics[0].statistics.extras.map((item) => item.name)
        : [],
    datasets: [
      {
        label: loaded && statistics[0] ? statistics[0].name : '9',
        backgroundColor: '#00CCCC',
        data:
          loaded && statistics[0]
            ? statistics[0].statistics.extras.map((item) => item.value)
            : [],
      },
      {
        label: loaded && statistics[1] ? statistics[1].name : '10',
        backgroundColor: '#FFE100',
        data:
          loaded && statistics[1]
            ? statistics[1].statistics.extras.map((item) => item.value)
            : [],
      },
    ],
  };

  const data7 = {
    labels:
      loaded && statistics[0]
        ? statistics[0].statistics.runrates.map((item) => item.over)
        : [],
    datasets: [
      {
        label: loaded && statistics[0] ? statistics[0].name : '11',
        fill: false,
        lineTension: 0.1,
        borderColor: '#00CCCC',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: '#00CCCC',
        pointBackgroundColor: '#00CCCC',
        pointBorderWidth: 1,
        pointRadius: 3,
        pointHitRadius: 10,
        data:
          loaded && statistics[0]
            ? statistics[0].statistics.runrates.map((item) => item.runrate)
            : [],
      },
      {
        label: loaded && statistics[1] ? statistics[1].name : '12',
        fill: false,
        lineTension: 0.1,
        borderColor: '#FFE100',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: '#FFE100',
        pointBackgroundColor: '#FFE100',
        pointBorderWidth: 1,
        pointRadius: 3,
        pointHitRadius: 10,
        data:
          loaded && statistics[1]
            ? statistics[1].statistics.runrates.map((item) => item.runrate)
            : [],
      },
    ],
  };

  const options = {
    legend: {
      labels: {
        fontColor: 'white',
      },
    },
    scales: {
      xAxes: [
        {
          // barThickness : 8,
          // categoryPercentage: 0.5,
          // barPercentage: 0.5,
          ticks: {
            fontColor: 'white',
          },
        },
      ],
      yAxes: [
        {
          // barThickness : 8,
          // categoryPercentage: 0.5,
          // barPercentage: 0.5,
          ticks: {
            fontColor: 'white',
          },
        },
      ],
    },
    maintainAspectRatio: true,
    cornerRadius: 100,
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
          getStatistics();
        });
    }
    function getStatistics() {
      axios
        .get(
          'https://rest.entitysport.com/v2/matches/' +
            history.query.matchId +
            '/statistics'
        )
        .then((res) => {
          setStatistics(res.data.response.innings);
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
                              <Link href={"/match/details/"+history.query.matchId+"/"+history.query.matchSlug+"/live"}>
                                <a className="nav-item nav-link">
                                  Live
                                </a>
                              </Link>
                            ) : null}
                            {loaded && match.status === 1 ? null : (
                              <>
                                <Link href={"/match/details/"+history.query.matchId+"/"+history.query.matchSlug+"/scorecard"}>
                                  <a className="nav-item nav-link">
                                    Scorecard
                                  </a>
                                </Link>
                                <Link href={"/match/details/"+history.query.matchId+"/"+history.query.matchSlug+"/commentary"}>
                                  <a className="nav-item nav-link">
                                    Commentary
                                  </a>
                                </Link>
                                <Link href={"/match/details/"+history.query.matchId+"/"+history.query.matchSlug+"/statistics"}>
                                  <a className="nav-item nav-link active">
                                    Statistics
                                  </a>
                                </Link>
                              </>                            
                            )}
                            <Link href={"/match/details/"+history.query.matchId+"/"+history.query.matchSlug+"/line-ups"}>
                              <a className="nav-item nav-link">
                                Line-Ups
                              </a>
                            </Link>
                            <Link href={"/match/details/"+history.query.matchId+"/"+history.query.matchSlug+"/info"}>
                              <a className="nav-item nav-link">
                                Info
                              </a>
                            </Link>
                          </div>
                        </nav>
                        <div className="tab-content" id="nav-tabContent">
                      
                             <div
                                className="tab-pane fade show active"
                                id="tbFour"
                                role="tabpanel"
                                aria-labelledby="tbFour-tab"
                              >
                                <div className="tb-content-wrap">
                                  <div className="tabContainer-inner-1">
                                    <div
                                      className="tab-content"
                                      id="nav-tabContent"
                                    >
                                      <div
                                        className="tab-pane fade show active"
                                        id="tbOne-inner-11"
                                        role="tabpanel"
                                        aria-labelledby="tbOne-inner-11-tab"
                                      >
                                        <div className="tb-content-wrap inner-1">
                                          <div className="tabContainer-inner-1">
                                            <nav>
                                              <div
                                                className="nav nav-link-wrap inner-2"
                                                id="nav-tab"
                                                role="tablist"
                                              >
                                                <a
                                                  className="nav-item nav-link active"
                                                  id="tbOne-11-tab"
                                                  data-toggle="tab"
                                                  href="#tbOne-11"
                                                  role="tab"
                                                  aria-controls="nav-home"
                                                  aria-selected="true"
                                                >
                                                  Manhattan
                                                </a>

                                                <a
                                                  className="nav-item nav-link"
                                                  id="tbTwo-22-tab"
                                                  data-toggle="tab"
                                                  href="#tbTwo-22"
                                                  role="tab"
                                                  aria-controls="nav-profile"
                                                  aria-selected="false"
                                                >
                                                  Worm
                                                </a>

                                                {/* <a
                                                                                            className="nav-item nav-link"
                                                                                            id="tbTwo-23-tab"
                                                                                            data-toggle="tab"
                                                                                            href="#tbTwo-23"
                                                                                            role="tab"
                                                                                            aria-controls="nav-profile"
                                                                                            aria-selected="false"
                                                                                        >
                                                                                            Player
                                                                                            vs
                                                                                            Player
                                                                                        </a> */}

                                                <a
                                                  className="nav-item nav-link"
                                                  id="tbTwo-24-tab"
                                                  data-toggle="tab"
                                                  href="#tbTwo-24"
                                                  role="tab"
                                                  aria-controls="nav-profile"
                                                  aria-selected="false"
                                                >
                                                  Runs
                                                </a>

                                                <a
                                                  className="nav-item nav-link"
                                                  id="tbTwo-25-tab"
                                                  data-toggle="tab"
                                                  href="#tbTwo-25"
                                                  role="tab"
                                                  aria-controls="nav-profile"
                                                  aria-selected="false"
                                                >
                                                  Wickets
                                                </a>

                                                <a
                                                  className="nav-item nav-link"
                                                  id="tbTwo-26-tab"
                                                  data-toggle="tab"
                                                  href="#tbTwo-26"
                                                  role="tab"
                                                  aria-controls="nav-profile"
                                                  aria-selected="false"
                                                >
                                                  Extras
                                                </a>

                                                <a
                                                  className="nav-item nav-link"
                                                  id="tbTwo-27-tab"
                                                  data-toggle="tab"
                                                  href="#tbTwo-27"
                                                  role="tab"
                                                  aria-controls="nav-profile"
                                                  aria-selected="false"
                                                >
                                                  Run Rates
                                                </a>
                                              </div>
                                            </nav>
                                            <div
                                              className="tab-content"
                                              id="nav-tabContent"
                                            >
                                              <div
                                                className="tab-pane fade show active"
                                                id="tbOne-11"
                                                role="tabpanel"
                                                aria-labelledby="tbOne-11-tab"
                                              >
                                                <div className="tb-content-wrap inner-2">
                                                  <div className="chart-wrap mb-20">
                                                    <div className="chart-title">
                                                      <h4>MANHATTAN</h4>

                                                      <div className="chart-trans-info">
                                                        {loaded
                                                          ? match.innings.map(
                                                              (item, index) => (
                                                                <p key={index}>
                                                                  {item.name}{' '}
                                                                  <span
                                                                    className={
                                                                      index ===
                                                                      0
                                                                        ? 'dott'
                                                                        : 'dott yellow'
                                                                    }
                                                                  ></span>
                                                                </p>
                                                              )
                                                            )
                                                          : null}
                                                      </div>
                                                    </div>

                                                    <div className="cart-img">
                                                      <Bar
                                                        data={data}
                                                        width={100}
                                                        height={40}
                                                        options={options}
                                                      />
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              <div
                                                className="tab-pane fade"
                                                id="tbTwo-22"
                                                role="tabpanel"
                                                aria-labelledby="tbTwo-22-tab"
                                              >
                                                <div className="tb-content-wrap inner-2">
                                                  <div className="chart-wrap mb-20">
                                                    <div className="chart-title">
                                                      <h4>Worm</h4>

                                                      <div className="chart-trans-info">
                                                        {loaded
                                                          ? match.innings.map(
                                                              (item, index) => (
                                                                <p key={index}>
                                                                  {item.name}{' '}
                                                                  <span
                                                                    className={
                                                                      index ===
                                                                      0
                                                                        ? 'dott'
                                                                        : 'dott yellow'
                                                                    }
                                                                  ></span>
                                                                </p>
                                                              )
                                                            )
                                                          : null}
                                                      </div>
                                                    </div>

                                                    <div className="cart-img">
                                                      <Line
                                                        data={data2}
                                                        width={100}
                                                        height={40}
                                                        options={options}
                                                      />
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              {/* <div
                                                                                        className="tab-pane fade"
                                                                                        id="tbTwo-23"
                                                                                        role="tabpanel"
                                                                                        aria-labelledby="tbOne-23-tab"
                                                                                    >
                                                                                        <div className="tb-content-wrap inner-2">
                                                                                        <div className="chart-wrap mb-20">
                                                                                                <div className="chart-title">
                                                                                                    <h4>
                                                                                                        PLAYER
                                                                                                        VS
                                                                                                        PLAYER
                                                                                                    </h4>

                                                                                                    <div className="chart-trans-info">
                                                                                                    {loaded
                                                                                                        ? match.innings.map(
                                                                                                            (
                                                                                                                item,
                                                                                                                index
                                                                                                            ) => (
                                                                                                                <p key={index}>
                                                                                                                    {item.name} <span className={index === 0 ? "dott" : "dott yellow"}></span>
                                                                                                                </p>
                                                                                                            )
                                                                                                        ) : null
                                                                                                    }
                                                                                                    </div>
                                                                                                </div>

                                                                                                <div className="cart-img">
                                                                                                    <HorizontalBar
                                                                                                        data={data3}
                                                                                                        width={100}
                                                                                                        height={100}
                                                                                                        options={options}
                                                                                                    />
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div> */}
                                              <div
                                                className="tab-pane fade"
                                                id="tbTwo-24"
                                                role="tabpanel"
                                                aria-labelledby="tbOne-24-tab"
                                              >
                                                <div className="tb-content-wrap inner-2">
                                                  <div className="chart-wrap mb-20">
                                                    <div className="chart-title">
                                                      <h4>Runs</h4>

                                                      <div className="chart-trans-info">
                                                        {loaded
                                                          ? match.innings.map(
                                                              (item, index) => (
                                                                <p key={index}>
                                                                  {item.name}{' '}
                                                                  <span
                                                                    className={
                                                                      index ===
                                                                      0
                                                                        ? 'dott'
                                                                        : 'dott yellow'
                                                                    }
                                                                  ></span>
                                                                </p>
                                                              )
                                                            )
                                                          : null}
                                                      </div>
                                                    </div>

                                                    <div className="cart-img">
                                                      <HorizontalBar
                                                        data={data4}
                                                        width={100}
                                                        height={40}
                                                        options={options}
                                                      />
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              <div
                                                className="tab-pane fade"
                                                id="tbTwo-25"
                                                role="tabpanel"
                                                aria-labelledby="tbOne-25-tab"
                                              >
                                                <div className="tb-content-wrap inner-2">
                                                  <div className="chart-wrap mb-20">
                                                    <div className="chart-title">
                                                      <h4>Wickets</h4>

                                                      <div className="chart-trans-info">
                                                        {loaded
                                                          ? match.innings.map(
                                                              (item, index) => (
                                                                <p key={index}>
                                                                  {item.name}{' '}
                                                                  <span
                                                                    className={
                                                                      index ===
                                                                      0
                                                                        ? 'dott'
                                                                        : 'dott yellow'
                                                                    }
                                                                  ></span>
                                                                </p>
                                                              )
                                                            )
                                                          : null}
                                                      </div>
                                                    </div>

                                                    <div className="cart-img">
                                                      <HorizontalBar
                                                        data={data5}
                                                        width={100}
                                                        height={40}
                                                        options={options}
                                                      />
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              <div
                                                className="tab-pane fade"
                                                id="tbTwo-26"
                                                role="tabpanel"
                                                aria-labelledby="tbOne-26-tab"
                                              >
                                                <div className="tb-content-wrap inner-2">
                                                  <div className="chart-wrap mb-20">
                                                    <div className="chart-title">
                                                      <h4>Extras</h4>

                                                      <div className="chart-trans-info">
                                                        {loaded
                                                          ? match.innings.map(
                                                              (item, index) => (
                                                                <p key={index}>
                                                                  {item.name}{' '}
                                                                  <span
                                                                    className={
                                                                      index ===
                                                                      0
                                                                        ? 'dott'
                                                                        : 'dott yellow'
                                                                    }
                                                                  ></span>
                                                                </p>
                                                              )
                                                            )
                                                          : null}
                                                      </div>
                                                    </div>

                                                    <div className="cart-img">
                                                      <HorizontalBar
                                                        data={data6}
                                                        width={100}
                                                        height={40}
                                                        options={options}
                                                      />
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              <div
                                                className="tab-pane fade"
                                                id="tbTwo-27"
                                                role="tabpanel"
                                                aria-labelledby="tbOne-27-tab"
                                              >
                                                <div className="tb-content-wrap inner-2">
                                                  <div className="chart-wrap mb-20">
                                                    <div className="chart-title">
                                                      <h4>Run Rate</h4>

                                                      <div className="chart-trans-info">
                                                        {loaded
                                                          ? match.innings.map(
                                                              (item, index) => (
                                                                <p key={index}>
                                                                  {item.name}{' '}
                                                                  <span
                                                                    className={
                                                                      index ===
                                                                      0
                                                                        ? 'dott'
                                                                        : 'dott yellow'
                                                                    }
                                                                  ></span>
                                                                </p>
                                                              )
                                                            )
                                                          : null}
                                                      </div>
                                                    </div>

                                                    <div className="cart-img">
                                                      <Line
                                                        data={data7}
                                                        width={100}
                                                        height={40}
                                                        options={options}
                                                      />
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div
                                        className="tab-pane fade"
                                        id="tbTwo-inner-22"
                                        role="tabpanel"
                                        aria-labelledby="tbTwo-inner-22-tab"
                                      >
                                        <div className="tb-content-wrap inner-1">
                                          ...
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

    const statistics = await axios.get(
      'https://rest.entitysport.com/v2/matches/' +
        params.matchId +
        '/statistics',
      param
    );

    return {
      props: {
        match: match.data.response,
        statistics: statistics.data.response.innings,
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
