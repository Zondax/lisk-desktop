import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import htmlStringToReact from 'src/utils/htmlStringToReact';
import { regex } from 'src/const/regex';
import {
  addSearchParamsToUrl,
  removeSearchParamsFromUrl,
} from 'src/utils/searchParams';
import { appUpdateAvailable } from 'src/redux/actions';
import FlashMessageHolder from 'src/theme/flashMessage/holder';
import NewReleaseMessage from '../detail/info/newReleaseMessage/newReleaseMessage';

const useIpc = (history) => {
  const dispatch = useDispatch();

  const { ipc } = window;

  if (!ipc) return;

  useEffect(() => {
    ipc.on('update:available', (action, { version, releaseNotes }) => {
      const readMore = () => {
        addSearchParamsToUrl(history, { modal: 'newRelease' });
      };

      const remindMeLater = () => {
        FlashMessageHolder.deleteMessage('NewRelease');
        removeSearchParamsFromUrl(history, ['modal']);
      };

      const updateNow = () => {
        ipc.send('update:started');
        setTimeout(() => {
          FlashMessageHolder.deleteMessage('NewRelease');
        }, 500);
      };

      const [releaseSummary] = releaseNotes
        .match(regex.releaseSummary)
        .slice(1);
      dispatch(
        appUpdateAvailable({
          version,
          releaseNotes,
          remindMeLater,
          updateNow,
        }),
      );

      FlashMessageHolder.addMessage(
        <NewReleaseMessage
          version={version}
          releaseNotes={releaseNotes}
          releaseSummary={htmlStringToReact(releaseSummary)}
          readMore={readMore}
          updateNow={updateNow}
        />,
        'NewRelease',
      );
    });
  }, []);
};

export default useIpc;
