import { defineConfig } from 'vitepress';

export default defineConfig({
  appearance: true,
  base: '/release-ops/',
  title: 'release-ops',
  description: 'Project release operations.',

  themeConfig: {
    logo: '/logo.svg',
    nav: [{ text: 'Guide', link: '/' }],
    search: {
      provider: 'local',
    },
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/yujinpan/release-ops',
      },
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present yujinpan',
    },
    lastUpdatedText: 'Last Updated',
  },

  async transformHtml(code) {
    return code.replace(
      '</body>',
      `
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-S66MPLRFJZ"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-S66MPLRFJZ');
</script>
</body>
`,
    );
  },
});
