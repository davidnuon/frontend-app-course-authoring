import React, { useCallback, useContext, useState } from 'react';
import { history } from '@edx/frontend-platform';
import { Form, Stack } from '@edx/paragon';

import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { PagesAndResourcesContext } from '../PagesAndResourcesProvider';

import AppSettingsModal from '../app-settings-modal/AppSettingsModal';
import messages from './messages';

const XpertUnitSummarySettings = ({ intl }) => {
  const { path: pagesAndResourcesPath } = useContext(PagesAndResourcesContext);

  const handleClose = useCallback(() => {
    history.push(pagesAndResourcesPath);
  }, [pagesAndResourcesPath]);

  const [value, setValue] = useState('green');
  const handleChange = e => setValue(e.target.value);
  const optionClassName = 'p-4 rounded-lg border';
  return (
    <AppSettingsModal
      appId="xpert-unit-summary"
      title={intl.formatMessage(messages.heading)}
      enableAppHelp={intl.formatMessage(messages.enableXpertUnitSummaryHelp)}
      enableAppLabel={intl.formatMessage(messages.enableXpertUnitSummaryLabel)}
      learnMoreText={intl.formatMessage(messages.enableXpertUnitSummaryLink)}
      onClose={handleClose}
    >
      {
      () => (

        <Form.Group>
          <Form.RadioSet
            name="colors"
            onChange={handleChange}
            value={value}
          >
            <Stack gap={3}>
              <div className={optionClassName}>
                <Form.Radio value="all-units-enabled-by-default">
                  {intl.formatMessage(messages.allUnitsEnabledByDefault)}
                </Form.Radio>
              </div>
              <div className={optionClassName}>
                <Form.Radio value="no-units-enabled-by-default">
                  {intl.formatMessage(messages.noUnitsEnabledByDefault)}
                </Form.Radio>
              </div>
            </Stack>
          </Form.RadioSet>
        </Form.Group>
      )
    }
    </AppSettingsModal>
  );
};

XpertUnitSummarySettings.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(XpertUnitSummarySettings);
