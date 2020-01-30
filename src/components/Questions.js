import React from 'react'
import axios from 'axios'

class Questions extends React.Component {
  state = {
    restCounties: '',
    rightAnswerCapital1: '',
    rightAnswerCountry1: '',
    rightAnswerFlag1: '',
    allAnswers: [],
    score: 0,
    canIncreaseScore: true,
    pageCount: 1,
    myStorage: window.localStorage,
    userName: ''
  }
  // state = {
  //   restCounties: '',
  //   rightAnswerCapital1: '',
  //   rightAnswerCountry1: '',
  //   rightAnswerFlag1: '',
  //   allAnswers: [],
  //   score: 0,
  //   canIncreaseScore: true,
  //   pageCount: 1
  // }

  async componentDidMount() {
    try {
      const response = await axios.get('https://restcountries.eu/rest/v2/all')
      // this.capitalsQuestion(response)
      // this.flagsQuestion1(response)
      // this.flagsQuestion2(response)
      this.setState({ restCounties: response })
      console.log('response =', response)
      console.log('restCountries =', this.state.restCounties)
      this.selectQuestion(response)
    } catch (err) {
      console.log(err)
    }
  }

  capitalsQuestion(response) {
    // const response = await axios.get('https://restcountries.eu/rest/v2/all')
    const hasCapitals = response.data.filter((element) => element.capital.length > 0)
    const rightAnswer = hasCapitals[Math.floor(Math.random() * hasCapitals.length)]
    const rightAnswerCapital = rightAnswer.capital
    const rightAnswerCountry = rightAnswer.name
    const answerArray = [rightAnswer.capital]
    while (answerArray.length < 4) {
      const genWrongAnswer = hasCapitals[Math.floor(Math.random() * hasCapitals.length)].capital
      if (!answerArray.includes(genWrongAnswer)) {
        answerArray.push(genWrongAnswer)
      }
    }
    answerArray.sort()
    this.setState({
      rightAnswerCapital1: rightAnswerCapital,
      rightAnswerCountry1: rightAnswerCountry,
      allAnswers: answerArray
    }, () => {
      console.log('answers', this.state.allAnswers)
    })
  }

  handleClick = e => {
    if (e.target.innerHTML === this.state.rightAnswerCapital1) {
      e.target.classList.add('correct')
      console.log('increase score')
      if (this.state.canIncreaseScore) {
        this.increaseScore()
      }
    } else e.target.classList.add('incorrect'), this.findRightAnswer()
    this.stopScore()
  }

  findRightAnswer() {
    const baseElement = document.querySelectorAll('button')
    console.log('basse', baseElement)
    baseElement.forEach((btn => {
      if (btn.innerHTML === this.state.rightAnswerCapital1) {
        btn.classList.add('correct')
      }
    }))
  }

  flagsQuestion1(response) {
    const rightAnswer = response.data[Math.floor(Math.random() * response.data.length)]
    const rightAnswerFlag = rightAnswer.flag
    const rightAnswerCountry = rightAnswer.name
    const answerArray = [rightAnswer.flag]
    while (answerArray.length < 4) {
      const genWrongAnswer = response.data[Math.floor(Math.random() * response.data.length)].flag
      if (!answerArray.includes(genWrongAnswer)) {
        answerArray.push(genWrongAnswer)
      }
    }
    answerArray.sort()
    this.setState({
      rightAnswerFlag1: rightAnswerFlag,
      rightAnswerCountry1: rightAnswerCountry,
      allAnswers: answerArray
    }, () => {
      console.log('answers', this.state.allAnswers)
    })
  }

  handleClick2 = e => {
    if (e.target.src === this.state.rightAnswerFlag1) {
      e.target.classList.add('correct')
      console.log('increase score')
      if (this.state.canIncreaseScore) {
        this.increaseScore()
      }
    } else e.target.classList.add('incorrect'), this.findRightAnswer2()
    this.stopScore()
    // console.log('src', e.target.src)
  }

  findRightAnswer2() {
    const baseElement = document.querySelectorAll('img')
    console.log('basse', baseElement)
    baseElement.forEach((btn => {
      if (btn.src === this.state.rightAnswerFlag1) {
        btn.classList.add('correct')
      }
    }))
  }

