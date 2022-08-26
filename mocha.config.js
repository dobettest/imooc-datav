LT_USERNAME = process.env.LT_USERNAME || "liugongming";
LT_ACCESS_KEY = process.env.LT_ACCESS_KEY || "lw0RpM99n0zPbBbXchVaPSbEKW4mxyMW2DYsWan4hEThqKaL9B";

var config = {
  commanCapabilities: {
    build: "imooc-datav", //Build name
    tunnel: true // Make it true to run the localhost through tunnel
  },
  multiCapabilities: [
      // {
      //   // Desired capabilities
      //   name: "chromeTest", // Test name
      //   platform: "Windows 10", // OS name
      //   browserName: "Chrome",
      //   version: "92.0",
      //   resolution: "1024x768",
      //   visual: false, // To take step by step screenshot
      //   network: false, // To capture network Logs
      //   console: false // To capture console logs.
      // },
      {
        name: "ieTest", // Test name
        platform: "Windows 7", // OS name
        browserName: "Internet Explorer",
        version: "10.0",
        resolution: "1280x800",
        visual: false, // To take step by step screenshot
        network: false, // To capture network Logs
        console: false // To capture console logs.
      }
    ]
};

exports.capabilities = [];
// Code to support common capabilities
config.multiCapabilities.forEach(function(caps) {
  var temp_caps = JSON.parse(JSON.stringify(config.commanCapabilities));
  for (var i in caps) temp_caps[i] = caps[i];
  exports.capabilities.push(temp_caps);
});