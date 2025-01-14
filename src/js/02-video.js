import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on(
  'timeupdate', throttle(function (evt) {
    localStorage.setItem(
      'videoplayer-current-time',
      JSON.stringify(evt.seconds)
    )
  }, 1000)  
   
);

player
    .setCurrentTime(localStorage.getItem('videoplayer-current-time'))
    .then(function (seconds) {
    });

