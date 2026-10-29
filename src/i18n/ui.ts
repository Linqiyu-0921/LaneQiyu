export type Lang = 'zh' | 'zh-Hant' | 'en'

export const dictionaries: Record<Lang, Record<string, string>> = {
  zh: {
    'nav.blog': '博客',
    'nav.writing': '写作',
    'nav.projects': '项目',
    'nav.about': '关于',
    'ui.search': '搜索',
    'ui.theme': '切换主题',
    'ui.menu': '菜单',

    'home.title': '首页',
    'home.about': '关于',
    'home.posts': '文章',
    'home.education': '教育经历',
    'home.projects': '项目',
    'home.hobbies': '兴趣',
    'home.moreAbout': '了解更多',
    'home.morePosts': '更多文章',

    'about.title': '关于',
    'about.education': '教育经历',
    'about.hobbies': '兴趣爱好',
    'about.tools': '常用工具',
    'about.social': '社交网络',
    'about.timeline': '时间线',
    'about.contact': '联系方式',
    'about.toolsIntro': '目前常用的工具：',
    'tools.design': '设计',
    'tools.efficiency': '效率',
    'tools.development': '开发',
    'tools.environment': '环境',
    'tool.image': '图像处理',
    'tool.vector': '矢量绘图',
    'tool.motion': '动效制作',
    'tool.video': '视频剪辑',
    'tool.browser': '浏览器',
    'tool.note': '笔记',
    'tool.markdown': 'Markdown 编辑器',
    'tool.ide': '编辑器 / IDE',
    'tool.linux': 'Linux 发行版',

    'common.back': '返回',

    'blog.title': '博客',
    'blog.empty': '还没有文章。',
    'blog.viewYears': '按年份查看全部 →',
    'blog.tags': '标签',
    'blog.viewAll': '查看全部 →',

    'writing.title': '写作',
    'writing.articles': '文章',
    'writing.note': '部分文章的原文链接仍在整理中。',
    'writing.official': '访问公众号',

    'projects.title': '项目',
    'projects.github': 'GitHub 动态：',
    'projects.list': '项目',

    'search.title': '搜索',
    'search.hint': '输入关键词，搜索站内文章。',

    'archives.title': '归档',
    'archives.empty': '还没有文章。',

    'notfound.hint': '页面好像走丢了。',
    'notfound.desc': '抱歉，没有找到你要找的页面。',
    'notfound.home': '回到首页'
  },
  'zh-Hant': {
    'nav.blog': '部落格',
    'nav.writing': '寫作',
    'nav.projects': '專案',
    'nav.about': '關於',
    'ui.search': '搜尋',
    'ui.theme': '切換主題',
    'ui.menu': '選單',

    'home.title': '首頁',
    'home.about': '關於',
    'home.posts': '文章',
    'home.education': '教育經歷',
    'home.projects': '專案',
    'home.hobbies': '興趣',
    'home.moreAbout': '了解更多',
    'home.morePosts': '更多文章',

    'about.title': '關於',
    'about.education': '教育經歷',
    'about.hobbies': '興趣愛好',
    'about.tools': '常用工具',
    'about.social': '社群網路',
    'about.timeline': '時間線',
    'about.contact': '聯絡方式',
    'about.toolsIntro': '目前常用的工具：',
    'tools.design': '設計',
    'tools.efficiency': '效率',
    'tools.development': '開發',
    'tools.environment': '環境',
    'tool.image': '圖像處理',
    'tool.vector': '向量繪圖',
    'tool.motion': '動效製作',
    'tool.video': '影片剪輯',
    'tool.browser': '瀏覽器',
    'tool.note': '筆記',
    'tool.markdown': 'Markdown 編輯器',
    'tool.ide': '編輯器 / IDE',
    'tool.linux': 'Linux 發行版',

    'common.back': '返回',

    'blog.title': '部落格',
    'blog.empty': '還沒有文章。',
    'blog.viewYears': '按年份查看全部 →',
    'blog.tags': '標籤',
    'blog.viewAll': '查看全部 →',

    'writing.title': '寫作',
    'writing.articles': '文章',
    'writing.note': '部分文章的原文連結仍在整理中。',
    'writing.official': '前往公眾號',

    'projects.title': '專案',
    'projects.github': 'GitHub 動態：',
    'projects.list': '專案',

    'search.title': '搜尋',
    'search.hint': '輸入關鍵詞，搜尋站內文章。',

    'archives.title': '歸檔',
    'archives.empty': '還沒有文章。',

    'notfound.hint': '頁面好像走丟了。',
    'notfound.desc': '抱歉，沒有找到你要找的頁面。',
    'notfound.home': '回到首頁'
  },
  en: {
    'nav.blog': 'Blog',
    'nav.writing': 'Writing',
    'nav.projects': 'Projects',
    'nav.about': 'About',
    'ui.search': 'Search',
    'ui.theme': 'Toggle theme',
    'ui.menu': 'Menu',

    'home.title': 'Home',
    'home.about': 'About',
    'home.posts': 'Posts',
    'home.education': 'Education',
    'home.projects': 'Projects',
    'home.hobbies': 'Interests',
    'home.moreAbout': 'More about me',
    'home.morePosts': 'More posts',

    'about.title': 'About',
    'about.education': 'Education',
    'about.hobbies': 'Interests',
    'about.tools': 'Tools',
    'about.social': 'Social',
    'about.timeline': 'Timeline',
    'about.contact': 'Contact',
    'about.toolsIntro': 'Tools I use:',
    'tools.design': 'Design',
    'tools.efficiency': 'Productivity',
    'tools.development': 'Development',
    'tools.environment': 'Environment',
    'tool.image': 'Image editing',
    'tool.vector': 'Vector drawing',
    'tool.motion': 'Motion graphics',
    'tool.video': 'Video editing',
    'tool.browser': 'Browser',
    'tool.note': 'Notes',
    'tool.markdown': 'Markdown editor',
    'tool.ide': 'Editor & IDE',
    'tool.linux': 'Linux distro',

    'common.back': 'Back',

    'blog.title': 'Blog',
    'blog.empty': 'No posts yet.',
    'blog.viewYears': 'View all posts by years →',
    'blog.tags': 'Tags',
    'blog.viewAll': 'View all →',

    'writing.title': 'Writing',
    'writing.articles': 'Articles',
    'writing.note': 'Some article links are still being compiled.',
    'writing.official': 'Visit WeChat account',

    'projects.title': 'Projects',
    'projects.github': 'GitHub activity:',
    'projects.list': 'Projects',

    'search.title': 'Search',
    'search.hint': 'Enter a keyword to search posts on this site.',

    'archives.title': 'Archives',
    'archives.empty': 'No posts yet.',

    'notfound.hint': 'This page seems to be lost.',
    'notfound.desc': "Sorry, we couldn't find the page you're looking for.",
    'notfound.home': 'Back to home'
  }
}

export const titleKeys: Record<string, string> = {
  '/': 'home.title',
  '/blog/': 'blog.title',
  '/writing/': 'writing.title',
  '/projects/': 'projects.title',
  '/about/': 'about.title',
  '/search/': 'search.title',
  '/archives/': 'archives.title'
}

export function titleKeyFor(path: string) {
  const normalized = path === '/' ? '/' : path.replace(/\/+$/, '') + '/'
  return titleKeys[normalized]
}

export const langLabels: Record<Lang, string> = {
  zh: '简',
  en: 'EN',
  'zh-Hant': '繁'
}
