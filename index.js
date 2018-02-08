var exec = require("child_process").execSync;
var MachineID;

if (process.platform == "darwin") {
  var res = exec("ioreg -l | grep IOPlatformSerialNumber");
  var hddid = res.toString().replace(/"/gi, '');
  hddid = hddid.toString().replace('=', '');
  hddid = hddid.toString().replace('|', '');
  hddid = hddid.toString().replace('IOPlatformSerialNumber', '');
  MachineID =  hddid.trim();
} else if (process.platform == "win32") {
   // var res = exec("wmic path win32_physicalmedia get SerialNumber");
    var res = exec("wmic bios get SerialNumber");
    var hddid = res.toString().replace("SerialNumber", "");
    var serial1 = hddid.trim();

    var res11 = exec("wmic bios get version");
    var hddid11 = res11.toString().replace("Version", "");
    var serial11 = hddid11.trim();

    var res2 = exec("wmic baseboard get SerialNumber");
    var hddid2 = res2.toString().replace("SerialNumber", "");
    serial2 = hddid2.trim();

    var res22 = exec("wmic baseboard get Product");
    var hddid22 = res22.toString().replace("Product", "");
    serial22 = hddid22.trim();

    var res23 = exec("wmic baseboard get Manufacturer");
    var hddid23 = res23.toString().replace("Manufacturer", "");
    serial23 = hddid23.trim();

    var res3 = exec("wmic path win32_computersystemproduct get uuid");
    hddid3 = res3.toString().replace("UUID", "");
    serial3 = hddid3.trim();

    var res33 = exec("wmic path win32_computersystemproduct get IdentifyingNumber");
    hddid33 = res33.toString().replace("IdentifyingNumber", "");
    serial33 = hddid33.trim();

    var res34 = exec("wmic path win32_computersystemproduct get Name");
    hddid34 = res34.toString().replace("Name", "");
    serial34 = hddid34.trim();

    var res35 = exec("wmic path win32_computersystemproduct get Version");
    hddid35 = res35.toString().replace("Version", "");
    serial35 = hddid35.trim();

    MachineID = serial1 + serial11 + serial2 + serial22 + serial23 + serial3 + serial33 + serial34 + serial35;

} else if (process.platform == "linux" || process.platform == "freebsd") {
    var res = exec("/sbin/udevadm info --query=property --name=sda | grep ID_SERIAL_SHORT");
    var hddid = res.toString().replace("ID_SERIAL_SHORT=", "");
    MachineID =  hddid.trim();
} else MachineID = "";

console.log(MachineID);