(function(exportName) {
  var exports = exports || {};
  /**
   * 创建开发者工具状态监听器
   *
   * @param {Object|Function} options 配置项
   * @param {number} options.delay 侦测频率，单位：ms
   * @param {boolean} options.once 只触发一次
   * @param {string} option.label 显示文字
   * @param {Function} options.onchange 状态发生改变 function (status) {}
   * @return {Object} 返回开发者工具状态监听器
   */
  function create(options) {
    if (typeof options === "function") {
      options = {
        onchange: options
      };
    }
    options = options || {};
    var delay = options.delay || 1000;
    var instance = {};
    instance.onchange = options.onchange;
    var status = "unknown";
    /**
     * 获取开发者工具状态
     *
     * @return {string} "unknown": 未知, "on": 开启, "off": 关闭
     */
    function getStatus() {
      return status;
    }
    instance.getStatus = getStatus;
    function checkHandler() {
      if (
        window.Firebug &&
        window.Firebug.chrome &&
        window.Firebug.chrome.isInitialized
      ) {
        setStatus("on");
        return;
      }
      var r = /./;
      r.toString = function() {
        checkStatus = "on";
        setStatus("on");
      };
      checkStatus = "off";
      console.log("%c", r, options.label || "");
      if (!options.once) {
        if (console.clear) {
          console.clear();
        }
      }
      setStatus(checkStatus);
    }
    /**
     * 设置开发者工具状态
     *
     * @param {string} value 状态 "unknown": 未知, "on": 开启, "off": 关闭
     */
    function setStatus(value) {
      if (status !== value) {
        status = value;
        if (typeof instance.onchange === "function") {
          instance.onchange(value);
        }
      }
    }
    var timer;
    if (!options.once) {
      setInterval(checkHandler, delay);
      window.addEventListener("resize", checkHandler);
    } else {
      checkHandler();
    }
    /**
     * 是否已释放
     */
    var freed;
    /**
     * 释放资源
     */
    function free() {
      if (freed) {
        return;
      }
      freed = true;
      if (!options.once) {
        window.removeEventListener("resize", checkHandler);
        clearInterval(timer);
      }
    }
    instance.free = free;
    return instance;
  }
  exports.create = create;
  if (typeof define === "function") {
    if (define.amd || define.cmd) {
      define(function() {
        return exports;
      });
    }
  } else if (typeof module !== "undefined" && module.exports) {
    module.exports = exports;
  } else {
    window[exportName] = exports;
  }
})("jdetects");
