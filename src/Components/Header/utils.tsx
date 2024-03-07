import useTranslationLanguage from "@/hooks/useTranslationLanguage";

export const pages = () => {
  const { t } = useTranslationLanguage()
  return [
    {
      name: t('ExtremeSwap'),
      link: '/extremeSwap',
      able: true,
      file: true,
      children: [
        {
          name: t('ExtremeSwap'),
          link: '/extremeSwap',
        },
        {
          name: t('orders'),
          link: '/extremeSwap/orders',
        },
        // {
        //   name: t('teams'),
        //   link: '/extremeSwap/teams',
        // },
      ]
    },
    {
      name: t('reward'),
      link: '/reward',
      able: true,
      file: true,
    },

    {
      name: t('Invite'),
      link: '/Invite',
      able: true,
      file: true,
    },
    {
      name: t('Launchpad'),
      link: '/launchpad',
      able: true,
      file: false,

    },
    {
      name: t('Explore'),
      link: '/explore',
      able: false,
      file: true,
      children: [

        // {
        //     name: 'MarketPlace',
        //     link: '/marketplace'
        // },
        // {
        //     name: 'Collections',
        //     link: '/collections'
        // },
        // {
        //     name: 'Verified Creator',
        //     link: '/verified-creator'
        // },
        // {
        //     name: 'Domain Names',
        //     link: '/domain-names'
        // },
        // {
        //     name: 'Domain Names',
        //     link: '/domain-names'
        // },
        // {

        //     name: t('pre'),
        //     link: '/presale'
        // }
      ]
    },

    {
      name: t('ranking'),
      link: '/ranking',
      able: false,
      file: true,

    }
  ];
};
export const Languages: Record<string, any> = {
  'en-US': {
    key: 'EN',
    icon: '/images/en-US.png',
    title: 'English'
  },
  'zh-CN': {
    key: 'CN',
    icon: '/images/zh-CN.png',
    title: '繁体中文'
  }
}