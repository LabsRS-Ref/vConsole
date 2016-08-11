/**
 * vConsole System Tab
 *
 * @author WechatFE
 */

import * as tool from '../lib/tool.js';
import VConsoleLogTab from './log.js';
import tplTabbox from './tabbox_system.html';

class VConsoleDefaultTab extends VConsoleLogTab {

  constructor(...args) {
    super(...args);
    this.tplTabbox = tplTabbox;
    this.allowUnformattedLog = false; // only logs begin with `[system]` can be displayed
  }

  onInit() {
    super.onInit();
    this.printSystemInfo();
  }

  printSystemInfo() {
  	// print system info
    let ua = navigator.userAgent,
      logMsg = '';
    
    // current time
    let d = tool.getDate();
    console.info('[system]', 'Now:', d.year+'-'+d.month+'-'+d.day+' '+d.hour+':'+d.minute+':'+d.second+'.'+d.millisecond);

    // device & system
    
    let ipod = ua.match(/(ipod).*\s([\d_]+)/i),
      ipad = ua.match(/(ipad).*\s([\d_]+)/i),
      iphone = ua.match(/(iphone)\sos\s([\d_]+)/i),
      android = ua.match(/(android)\s([\d\.]+)/i);
    
    logMsg = 'Unknown';
    if (android) {
      logMsg = 'Android ' + android[2];
    } else if (iphone) {
      logMsg = 'iPhone, iOS ' + iphone[2].replace(/_/g,'.');
    } else if (ipad) {
      logMsg = 'iPad, iOS ' + ipad[2].replace(/_/g, '.');
    } else if (ipod) {
      logMsg = 'iPod, iOS ' + ipod[2].replace(/_/g, '.');
    }
    let templogMsg = logMsg;
    // wechat app version
    let version = ua.match(/MicroMessenger\/([\d\.]+)/i);
    logMsg = 'Unknown';
    if (version && version[1]) {
      logMsg = version[1];
      templogMsg += (', WeChat ' + logMsg);
      console.info('[system]', 'System:', templogMsg);
    } else {
      console.info('[system]', 'System:', templogMsg);
    }


    // HTTP protocol
    logMsg = 'Unknown';
    if (location.protocol == 'https:') {
      logMsg = 'HTTPS';
    } else if (location.protocol == 'http:') {
      logMsg = 'HTTP';
    } else {
      logMsg = location.protocol.replace(':', '');
    }
    templogMsg = logMsg;
    // network type
    let network = ua.toLowerCase().match(/ nettype\/([^ ]+)/g);
    logMsg = 'Unknown';
    if (network && network[0]) {
      network = network[0].split('/');
      logMsg = network[1];
      templogMsg += (', ' + logMsg);
      console.info('[system]', 'Network:', templogMsg);
    } else {
      console.info('[system]', 'Protocol:', templogMsg);
    }

    // User Agent
    console.info('[system]', 'UA:', ua);
    
    

    // performance related
    // use `setTimeout` to make sure all timing points are available
    setTimeout(function() {
      let performance = window.performance || window.msPerformance || window.webkitPerformance;

      // timing
      if (performance && performance.timing) {
        let t = performance.timing;

        if (t.navigationStart && t.domainLookupStart) {
          console.info('[system]', 'navigationCost:', (t.domainLookupStart - t.navigationStart)+'ms');
        }
        if (t.domainLookupEnd && t.domainLookupStart) {
          console.info('[system]', 'dnsCost:', (t.domainLookupEnd - t.domainLookupStart)+'ms');
        }
        if (t.connectEnd && t.connectStart) {
          console.info('[system]', 'tcpCost:', (t.connectEnd - t.connectStart)+'ms');
        }
        if (t.connectEnd && t.secureConnectionStart) {
          console.info('[system]', 'sslCost:', (t.connectEnd - t.secureConnectionStart)+'ms');
        }
        if (t.responseStart && t.requestStart) {
          console.info('[system]', 'requestCost:', (t.responseStart - t.requestStart)+'ms');
        }
        if (t.responseEnd && t.responseStart) {
          console.info('[system]', 'responseCost:', (t.responseEnd - t.responseStart)+'ms');
        }
        if (t.domContentLoadedEventStart && t.domLoading) {
          console.info('[system]', 'domContentCost:', (t.domContentLoadedEventStart - t.domLoading)+'ms');
        }
        if (t.domComplete && t.domLoading) {
          console.info('[system]', 'domCompleteCost:', (t.domComplete - t.domLoading)+'ms');
        }
        if (t.loadEventEnd && t.loadEventStart) {
          console.info('[system]', 'onLoadCost:', (t.loadEventEnd - t.loadEventStart)+'ms');
        }
        if (t.navigationStart && t.loadEventEnd) {
          console.info('[system]', 'totalCost:', (t.loadEventEnd - t.navigationStart)+'ms');
        }
      }
    }, 0);
  }

} // END class

const tab = new VConsoleDefaultTab('system', 'System');

export default tab;