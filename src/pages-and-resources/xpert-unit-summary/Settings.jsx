import React, { useCallback, useContext } from 'react';
import { history } from '@edx/frontend-platform';

import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { PagesAndResourcesContext } from '../PagesAndResourcesProvider';

import SettingsModal from './settings-modal/SettingsModal';
import messages from './messages';

const XpertUnitSummarySettings = ({ intl }) => {
  const { path: pagesAndResourcesPath } = useContext(PagesAndResourcesContext);

  const handleClose = useCallback(() => {
    history.push(pagesAndResourcesPath);
  }, [pagesAndResourcesPath]);

  return (
    <SettingsModal
      appId="xpert-unit-summary"
      title={intl.formatMessage(messages.heading)}
      enableAppHelp={intl.formatMessage(messages.enableXpertUnitSummaryHelp)}
      enableAppLabel={intl.formatMessage(messages.enableXpertUnitSummaryLabel)}
      learnMoreText={intl.formatMessage(messages.enableXpertUnitSummaryLink)}
      onClose={handleClose}
    />
  );
};

XpertUnitSummarySettings.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(XpertUnitSummarySettings);
