import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

function ICCTeamRanking() {
  const [ranking, setRanking] = useState([]);
  const [loaded, setLoaded] = useState(false);

  async function getRank() {
    axios.get('https://rest.entitysport.com/v2/iccranks').then((res) => {
      setRanking(res.data);
      setLoaded(true);
    });
  }

  useEffect(() => {
    getRank();
  }, [loaded]);

  return (
    <>
      <div className="sidebar-widget rank-widget">
        <h4 className="heading-title">ICC TEAM RANKING</h4>
        <div>
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <Link href="#nav-4">
              <a className="nav-item nav-link active" data-toggle="tab">
                ODI
              </a>
            </Link>
            <Link href="#nav-5">
              <a className="nav-item nav-link" data-toggle="tab">
                T20
              </a>
            </Link>
            <Link href="#nav-6">
              <a className="nav-item nav-link" data-toggle="tab">
                TEST
              </a>
            </Link>
          </div>
        </div>
        <div className="tab-content" id="nav-tabContent">
          <div className="tab-pane fade show active" id="nav-4">
            <nav>
              <ul>
                <li>
                  <ol>
                    <li>
                      <p>Pos</p>
                    </li>
                    <li>
                      <p>Team</p>
                    </li>
                    <li>
                      <p>Rating</p>
                    </li>
                  </ol>
                </li>
                <li>
                  <ol>
                    <li>
                      <p>1</p>
                    </li>
                    <li>
                      <p>Pakistan</p>
                    </li>
                    <li>
                      <p>270</p>
                    </li>
                  </ol>
                </li>
                <li>
                  <ol>
                    <li>
                      <p>1</p>
                    </li>
                    <li>
                      <p>Pakistan</p>
                    </li>
                    <li>
                      <p>270</p>
                    </li>
                  </ol>
                </li>
                <li>
                  <ol>
                    <li>
                      <p>1</p>
                    </li>
                    <li>
                      <p>Pakistan</p>
                    </li>
                    <li>
                      <p>270</p>
                    </li>
                  </ol>
                </li>
                <li>
                  <ol>
                    <li>
                      <p>1</p>
                    </li>
                    <li>
                      <p>Pakistan</p>
                    </li>
                    <li>
                      <p>270</p>
                    </li>
                  </ol>
                </li>
                <li>
                  <Link href="#">
                    <a>watch full ranking</a>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="tab-pane fade" id="nav-5"></div>
          <div className="tab-pane fade" id="nav-6"></div>
        </div>
      </div>
    </>
  );
}

export default ICCTeamRanking;
