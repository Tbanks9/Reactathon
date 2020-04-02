# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) 

# Software Engineering Immersive: Project 2

This is my second project completed during the General Assembly Software Engineering Immersive course (Week 6). This project was built in collaboration with Nick Dolan (https://github.com/Nicolas-Dolan) as part of our two-day long "Reactathon".

---

# Geography Genius

This project is a geography-based quiz game, built using REST COUNTRIES API (https://restcountries.eu/). The user is asked a total of ten geography-based questions, with four possible answers to choose from. You also have the choice of submitting your score at the end of each game.

## Built Using

1. HTML5
2. SCSS
   * Animation
   * Bulma
3. JavaScript
   * ECMAScript6
   * React
   * Axios
4. GitHub

## Deployment

Geography Genius is deployed on Heroku, and can be found here: https://geography-genius.herokuapp.com/

## Getting Started

Use the clone button to download the game source code. In the terminal, enter the following commands:

```
<!-- To install all the packages listed in the package.json: -->
$ npm i
<!-- Run the app in your localhost: -->
$ npm run serve
<!-- Check the console for any issues, and if there are, check the package.json for any dependancies missing  -->
```

## Website Architecture

The app is composed of a Home page, an Error page and the Questions page, which contains all of the game's logic as well as the leaderboard.

### 1. Home/Error Page

We wanted a simple entry point for the user, so we built a minimalistic Home page featuring a scenic background and a bulma-styled button to start the quiz.

Since the quiz itself is hosted entirely on `/questions`, trying to submit anything else in the URL will land them on the Error page

### 2. Questions Page

Once you land on the quiz (Questions.js), a function runs to get the data from the REST COUNTRIES API, and three variations of questions are randomly generated through a switch statement. The three questions are as followed:

1. **Which country does this flag belong to?** (Displays an image of the flag in question, with four choices of country names to choose from)
2. **What is the flag of (Randomly generated country name)?** (Displays the country name in question, with four choices of flag images to choose from)
3. **What is the capital of (Randomly generated country name)?** (Displays the country name in question, with four choices of Capital cities to choose from)

Below is the switch statement which randomly generates the questions, plus a screenshot of an example flag question:

``` javascript
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
```

![Quiz screenshot 1](/src/assets/Geography-genius-1.png)

Below is an excerpt of code from the Questions page. If the switch statement picks the **'capitalsQuestion'**, a corresponding country and capital are filtered as the correct answer. Three randomly generated incorrect capital cities are also included in the multiple choice:

``` javascript
  async componentDidMount() {
    try {
      const response = await axios.get('https://restcountries.eu/rest/v2/all')
      this.setState({ restCounties: response })
      console.log('response =', response)
      console.log('restCountries =', this.state.restCounties)
      this.selectQuestion(response)
    } catch (err) {
      console.log(err)
    }
  }

  capitalsQuestion(response) {
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
```
We decided it would be a nice touch to add some simple colours and animations to the gameplay. If the user chooses the correct answer, the button changes colour to green and jumps up and down. If the user selects the wrong answer, the button shakes and changes colour to red.

Below is a still image of this taking place:

![Quiz screenshot 2](/src/assets/Geography-genius-2.png)

## Score Tally and Leaderboard

With each question answered right or wrong, the total score is tallied out of ten. 

Here are the functions that carry out this action: 

``` javascript
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
```

Once the user has answered all ten questions, they can submit their total score to a leaderboard, which ranks the highest scorers.

See below for an example:

![Quiz screenshot 3](/src/assets/Geography-genius-3.png)

--- 

## Challenges and future improvements

This was the first time we experienced working as part of a team and collaborating on a project on a very quick turnaround. We had just two days in total to complete this task.

The first challenge we encountered was implementing three seperate question types. For a while, we had data creeping in from other question types, or incorrect answers displaying as the right ones. Writing similar functions for each question type fixed this issue.

In terms of future improvements, we originally planned to have around ten question types, including a mapbox feature where you guess the location using the lat/long coordinates provided in the REST COUNTRIES API. Naturally, we encountered some obstacles early on and decided to prioritise our favourite three question types. Given more time, we would've added the other seven.

In terms of the leaderboard feature, we also would've liked to write this in a cleaner way. Given the short deadline and with little research time, we went ahead with a fairly repetitive and bulky method (Albeit, one that functions just how we would want it to).

Here is a snippet of the leaderboard function:

``` javascript
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
  ```

  ## Wins

  This was my first time pair-programming, and I was really pleased with how well we worked together and how well our project materialised. Whilst we both contributed to all aspects of the code, given the short timeframe we naturally played to our strengths. My partner took ownership of a lot of the logic involved in the game, whilst I primarily focused on the user journey, visuals and animations.

  ## Key Learnings

  React was a fairly new technology to us at this time, so not being afriad to try things and make mistakes was a big key learning. Since we had less than two days to complete this project, we had to quickly decide what was a priority and what wasn't. I learnt a lot about how to effectively manage my time, and how to communicate with my partner when something was beginning to look unrealistic, or was taking too much valuable time.

  ---

  ## Authors

  - Tim Banks
  - Nicolas Dolan








