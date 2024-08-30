
import ThermalPrinterModule from 'react-native-thermal-printer';

export const AndroidPrinterEscPosTcp = function (
  ip: string,
  payload: string,
  printerNbrCharactersPerLine: number = 38,
  port: number = 9100,
  autoCut: boolean = true,
  timeout: number = 30000,

) {
  return ThermalPrinterModule.printTcp({
    ip,
    payload,
    printerNbrCharactersPerLine,
    autoCut,
    port,
    timeout
  });;
}

export const AndroidPrinterEscPosBluetooth = function (payload: string, printerNbrCharactersPerLine: number = 38) {
  return ThermalPrinterModule.printBluetooth({
    payload,
    printerNbrCharactersPerLine,
  });
}

export default ThermalPrinterModule;