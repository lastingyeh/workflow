const config = {
  use: {
    /*  browserName用于设置浏览器名称，这个名称一般在全局参数中不用配置，通常在`项目`（project）参数中设置，只可以有三个可选值："chromium" 、"firefox"、"webkit"，默认值为'chromium'。  */
    browserName: 'chromium',
    /*  defaultBrowserType用于设置默认浏览器，同上面的browserName类似，只是这个属性用于设置默认值。  */
    defaultBrowserType: 'chromium',
    /*  headless用于设置是否采用无头模式运行浏览器，默认值是true  */
    headless: true,
    /*  channel用于指定使用本机按照的浏览器，目前可以支持的值是"chrome"，"chrome-beta", "chrome-dev", "chrome-canary","msedge", "msedge-beta", "msedge-dev", "msedge-canary"，需要注意的是，本机浏览器需要默认安装在本机上。如果不设置，则表示使用playwright自己下载的浏览器。  */
    channel: 'chrome',
    /*  启动浏览器的相关配置  */
    launchOptions: {
      /*  传给浏览器的参数，必须是浏览器所支持的命令行参数，比如chromium浏览器，可以参考http://peter.sh/experiments/chromium-command-line-switches  */
      args: ['--force-first-run'],
      /*  和前面的channel是同一含义。  */
      channel: 'chrome',
      /*  是否在沙盒内运行，默认是false  */
      chromiumSandbox: true,
      /*  是否打开开发者工具，只对chromium浏览器有效，当设置为true时，之前设置的headless则无效。默认值为false  */
      devtools: true,
      /*  用于设置浏览器下载文件的目录  */
      downloadsPath: '/temp/download/',
      /*  指定浏览器的路径，一般不在全局配置中指定，而在项目配置中配置，一旦配置了浏览器的可执行文件的位置，那么就不会去找playwright自己默认下载的浏览器的位置了。  */
      executablePath: '/app/Google Chrome/chrome',
      /*  使用SIGHUP“挂起”（Hang Up）信号关闭浏览器，默认是true  */
      handleSIGHUP: true,
      /*  使用Ctrl+C信号关闭浏览器，默认是true  */
      handleSIGINT: true,
      /*  使用SIGTERM信号关闭浏览器，默认是true  */
      handleSIGTERM: true,
      /*  和前面的headless是同一含义。  */
      headless: true,
      /*  是否忽略playwright本身启动浏览器时后传递给浏览器的参数，默认是false  */
      ignoreDefaultArgs: true,
      /*  用于设置代理服务器  */
      proxy: {
        /*  HTTP和SOCKS代理都支持  */
        server: 'http://myproxy.com:3128',
        /*  指定哪些需要绕开代理，用逗号分开  */
        bypass: '.com, chromium.org, .domain.com',
        /*  代理用户名  */
        username: 'myname',
        /*  代理密码  */
        password: '123456',
      },
      /*  设置操作间隔的等待时间，用于减慢playwright执行的速度，单位是毫秒  */
      slowMo: 200,
      /*  等待浏览器启动的超时时间，单位为毫秒，默认值为30000毫秒（30秒）  */
      timeout: 30000,
      /*  用于设置追逐记录trace包的存放位置  */
      tracesDir: 'traces',
    },
    /*  是否接受文件下载，默认值为true  */
    acceptDownloads: true,
    /*  设置知否绕开页面的内容安全策略（Content-Security-Policy）  */
    bypassCSP: true,
    /*  用于设置页面匹配的css的media属性，比如某些页面的css设置了media属性，来展示dark模式，那就可以不用手工去选择，而直接匹配上，可选的值为：'light'`, `'dark'`, `'no-preference'。默认值是'light'  */
    colorScheme: 'dark',
    /*  是否运行js脚本运行，默认值为true  */
    javaScriptEnabled: true,
    /*  设置浏览器本地语言  */
    locale: 'zh-CN',
    /*  设置浏览器获取的权限，权限可以参考https://playwright.dev/docs/api/class-browsercontext#browser-context-grant-permissions  */ permissions:
      ['geolocation', 'camera'],
    /*  同前面的launchOptions中的proxy属性  */
    proxy: {
      /*略*/
    },
    /*  浏览器窗口的大小，默认值为1028*720  */
    viewport: {
      width: 1028,
      height: 720,
    },
    /*  基础url地址。配置后，当使用page.goto("/foo")的时候，其实就会和baseUrl拼接成完整的地址。  */
    baseURL: 'https://www.baidu.com',
    /*  浏览器上下文，在playwright工具的概念中，一个page，是运行在一个context上下文中的，所以这个context配置的值，会对所有在其中的page有影响。  */ contextOptions:
      {
        /* 大部分属性和前面一样，此处略 */
      },
  },
  projects: [
    {
      /* 其他属性略 */
      use: {
        /* 此处为配置单个项目的属性，和前面的全局的use属性其实是一样的，只不过这里配置的在当前这个项目中会覆盖全局属性 */
      },
    } /* 其他类似的，略 */,
  ],
};
