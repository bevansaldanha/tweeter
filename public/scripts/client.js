const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function(tweetObj) {
  let $tweet =
    `<section class="tweets">
        <header class="header-tweets">
          <span id = "av-and-name">
          <div id=""><img src="${tweetObj.user.avatars}"></div>
          <div id="name">${tweetObj.user.name}</div>
          </span>

          <div id="handle">${tweetObj.user.handle}</div>
        </header>
        <article>
        ${escape(tweetObj.content.text)}
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
    $('#tweets-container').prepend($tweet);

  }
};


const loadTweets = () => {
  $.get('/tweets', (data) => {
    renderTweets(data);
  });
};
loadTweets();

$('form').on('submit', function(event) {
  event.preventDefault();
  const data = $('form').serialize();


  // turn the serialized input into a JSON object, and check if the input is valid
  const testing = JSON.parse(JSON.stringify($('form').serializeArray()));
  const updatedTester = testing[0].value.split("");
  const justSpaces = testing[0].value.split("").filter((element) => element !== " " && element !== '\n' && element !== '\r');

  if (updatedTester.length > 140 || updatedTester.length < 0 || !justSpaces.length) {
    $('#error').slideDown();
  } else {
    $('#error').slideUp();

    $('form').trigger('reset');

    //update the character counter value
    $(this).closest('.new-tweet').find('.counter-val').text(140);
    $.post('/tweets', data, () => {
      $('#tweets-container').empty();
      loadTweets();
    });
  }
});

