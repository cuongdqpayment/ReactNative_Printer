/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React ,  {createRef} from 'react';
import type { PropsWithChildren } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import  SunmiPrinter, { AndroidPrinterEscPosTcp, HomeScreen, FindPrinter, SunmiScreen } from './printers';
export const navigationRef = createRef<any>();


import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';



type SectionProps = PropsWithChildren<{
  title: string;
}>;


function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };



  /**
   * In thông qua TCP/IP 
   * Yêu cầu biến vào là: 
   * - địa chỉ ip, 
   * - Mẫu in,
   * - Số ký tự in trên một dòng default = 38,
   * - port (cổng) của máy in default = 9100,
   * - tự động cắt giấy default = true,
   * - thời gian tự động báo lỗi timeout khi không tìm thấy máy in default = 30 000 miligiây = 30giay
   * - khổ giấy của máy in default = 
   * - openCashbox: boolean mở két đựng tiền tự động default = false;
   * - mmFeedPaper: number ;
   * - printerDpi: number ;
   * - printerWidthMM: number = Khổ giấy của máy in default = 80mm;
   */
  const onPress = async () => {

    const printSample =
      '[C]<img>https://via.placeholder.com/300.jpg</img>\n' +
      '[L]\n' +
      "[C]<u><font size='big'>ORDER N°045</font></u>\n" +
      '[L]\n' +
      '[C]================================\n' +
      '[L]\n' +
      '[L]<b>BEAUTIFUL SHIRT</b>[R]9.99e\n' +
      '[L]  + Size : S\n' +
      '[L]\n' +
      '[L]<b>AWESOME HAT</b>[R]24.99e\n' +
      '[L]  + Size : 57/58\n' +
      '[L]\n' +
      '[C]--------------------------------\n' +
      '[R]TOTAL PRICE :[R]34.98e\n' +
      "[C]<font face='Times New Roman'>Cho tau một font tiếng Việt được không?</font>\n" +
      '[R]TAX :[R]4.23e\n' +
      '[L]\n' +
      '[C]================================\n' +
      '[L]\n' +
      "[L]<font size='tall'>Customer :</font>\n" +
      '[L]Raymond DUPONT\n' +
      '[L]5 rue des girafes\n' +
      '[L]31547 PERPETES\n' +
      '[L]Tel : +33801201456\n' +
      '[L]\n' +
      "[C]<barcode type='ean13' height='10'>831254784551</barcode>\n" +
      "[C]<qrcode size='20'>http://www.developpeur-web.dantsu.com/</qrcode>\n" +
      '[L]\n' +
      '[L]\n' +
      '[L]\n' +
      '[L]\n' +
      '[L]\n';

    try {
      console.log("Tao đang in đây...!");
      await AndroidPrinterEscPosTcp('192.168.10.10', printSample);
      // await ThermalPrinterModule.printTcp({
      //   ip: '192.168.10.150',
      //   port: 9100,
      //   payload: printSample,
      //   autoCut: true,    
      // });
      console.log("OK in ra được bằng Tcp Ip...!");
      // await ThermalPrinterModule.printBluetooth({
      //   payload:"In bằng bluetooth",
      //   printerNbrCharactersPerLine:38
      // });
    } catch (err) {
      console.log("LỖI À???: " + err);
    }

  }


  const onPressBluetooth = async () => {

    const printSample =
      '[C]<img>https://via.placeholder.com/300.jpg</img>\n' +
      '[L]\n' +
      "[C]<u><font size='big'>ORDER N°045</font></u>\n" +
      '[L]\n' +
      '[C]================================\n' +
      '[L]\n' +
      '[L]<b>BEAUTIFUL SHIRT</b>[R]9.99e\n' +
      '[L]  + Size : S\n' +
      '[L]\n' +
      '[L]<b>AWESOME HAT</b>[R]24.99e\n' +
      '[L]  + Size : 57/58\n' +
      '[L]\n' +
      '[C]--------------------------------\n' +
      '[R]TOTAL PRICE :[R]34.98e\n' +
      "[C]<font face='Times New Roman'>Cho tau một font tiếng Việt được không?</font>\n" +
      '[R]TAX :[R]4.23e\n' +
      '[L]\n' +
      '[C]================================\n' +
      '[L]\n' +
      "[L]<font size='tall'>Customer :</font>\n" +
      '[L]Raymond DUPONT\n' +
      '[L]5 rue des girafes\n' +
      '[L]31547 PERPETES\n' +
      '[L]Tel : +33801201456\n' +
      '[L]\n' +
      "[C]<barcode type='ean13' height='10'>831254784551</barcode>\n" +
      "[C]<qrcode size='20'>http://www.developpeur-web.dantsu.com/</qrcode>\n" +
      '[L]\n' +
      '[L]\n' +
      '[L]\n' +
      '[L]\n' +
      '[L]\n';

    try {
      console.log("Tao đang in qua Bluetooth đây...!");
      // await AndroidPrinterBluetooth(printSample);

      SunmiPrinter.printerText(printSample);

      console.log("OK in ra được bằng Bluetooth...!");
    } catch (err) {
      console.log("LỖI À???: " + err);
    }

  }

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer ref={navigationRef} >
      <Stack.Navigator initialRouteName="Home" >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitle: 'Printer Demo',
          }}
        />
        <Stack.Screen
          name="Find"
          options={{
            headerTitle: 'Find Printer',
          }}
          component={FindPrinter}
        />
        <Stack.Screen
          name="Sunmi"
          options={{
            headerTitle: 'Sunmi Printer',
          }}
          component={SunmiScreen}
        />
      </Stack.Navigator >
    </NavigationContainer >
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
