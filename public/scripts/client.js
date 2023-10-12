// /*
//  * Client-side JS logic goes here
//  * jQuery is already loaded
//  * Reminder: Use (and do all your DOM work in) jQuery's document ready function
//  */


// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd"
//     },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ];


const createTweetElement = function(tweetObj) {
  let $tweet =
    `<section class="tweets">
        <header class="header-tweets">
          <div id=""><img src="${tweetObj.user.avatars}"></div>
          <div id="name">${tweetObj.user.name}</div>

          <div id="handle">${tweetObj.user.handle}</div>
        </header>
        <article>
        ${tweetObj.content.text}
        </article>
        <hr class="default">
        <footer class="header-tweets">
          <div>${timeago.format(tweetObj.created_at)}</div>
          <div>
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </footer>
      </section>`;
  return $tweet;

};

const renderTweets = function(tweets) {
  for (let tweet of tweets) {

    // calls createTweetElement for each tweet
    const $tweet = createTweetElement(tweet);


    // takes return value and appends it to the tweets container
    $('#tweets-container').append($tweet);

  }
};


// const tweetData = {
//   "user": {
//     "name": "Newton",
//     "avatars": "https://i.imgur.com/73hZDYK.png",
//     "handle": "@SirIsaac"
//   },
//   "content": {
//     "text": "If I have seen further it is by standing on the shoulders of giants"
//   },
//   "created_at": 1461116232227
// };

// const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
// console.log($tweet); // to see what it looks like
// renderTweets(data);

const loadTweets = () => {
  $.get('/tweets', (data) => {
    renderTweets(data);
  });
};
loadTweets();

$('form').on('submit', function(event) {
  event.preventDefault();
  const data = $('form').serialize();
  const counter = $(this).closest('.new-tweet').find('.counter-val').val();
  if (counter >= 140 || counter < 0) {
    console.log(counter);
    alert('the tweet is not between 1 - 140 characters');
  } else {
    console.log(counter);
    $('form').trigger('reset');

    //update the character counter value
    $(this).closest('.new-tweet').find('.counter-val').text(140);
    $.post('/tweets', data);
    $('#tweets-container').empty()
    loadTweets()
  }


});