  flagsQuestion2(response) {
    // const response = await axios.get('https://restcountries.eu/rest/v2/all')
    // const hasCapitals = response.data.filter( (element) => element.capital.length > 0)
    const rightAnswer = response.data[Math.floor(Math.random() * response.data.length)]
    const rightAnswerFlag = rightAnswer.flag
    const rightAnswerCountry = rightAnswer.name
    const answerArray = [rightAnswer.name]
    while (answerArray.length < 4) {
      const genWrongAnswer = response.data[Math.floor(Math.random() * response.data.length)].name
      if (!answerArray.includes(genWrongAnswer)) {
        answerArray.push(genWrongAnswer)
      }
    }
    answerArray.sort()
    this.setState({
      rightAnswerFlag1: rightAnswerFlag,
      rightAnswerCountry1: rightAnswerCountry,
      allAnswers: answerArray
    }, () => {
      console.log('answers', this.state.allAnswers)
    })
  }

  handleClick3 = e => {
    if (e.target.innerHTML === this.state.rightAnswerCountry1) {
      e.target.classList.add('correct')
      console.log('increase score')
      if (this.state.canIncreaseScore) {
        this.increaseScore()
      }
    } else e.target.classList.add('incorrect'), this.findRightAnswer3()
    this.stopScore()
  }

  findRightAnswer3() {
    const baseElement = document.querySelectorAll('button')
    console.log('basse', baseElement)
    baseElement.forEach((btn => {
      if (btn.innerHTML === this.state.rightAnswerCountry1) {
        btn.classList.add('correct')
      }
    }))
  }

  increaseScore = () => {
    const scoreAdder = this.state.score + 1
    this.setState({
      score: scoreAdder,
      canIncreaseScore: false
    })
  }

  stopScore() {
    this.setState({
      canIncreaseScore: false
    })
  }

  selectQuestion(response) {
    const random = Math.floor(Math.random() * 3)
    console.log(random)
    switch (random) {
      case 0:
        document.querySelector('div.capitalQuestion').style.display = 'flex'
        this.capitalsQuestion(response)
        break
      case 1:
        document.querySelector('div.flagQuestion1').style.display = 'flex'
        this.flagsQuestion1(response)
        break
      case 2:
        document.querySelector('div.flagQuestion2').style.display = 'flex'
        this.flagsQuestion2(response)
        break
      default:
        console.log('default')
    }
  }

  handleNextPage = () => {
    document.querySelector('div.flagQuestion2').style.display = 'none'
    document.querySelector('div.capitalQuestion').style.display = 'none'
    document.querySelector('div.flagQuestion1').style.display = 'none'
    document.querySelectorAll('img').forEach(img => img.classList.remove('correct'))
    document.querySelectorAll('img').forEach(img => img.classList.remove('incorrect'))
    if (this.state.pageCount < 10) {
      const pageAdder = this.state.pageCount + 1
      this.setState({
        canIncreaseScore: true,
        rightAnswerCapital1: '',
        rightAnswerCountry1: '',
        rightAnswerFlag1: '',
        allAnswers: [],
        pageCount: pageAdder
      })
      this.selectQuestion(this.state.restCounties)
    } else this.genScorePage()
  }

  handlePlayAgain = () => {
    document.querySelector('div.main-container').style.display = 'flex'
    document.querySelector('div.scorePage').style.display = 'none'
    this.setState({
      canIncreaseScore: true,
      rightAnswerCapital1: '',
      rightAnswerCountry1: '',
      rightAnswerFlag1: '',
      allAnswers: [],
      pageCount: 1,
      score: 0
    })
    this.selectQuestion(this.state.restCounties)
  }

  genScorePage() {
    document.querySelector('div.main-container').style.display = 'none'
    document.querySelector('div.scorePage').style.display = 'flex'
    this.generateLeaderBd()
  }

  usernameInput = (e) => {
    this.setState({ userName: e.target.value })
  }

