import React, { useState } from "react";
import styles from './index.module.scss'
import { Tabs,  Tooltip, message } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import Awardrecord from "./awardrecord";
import Invitationrecord from "./Invitationrecord";
import useTranslationLanguage from "@/hooks/useTranslationLanguage";
const Invitation = () => {
    const [AwardrecordList, setAwardrecordList] = useState<any[]>([{ time: '1', b: '2', c: '2', d: '22' }, {time: '12', b: '2', c: '2', d: '22' }])
    const [InvitationrecordList, setInvitationrecordList] = useState<any[]>([])
    const { t } = useTranslationLanguage()

    const onCopy = () => {
        // copy('1')
        message.success(t('Copiedsuccessfully'))
    }
    const onChange = (key: string) => {
        console.log(key);
    };
    return <div className={styles.invitation}>
        <div className={styles.invarianttop}>
            <div className={styles.invariantleft}>
                <div className={styles.invarianttopinfomation}>
                    <div className={styles.invitImg}>
                        <img src="/images/invitation.png" alt="" />
                    </div>
                    <div className={styles.invittitle}>
                        <div className={styles.invitspan}>
                            {t('invitefriends')}
                        </div>
                        <div className={styles.income}>
                            {t('earnmore')}
                        </div>
                    </div>
                </div>
                <div className={styles.invariantdestir}>
                    {t('invitationdescribe')}
                </div>
                <div className={styles.note}>
                    {t('invitationnote')}
                </div>
            </div>
            <div className={styles.invariantright}>
                <div className={styles.righttitle}>
                    <div className={styles.righttop}>
                        <div className={styles.rightItem} style={{ width: '50%' }}>
                            <div className={styles.itemtitle}>{t('Referral Level')}</div>
                            <div className={styles.itemcont}>333</div>
                        </div>
                        <div className={styles.rightItem} style={{ flex: 1 }}>
                            <div className={styles.itemtitle}>{t('ELE Reward')}</div>
                            <div className={styles.itemcont}>333</div>
                        </div>
                    </div>
                    <div className={styles.rightborrder}></div>
                    <div className={styles.rightcont}>
                        123123
                    </div>
                    <div className={styles.rightfooter}>
                        timmer
                    </div>
                </div>
                <div className={styles.invariantlink}>
                    <div className={styles.invariantlinktitle}>
                        {t('Invitationlink')}
                    </div>
                    <div className={styles.link}>
                        <div className={styles.linkcont}> https//www.n2ft.com/invite?ref12312312
                            https//www.n2ft.com/invite?ref12312312https//www.n2ft.com/invite?ref12312312https//www.n2ft.com/invite?ref12312312
                        </div>
                        <div className={styles.linkcopy} onClick={onCopy}>
                            <img src="/images/copy.png" alt="" />
                        </div>
                    </div>
                </div>
                <div className={styles.invariantbtn}>
                    {t('invitefriends')}
                </div>
            </div>
        </div>
        <div className={styles.invitationcont}>
            <div className={styles.invitationconttitle}>
                {t('dataoverview')}
            </div>
            <div className={styles.cont}>
                <div className={styles.invitationItem}>
                    <div className={styles.invitationItemTop}>{t('Rewardtokens')}
                        <Tooltip placement="top" title={<div className={styles.tiptext}>
                            {t('Rewardtokenstips')}
                        </div>}
                        >
                            <div className={styles.tip}>
                                <img src="/images/tip.png" alt="" />
                            </div>
                        </Tooltip>
                    </div>
                    <div className={styles.invitationItemnumber}>0</div>
                </div>
                <div className={styles.invitationItem}>
                    <div className={styles.invitationItemTop}>{t('friendsnumber')}
                        <Tooltip placement="top" title={<div className={styles.tiptext}>
                            {t('usernumber')}
                        </div>}
                        >
                            <div className={styles.tip}>
                                <img src="/images/tip.png" alt="" />
                            </div>
                        </Tooltip></div>
                    <div className={styles.invitationItemnumber}>0</div>
                </div>
                <div className={styles.invitationItem}>
                    <div className={styles.invitationItemTop}>{t('activatednumber')}
                        <Tooltip placement="top" title={<div className={styles.tiptext}>
                            {t('invitednumber')}
                        </div>}
                        >
                            <div className={styles.tip}>
                                <img src="/images/tip.png" alt="" />
                            </div>
                        </Tooltip></div>
                    <div className={styles.invitationItemnumber}>0</div>
                </div>
            </div>
        </div>
        <div className={styles.rewarddetails}>
            <div className={styles.rewarddetailstitle}>
                {t('Rewarddetails')}
            </div>
            <div className={styles.rewardcont}>
                <Tabs>
                    <TabPane tab={t('Awardrecord')} key="1">
                        <Awardrecord list={AwardrecordList} />
                    </TabPane>
                    <TabPane tab={t('Invitationrecord')} key="2">
                        <Invitationrecord list={InvitationrecordList}/>
                    </TabPane>
                </Tabs>
            </div>
        </div>
    </div>
}
export default Invitation