import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import Loader from 'react-loader-spinner';

function RankingTable(props) {
  const activeType = props.type;
  const activeFormat = props.format;
  const [data, setData] = useState(null);

  const types = ['teams', 'batsmen', 'bowlers', 'all-rounders'];
  const formats = ['odi', 'test', 't20'];

  const [ranking, setRanking] = useState([{}, {}, {}, {}, {}]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function getRank() {
      axios
        .get('https://rest.entitysport.com/v2/iccranks', {
          params: { token: '437214169d9be2a73e91d22f76f68b52' },
        })
        .then((res) => {
          setRanking(res.data.response.ranks);
          setLoaded(true);
        })
        .catch((err) => console.log('Error in Ranking Table' + err.message));
    }
    getRank();
  }, []);

  useEffect(() => {
    if (loaded) {
      if (activeType === 'teams') {
        if (activeFormat === 'odi') {
          setData(ranking.teams.odis);
        } else if (activeFormat === 't20') {
          setData(ranking.teams.t20s);
        } else if (activeFormat === 'test') {
          setData(ranking.teams.tests);
        }
      } else if (activeType === 'batsmen') {
        if (activeFormat === 'odi') {
          setData(ranking.batsmen.odis);
        } else if (activeFormat === 't20') {
          setData(ranking.batsmen.t20s);
        } else if (activeFormat === 'test') {
          setData(ranking.batsmen.tests);
        }
      } else if (activeType === 'bowlers') {
        if (activeFormat === 'odi') {
          setData(ranking.bowlers.odis);
        } else if (activeFormat === 't20') {
          setData(ranking.bowlers.t20s);
        } else if (activeFormat === 'test') {
          setData(ranking.bowlers.tests);
        }
      } else if (activeType === 'all-rounders') {
        if (activeFormat === 'odi') {
          setData(ranking['all-rounders'].odis);
        } else if (activeFormat === 't20') {
          setData(ranking['all-rounders'].t20s);
        } else if (activeFormat === 'test') {
          setData(ranking['all-rounders'].tests);
        }
      }
    }
  }, [ranking, activeType, activeFormat, loaded]);

  return (
    <>
      <SkeletonTheme
        color="rgba(255, 255, 255, .1)"
        highlightColor="rgba(255, 255, 255, .05)"
      >
        <div className="prof-tab">
          <h3>{props.title ? props.title : <Skeleton width={400} />}</h3>
          <div className="tabContainer">
            <nav>
              <div
                className="nav nav-link-wrap bdr-btm-three rds"
                id="nav-tab"
                role="tablist"
              >
                {types.map((item, index) => (
                  <Link 
                    key={index} 
                    href={"/ranking/"+item+"/odi"}
                  >
                    <a
                      className={
                        activeType === item
                          ? 'nav-item nav-link active'
                          : 'nav-item nav-link'
                      }
                    >
                      {item}
                    </a>
                  </Link>
                ))}
              </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
              <div className="tab-pane fade show active">
                <div className="tb-content-wrap">
                  <div className="tabContainer-inner-1 rnk">
                    <nav>
                      <div
                        className="nav nav-link-wrap inner-1"
                        id="nav-tab"
                        role="tablist"
                      >
                        {formats.map((item, index) => (
                          <Link 
                            key={index} 
                            href={"/ranking/"+activeType+"/"+item}
                          >
                            <a
                              className={
                                activeFormat === item
                                  ? 'nav-item nav-link active'
                                  : 'nav-item nav-link'
                              }
                            >
                              {item}
                            </a>
                          </Link>
                        ))}
                      </div>
                    </nav>
                    <div className="tab-content" id="nav-tabContent">
                      <div
                        className="tab-pane fade show active"
                        id="tb-card-1"
                        role="tabpanel"
                        aria-labelledby="tb-inner-1-tab"
                      >
                        <div className="prf-table-inner">
                          <div className="pl-table-info-all">
                            <table className="table ranking-table">
                              <thead>
                                <tr>
                                  {activeType === 'teams' ? (
                                    <>
                                      <th>Pos</th>
                                      <th style={{ textAlign: 'left' }}>
                                        Team
                                      </th>
                                      <th className="center-blk">
                                        <span>Points</span>
                                      </th>
                                      <th className="center-blk">
                                        <span>Rating</span>
                                      </th>
                                    </>
                                  ) : activeType === 'batsmen' ||
                                    activeType === 'bowlers' ||
                                    activeType === 'all-rounders' ? (
                                    <>
                                      <th>Pos</th>
                                      <th style={{ textAlign: 'left' }}>
                                        Player
                                      </th>
                                      <th className="center-blk">
                                        <span>Team</span>
                                      </th>
                                      <th className="center-blk">
                                        <span>Rating</span>
                                      </th>
                                    </>
                                  ) : null}
                                </tr>
                              </thead>
                              <tbody>
                                {data ? (
                                  data.map((item, index) => (
                                    <tr key={index}>
                                      {activeType === 'teams' ? (
                                        <>
                                          <td>{item.rank}</td>
                                          <td
                                            className="cnt"
                                            style={{ textAlign: 'left' }}
                                          >
                                            <img
                                              src="/assets/img/flag-round.png"
                                              alt=""
                                            />
                                            {item.team}
                                          </td>
                                          <td className="center-blk">
                                            {item.points}
                                          </td>
                                          <td className="center-blk">
                                            {item.rating}
                                          </td>
                                        </>
                                      ) : activeType === 'batsmen' ||
                                        activeType === 'bowlers' ||
                                        activeType === 'all-rounders' ? (
                                        <>
                                          <td>{item.rank}</td>
                                          <td
                                            className="cnt"
                                            style={{ textAlign: 'left' }}
                                          >
                                            {item.player}
                                          </td>
                                          <td className="center-blk">
                                            {item.team}
                                          </td>
                                          <td className="center-blk">
                                            {item.rating}
                                          </td>
                                        </>
                                      ) : null}
                                    </tr>
                                  ))
                                ) : (
                                  <tr>
                                    <td colSpan={4}>
                                      <Loader
                                        type="Oval"
                                        color="white"
                                        height={30}
                                        width={30}
                                        style={{
                                          textAlign: 'center',
                                          padding: '100px',
                                        }}
                                      />
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
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
      </SkeletonTheme>
    </>
  );
}

export default RankingTable;
