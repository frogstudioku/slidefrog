const {app,BrowserWindow,Menu,session,desktopCapturer}=require('electron');
const path=require('path');

app.setAppUserModelId('com.frogstudioku.slidefrog');

if(!app.requestSingleInstanceLock()){
  app.quit();
}else{
  let win=null,splash=null;
  app.on('second-instance',()=>{if(win){if(win.isMinimized())win.restore();win.focus()}});

  app.whenReady().then(()=>{
    const ses=session.defaultSession;
    // Screenshot tool (Insert > Screenshot)
    ses.setDisplayMediaRequestHandler((req,cb)=>desktopCapturer.getSources({types:['screen']}).then(s=>cb({video:s[0]})).catch(()=>cb({})));
    // Microphone (Record Slide Show), monitor info (Slide Show > Monitor), fullscreen, clipboard
    ses.setPermissionRequestHandler((wc,perm,cb)=>cb(['media','window-management','fullscreen','clipboard-sanitized-write'].includes(perm)));

    Menu.setApplicationMenu(null);
    // Splash screen (Adobe-style card, not full screen)
    const t0=Date.now();
    splash=new BrowserWindow({width:920,height:632,frame:false,transparent:true,resizable:false,skipTaskbar:true,alwaysOnTop:true,center:true,show:false,hasShadow:false,backgroundColor:'#00000000',title:'Slide Frog',icon:path.join(__dirname,'icon.png'),webPreferences:{contextIsolation:true,nodeIntegration:false}});
    splash.once('ready-to-show',()=>splash&&splash.show());
    splash.on('closed',()=>{splash=null});
    splash.loadFile('splash.html');
    win=new BrowserWindow({
      width:1366,height:820,minWidth:1000,minHeight:640,show:false,
      title:'Slide Frog',icon:path.join(__dirname,'icon.png'),backgroundColor:'#171414',
      webPreferences:{contextIsolation:true,nodeIntegration:false,spellcheck:true}
    });
    win.once('ready-to-show',()=>{
      const wait=Math.max(0,3000-(Date.now()-t0));   // keep the splash visible for ~3 seconds
      setTimeout(()=>{if(!win)return;win.maximize();win.show();if(splash&&!splash.isDestroyed())splash.close()},wait);
    });
    // Presenter / audience windows opened by Slide Show
    win.webContents.setWindowOpenHandler(()=>({action:'allow',overrideBrowserWindowOptions:{backgroundColor:'#000000',autoHideMenuBar:true}}));
    win.webContents.on('will-navigate',e=>e.preventDefault());
    win.on('closed',()=>{win=null});
    win.loadFile('index.html');
  });

  app.on('window-all-closed',()=>app.quit());
}
