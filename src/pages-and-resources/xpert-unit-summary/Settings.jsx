import React from 'react';
import PropTypes from 'prop-types';

import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';

import AppSettingsModal from '../app-settings-modal/AppSettingsModal';
import messages from './messages';

const XpertUnitSummary = ({ intl, onClose }) => (
  <AppSettingsModal
    appId="xpert-unit-summary"
    title={intl.formatMessage(messages.heading)}
    enableAppHelp={intl.formatMessage(messages.enableCalculatorHelp)}
    enableAppLabel={intl.formatMessage(messages.enableCalculatorLabel)}
    learnMoreText={intl.formatMessage(messages.enableCalculatorLink)}
    onClose={onClose}
  />
);

XpertUnitSummary.propTypes = {
  intl: intlShape.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default injectIntl(XpertUnitSummary);
