let player = null;

const initYoutubeIframe = () => {
  const tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';

  const $firstScriptTag = document.getElementsByTagName('script')[0];
  $firstScriptTag.parentNode.insertBefore(tag, $firstScriptTag);
};

// eslint-disable-next-line no-unused-vars
async function onYouTubeIframeAPIReady() {
  // eslint-disable-next-line no-undef
  const content = (await api('src/music.json'))['Edu FALASCHI - Sacrifice'];
  const height = screen.height * 0.5;
  const width = screen.width * 0.95;

  // eslint-disable-next-line no-undef
  player = new YT.Player('player', {
    height,
    width,
    videoId: content.videoId,
    playerVars: {
      controls: 0,
      disablekb: 1,
    },
    events: {
      // eslint-disable-next-line no-use-before-define
      onReady: () => app(content.subtitles),
    },
  });
}

const pauseVideo = () => player.pauseVideo();

const playVideo = (content, indexSubtitle) => {
  player.playVideo();
  // eslint-disable-next-line no-use-before-define
  loadContent(content, indexSubtitle);
};

const clickResponse = (response, form, content, indexSubtitle) => {
  const $formClear = form;
  // avaliar resposta e incrementar acerto *response
  $formClear.innerHTML = '';
  playVideo(content, indexSubtitle);
};

const query = (content, indexSubtitle, question) => {
  let newButton;
  const $form = document.querySelector('form');

  $form.innerHTML = '';

  question.forEach((element) => {
    newButton = document.createElement('button');
    newButton.onclick = () => clickResponse(
      element,
      $form,
      content,
      indexSubtitle,
    );
    newButton.textContent = element;
    $form.appendChild(newButton);
  });

  // eslint-disable-next-line no-undef
  if (isLast(content, indexSubtitle)) return;

  // eslint-disable-next-line no-plusplus, no-param-reassign
  indexSubtitle++;
};

const loadContentQuery = (content, subtitlesPlayingParam, index, time) => {
  const subtitlesPlaying = subtitlesPlayingParam;

  subtitlesPlaying.innerHTML = content[index].question;

  setTimeout(() => {
    pauseVideo();
    query(content, index, content[index].options);
  }, time);
};

const loadContent = (content, indexSubtitle) => {
  const $subtitlesPlaying = document.querySelector('p');
  let { time } = content[indexSubtitle];

  // eslint-disable-next-line no-undef
  if (!isLast(content, indexSubtitle)) {
    time = content[indexSubtitle + 1].time - content[indexSubtitle].time;
  }

  if (content[indexSubtitle].options != null) {
    loadContentQuery(
      content,
      $subtitlesPlaying,
      indexSubtitle,
      time,
    );
    return;
  }

  $subtitlesPlaying.innerHTML = content[indexSubtitle].complete;

  // eslint-disable-next-line no-undef
  if (isLast(content, indexSubtitle)) return;

  setTimeout(() => loadContent(content, indexSubtitle), time);

  // eslint-disable-next-line no-plusplus, no-param-reassign
  indexSubtitle++;
};

const toMilliseconds = (value, unit) => ((value !== undefined) ? value * unit : 0);

const originalTimeToMilliseconds = (content) => {
  content.map((atual) => {
    const atualTime = atual;
    let originalTime = String(atualTime.time);
    originalTime = originalTime.split('.');

    const minutesInMilliseconds = toMilliseconds(originalTime[0], 60000);
    const secondsInMilliseconds = toMilliseconds(originalTime[1], 1000);

    atualTime.time = minutesInMilliseconds + secondsInMilliseconds;

    return atualTime;
  });
};

const app = (content) => {
  const $playButton = document.querySelector('.playButton');

  originalTimeToMilliseconds(content);

  $playButton.onclick = () => playVideo(content, 0);
};

initYoutubeIframe();
