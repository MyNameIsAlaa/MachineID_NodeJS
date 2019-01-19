const exec = require("child_process").execSync;

/*
Get a unique Machine ID on Windows, Mac & Linux 
By Alaa Selim
E-mail: alaa0selim@gmail.com
*/

exports.GetMachineID = function () {

    if (process.platform == "darwin") {
        var res = exec("ioreg -l | grep IOPlatformSerialNumber");
        return res.toString().replace(/"/gi, '').replace('=', '').replace('|', '').replace('IOPlatformSerialNumber', '').trim();


    } else if (process.platform == "win32") {
        // var res = exec("wmic path win32_physicalmedia get SerialNumber");
        var res = exec("wmic bios get SerialNumber");
        var serial0 = res.toString().replace("SerialNumber", "").trim();

        var bios_version = exec("wmic bios get version");
        var serial1 = bios_version.toString().replace("Version", "").trim();

        var SerialNumber = exec("wmic baseboard get SerialNumber");
        var serial2 = SerialNumber.toString().replace("SerialNumber", "").trim();

        var baseboard_product = exec("wmic baseboard get Product");
        var serial3 = baseboard_product.toString().replace("Product", "").trim();

        var baseboard_Manufacturer = exec("wmic baseboard get Manufacturer");
        var serial4 = baseboard_Manufacturer.toString().replace("Manufacturer", "").trim();

        var uuid = exec("wmic path win32_computersystemproduct get uuid");
        var serial5 = uuid.toString().replace("UUID", "").trim();

        var IdentifyingNumber = exec("wmic path win32_computersystemproduct get IdentifyingNumber");
        var serial6 = IdentifyingNumber.toString().replace("IdentifyingNumber", "").trim();

        var win_Name = exec("wmic path win32_computersystemproduct get Name");
        var serial7 = win_Name.toString().replace("Name", "").trim();

        var win_Version = exec("wmic path win32_computersystemproduct get Version");
        var serial8 = win_Version.toString().replace("Version", "").trim();

        return serial0 + serial1 + serial2 + serial3 + serial4 + serial5 + serial6 + serial7 + serial8;

    } else if (process.platform == "linux" || process.platform == "freebsd") {
        var res = exec("/sbin/udevadm info --query=property --name=sda | grep ID_SERIAL_SHORT");
        return res.toString().replace("ID_SERIAL_SHORT=", "").trim();
    } else return null;


}


