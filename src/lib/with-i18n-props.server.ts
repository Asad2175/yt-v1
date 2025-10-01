export const getI18nStaticProps = (namespaces: string[] = ['common']) => {
  return async (ctx: { locale: string }) => {
    const { serverSideTranslations } = await import(
      'next-i18next/serverSideTranslations'
    );
    return {
      props: {
        ...(await serverSideTranslations(ctx.locale, namespaces)),
      },
    };
  };
};
