import React, { useState } from "react";
import styles from './index.module.scss'
import { Input, Space, message } from "antd";
import './style.scss'
import TextArea from "antd/es/input/TextArea";
import useTranslationLanguage from "@/hooks/useTranslationLanguage";
const Edit = () => {
    const [user, setuser] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const { t } = useTranslationLanguage()

    const onChange = () => {
        console.log('mess')
    }
    return <div className={styles.editbox}>
        <div className={styles.title}>
            {t('Editinformation')}
        </div>
        <div className={styles.cont}>
            <div className={styles.editleft}>
                <div className={styles.titles}>
                    <div className={styles.avatar}>{t('avatar')}</div>
                    <div className={styles.Iconbox}>
                        <div className={styles.avatarImg}>
                            <img src="/images/acator.png" alt="" />
                        </div>
                    </div>
                </div>

                <div className={styles.destor}>
                    {t('infordescribe')}
                </div>
                <div className={styles.confirm}>
                    {t('selectdocument')}
                </div>
                <div className={styles.user}>
                    <div className={styles.usertitle}>{t('username')}</div>
                    <Input
                        value={user}
                        className={styles.userinputs}
                        allowClear
                        onChange={(e) => { setuser(e.target.value) }
                        }
                    />
                    <div className={styles.inputdescri}>
                        {t('userdescribe')}
                    </div>
                </div>
                <div className={styles.email+'email-input'}>
                    <div className={styles.emailtitle}>
                        {t('email')}
                    </div>
                    <Input
                        value={email}
                        className={styles.emailinput}
                        placeholder={t('placeholder')}
                        onChange={(e) => { setEmail(e.target.value) }
                        }
                    />
                </div>
                <div className={styles.Introduction}>
                    <div className={styles.Introductiontitle}>
                        {t('Introduction')}
                    </div>
                        <TextArea
                            style={{ height: 120, resize: 'none' }}
                            onChange={onChange}
                            placeholder="disable resize"
                            className={styles.Introductioncont}
                        />
                </div>


            </div>
            <div className={styles.editright}>
                <div className={styles.link}>
                    {t('addlink')}
                </div>
                <div className={styles.inputItem}>
                    <Space.Compact className={styles.spacecomnt}>
                        <Input addonBefore={
                            <div className={styles.groupImg}>
                                <img src="/images/mediumicon.png" alt="" />
                            </div>
                        } />
                    </Space.Compact>
                    <Space.Compact className={styles.spacecomnt}>
                        <Input addonBefore={
                            <div className={styles.groupImg}>
                                <img src="/images/Instagramicon.png" alt="" />
                            </div>
                        } />
                    </Space.Compact>
                    <Space.Compact className={styles.spacecomnt}>
                        <Input addonBefore={
                            <div className={styles.groupImg}>
                                <img src="/images/telegramicon.png" alt="" />
                            </div>
                        } />
                    </Space.Compact>
                    <Space.Compact className={styles.spacecomnt}>
                        <Input addonBefore={
                            <div className={styles.groupImg}>
                                <img src="/images/twittericon.png" alt="" />
                            </div>
                        } />
                    </Space.Compact>
                    <Space.Compact className={styles.spacecomnt}>
                        <Input addonBefore={
                            <div className={styles.groupImg}>
                                <img src="/images/Discordicon.png" alt="" />
                            </div>
                        } />
                    </Space.Compact>
                    <div className={styles.addLink}>
                        {t('sure')}
                    </div>
                    <div className={styles.mobilebtn}>
                        <div className={styles.mobilereturn}>
                            {t('return')}
                        </div>
                        <div className={styles.mobilesubmit}>
                            {t('submit')}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default Edit