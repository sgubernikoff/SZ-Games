import {React, useState} from 'react'

function Roulette() {
  const [spin, setSpin] = useState(null);

  function handleTableClick(e) {
    if ([e.target.className, e.target.parentNode.className].join(' ').includes("clickable")) {
      console.log(e.target.textContent);
    }
  }

  function spinWheel() {
    fetch('https://www.roulette.rip/api/play?bet=low&wager=200', {
      method: 'GET',
      mode: 'no-cors'
    })
    .then(response => response.json())
    .then(spinData => console.log(spinData))
  }

  return (
    <div>
      <div className="roulette-board" onClick={handleTableClick}>
        <div className="container-first">
          <div className="clickable zero-item">
            <div className="value">0</div>
          </div>
          <div className="clickable red-item">
            <div className="value">1</div>
          </div>
          <div className="clickable black-item">
            <div className="value">2</div>
          </div>
          <div className="clickable red-item">
            <div className="value">3</div>
          </div>
          <div className="clickable black-item">
            <div className="value">4</div>
          </div>
          <div className="clickable red-item">
            <div className="value">5</div>
          </div>
          <div className="clickable black-item">
            <div className="value">6</div>
          </div>
          <div className="clickable red-item">
            <div className="value">7</div>
          </div>
          <div className="clickable black-item">
            <div className="value">8</div>
          </div>
          <div className="clickable red-item">
            <div className="value">9</div>
          </div>
          <div className="clickable black-item">
            <div className="value">10</div>
          </div>
          <div className="clickable black-item">
            <div className="value">11</div>
          </div>
          <div className="clickable red-item">
            <div className="value">12</div>
          </div>
          <div className="clickable black-item">
            <div className="value">13</div>
          </div>
          <div className="clickable red-item">
            <div className="value">14</div>
          </div>
          <div className="clickable black-item">
            <div className="value">15</div>
          </div>
          <div className="clickable red-item">
            <div className="value">16</div>
          </div>
          <div className="clickable black-item">
            <div className="value">17</div>
          </div>
          <div className="clickable red-item">
            <div className="value">18</div>
          </div>
          <div className="clickable red-item">
            <div className="value">19</div>
          </div>
          <div className="clickable black-item">
            <div className="value">20</div>
          </div>
          <div className="clickable red-item">
            <div className="value">21</div>
          </div>
          <div className="clickable black-item">
            <div className="value">22</div>
          </div>
          <div className="clickable red-item">
            <div className="value">23</div>
          </div>
          <div className="clickable black-item">
            <div className="value">24</div>
          </div>
          <div className="clickable red-item">
            <div className="value">25</div>
          </div>
          <div className="clickable black-item">
            <div className="value">26</div>
          </div>
          <div className="clickable red-item">
            <div className="value">27</div>
          </div>
          <div className="clickable black-item">
            <div className="value">28</div>
          </div>
          <div className="clickable black-item">
            <div className="value">29</div>
          </div>
          <div className="clickable red-item">
            <div className="value">30</div>
          </div>
          <div className="clickable black-item">
            <div className="value">31</div>
          </div>
          <div className="clickable red-item">
            <div className="value">32</div>
          </div>
          <div className="clickable black-item">
            <div className="value">33</div>
          </div>
          <div className="clickable red-item">
            <div className="value">34</div>
          </div>
          <div className="clickable black-item">
            <div className="value">35</div>
          </div>
          <div className="clickable red-item">
            <div className="value">36</div>
          </div>
          <div className="clickable column-item">
            <div className="value">2-1<p className="hidden"> row1</p></div>
          </div>
          <div className="clickable column-item">
            <div className="value">2-1<p className="hidden"> row2</p></div>
          </div>
          <div className="clickable column-item">
            <div className="value">2-1<p className="hidden"> row3</p></div>
          </div>
        </div>
        <div className="container-second">
          <div className="clickable doz-item">
            <div>1st 12</div>
          </div>
          <div className="clickable doz-item">
            <div>2nd 12</div>
          </div>
          <div className="clickable doz-item">
            <div>3rd 12</div>
          </div>
        </div>
        <div className="container-third">
          <div className="clickable outside-section">
            <div>1-18</div>
          </div>
          <div className="clickable outside-section">
            <div>EVEN</div>
          </div>
          <div className="clickable outside-section">
            <div className="rhomb-red">red</div>
          </div>
          <div className="clickable outside-section">
            <div className="rhomb-black">black</div>
          </div>
          <div className="clickable outside-section">
            <div>ODD</div>
          </div>
          <div className="clickable outside-section">
            <div>19-36</div>
          </div>
        </div>
      </div>
      <button onClick={spinWheel}>Spin</button>
      {/* {
        spin ? <p>number: {spin.number}, color: {spin.color}, parity: {spin.parity}</p> : null
      } */}
    </div>
  )
}

export default Roulette