  usernameSubmit() {
    const username = this.state.userName
    // this.setState({})
    localStorage.setItem(username, this.state.score)
    console.log('Username', username, 'Score', this.state.score)
    console.log('Storage', this.state.myStorage)
    this.generateLeaderBd()
  }
  submitForm = (e) => {
    // form.addEventListener('submit', e => {
    e.preventDefault()
    this.usernameSubmit()
    console.log('form submitted')
    // })
  }
  generateLeaderBd() {
    const leaderboard = Object.entries(this.state.myStorage).map((element) => {
      return element = [element[0], parseInt(element[1])]
    }).filter(element => {
      return !isNaN(element[1])
    }).sort((a, b) => b[1] - (a[1]))
    console.log('leaderboard', leaderboard)
    console.log('name', leaderboard[0][0], 'score', leaderboard[0][1])
    document.querySelector('.scores1 .name').innerHTML = leaderboard[0][0]
    document.querySelector('.scores1 .userScore').innerHTML = leaderboard[0][1]
    document.querySelector('.scores2 .name').innerHTML = leaderboard[1][0]
    document.querySelector('.scores2 .userScore').innerHTML = leaderboard[1][1]
    document.querySelector('.scores3 .name').innerHTML = leaderboard[2][0]
    document.querySelector('.scores3 .userScore').innerHTML = leaderboard[2][1]
    document.querySelector('.scores4 .name').innerHTML = leaderboard[3][0]
    document.querySelector('.scores4 .userScore').innerHTML = leaderboard[3][1]
    document.querySelector('.scores5 .name').innerHTML = leaderboard[4][0]
    document.querySelector('.scores5 .userScore').innerHTML = leaderboard[4][1]
  }

  // genScorePage() {
  //   document.querySelector('div.main-container').style.display = 'none'
  //   document.querySelector('div.scorePage').style.display = 'flex'
  // }

  render() {
    console.log('render =',
      this.state.allAnswers
    )
    console.log('r score =',
      this.state.score
    )
    return (
      <>
        <div className="main-container">
          <div className="container-questions">
            <div className="capitalQuestion">
              <div className="question">
                <h3 className="capitalQuestionTitle">What is the capital of {this.state.rightAnswerCountry1}?</h3>
              </div>
              {/* <p>Answer: {this.state.rightAnswerCapital1}</p> */}
              {/* <p>Take your pick:</p> */}
              <div className="answer-container">
                {this.state.allAnswers.map(answer => (
                  <button className="buttonClass" key={answer} onClick={this.handleClick}>{answer}</button>
                ))}
              </div>
            </div>
            <div className="flagQuestion1">
              <h3 className="flagH3">What is the flag of {this.state.rightAnswerCountry1}? </h3>
              {/* <p>Answer: <img src={this.state.rightAnswerFlag1} /></p> */}
              <div className="answer-container2">
                {this.state.allAnswers.map(answer => (
                  <img className="imageMultipleChoice" key={answer} onClick={this.handleClick2} src={answer} />
                ))}
              </div>
            </div>
            <div className="flagQuestion2">
              <h3>Which country does this flag belong to?</h3>
              {<img src={this.state.rightAnswerFlag1} />}
              {/* <p>Answer:  {this.state.rightAnswerCountry1}</p> */}
              {/* <p>Take your pick:</p> */}
              <div className="answer-container">
                {this.state.allAnswers.map(answer => (
                  <button className="buttonClass" key={answer} onClick={this.handleClick3}>{answer}</button>
                ))}
              </div>
            </div>
            <div className="quizFooter">
              <p>Question: {this.state.pageCount} / 10</p>
              <p>Score: {this.state.score}</p>
              <button className="buttonNext" onClick={this.handleNextPage}><span>Next Page</span></button>
            </div>
          </div>
        </div>
        <div className="scorePage">
          <div className="scorePageContainer">
            <p className="finalScore">Your score: <span className="score">{this.state.score}</span> / 10</p>
            <form id="username">
              <p className="leaderTitle">Enter your name below to be added to the leaderboard</p>
              <div className="submitScore">
                <input id="textInput" type="text" name="name" onChange={this.usernameInput} />
                <input className="buttonSubmit" type="submit" value="Submit" onClick={this.submitForm} />
              </div>
            </form>
            <section className="leaderboard">
              <h2>Leaderboard</h2>
              <div className="scoreBoard">
                <div className="scores1"><div className="name">Record your score to be the first on the leaderboard!</div><div className="userScore"></div></div>
                <div className="scores2"><div className="name"></div><div className="userScore"></div></div>
                <div className="scores3"><div className="name"></div><div className="userScore"></div></div>
                <div className="scores4"><div className="name"></div><div className="userScore"></div></div>
                <div className="scores5"><div className="name"></div><div className="userScore"></div></div>
              </div>
              <button className="playAgain" onClick={this.handlePlayAgain}>Play again?</button>
            </section>
          </div>
        </div>
        {/* <div className="scorePage">
          <h2>Final score: {this.state.score} / 10</h2>
          <button className="playAgain" onClick={this.handlePlayAgain}>Play again?</button>
        </div> */}
      </>
    )
  }
}
export default Questions