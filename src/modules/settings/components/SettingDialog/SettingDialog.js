import React from 'react';
import { toast } from 'react-toastify';
import Piwik from 'src/utils/piwik';
import { externalLinks } from 'src/utils/externalLinks';
import settingsConst from 'src/modules/settings/const/settingConstants';
import Box from 'src/theme/box';
import BoxHeader from 'src/theme/box/header';
import BoxContent from 'src/theme/box/content';
import Dialog from 'src/theme/dialog/dialog';
import CurrencySelector from 'src/modules/settings/components/currencySelector';
import Toggle from 'src/modules/settings/components/toggle';
import styles from './settingDialog.css';

class SettingDialog extends React.Component {
  constructor() {
    super();
    this.state = {
      currencies: settingsConst.currencies,
    };

    this.setCurrency = this.setCurrency.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.toggleAutoLog = this.toggleAutoLog.bind(this);
  }

  toggleAutoLog({ target }) {
    Piwik.trackingEvent('Settings', 'button', 'Toggle autoLog');
    const { account, timerReset, settings } = this.props;
    if (!settings.autolog && account.passphrase) {
      timerReset();
    }
    this.handleCheckboxChange({ target });
  }

  setCurrency(currency) {
    const { settings } = this.props;
    if (settings.currency !== currency) this.onUpdateSettings({ currency });
  }

  handleCheckboxChange({ target: { name } }) {
    const { settings } = this.props;
    this.onUpdateSettings({ [name]: !settings[name] });
  }

  onUpdateSettings(newSettings) {
    const { settingsUpdated, t } = this.props;
    Piwik.trackingEvent('Settings', 'button', 'Update settings');
    settingsUpdated(newSettings);
    toast(t('Settings saved!'));
  }

  render() {
    const { t } = this.props;

    return (
      <Dialog hasClose className={styles.dialogWrapper}>
        <Box className={styles.wrapper}>
          <BoxHeader>
            <h1>{t('Settings')}</h1>
          </BoxHeader>
          <BoxContent className={styles.content}>
            <section className="currency">
              <h2>{t('Currency')}</h2>
              <div className={styles.fieldGroup}>
                <CurrencySelector />
              </div>
            </section>
            <section className="appearance">
              <h2>{t('Appearance')}</h2>
              <label className={`${styles.fieldGroup} ${styles.checkboxField}`}>
                <Toggle isCheckbox setting={settingsConst.keys.darkMode} />
                <div>
                  <span className={styles.labelName}>{t('Dark mode')}</span>
                  <p>{t('Enable dark mode.')}</p>
                </div>
              </label>
            </section>
            <section className="security">
              <h2>{t('Security')}</h2>
              <label className={`${styles.fieldGroup} ${styles.checkboxField}`}>
                <Toggle isCheckbox setting={settingsConst.keys.autoLog} />
                <div>
                  <span className={styles.labelName}>{t('Auto sign out')}</span>
                  <p>{t('Sign out automatically after 10 minutes.')}</p>
                </div>
              </label>
              <label className={`${styles.fieldGroup} ${styles.checkboxField}`}>
                <Toggle isCheckbox setting={settingsConst.keys.discreetMode} />
                <div>
                  <span className={styles.labelName}>{t('Discreet mode')}</span>
                  <p>{t('Hide balance and transactions amounts.')}</p>
                </div>
              </label>
            </section>
            <section className="advanced">
              <h2>{t('Advanced')}</h2>
              <label className={`${styles.fieldGroup} ${styles.checkboxField}`}>
                <Toggle isCheckbox setting={settingsConst.keys.showNetwork} />
                <div>
                  <span className={styles.labelName}>
                    {t('Network switcher')}
                  </span>
                  <p>
                    {t(
                      'Enable network switcher to connect to different networks or service nodes when signing in.',
                    )}
                  </p>
                </div>
              </label>
              <label className={`${styles.fieldGroup} ${styles.checkboxField}`}>
                <Toggle
                  isCheckbox
                  setting={settingsConst.keys.enableCustomDerivationPath}
                />
                <div>
                  <span className={styles.labelName}>
                    {t('Enable custom derivation path')}
                  </span>
                  <p>{t('Modify recovery phrase derivation path')}</p>
                </div>
              </label>
            </section>
            <section className="privacy">
              <h2>{t('Privacy')}</h2>
              <label className={`${styles.fieldGroup} ${styles.checkboxField}`}>
                <Toggle isCheckbox setting={settingsConst.keys.statistics} />
                <div>
                  <span className={styles.labelName}>
                    {t('Anonymous analytics collection')}
                  </span>
                  <p>
                    {t('Help improve Lisk by sending anonymous usage data.')}
                  </p>
                  <a
                    target="_blank"
                    href={externalLinks.privacyPolicy}
                    className={styles.link}
                  >
                    {t('Privacy policy')}
                  </a>
                </div>
              </label>
            </section>
          </BoxContent>
        </Box>
      </Dialog>
    );
  }
}

export default SettingDialog;
