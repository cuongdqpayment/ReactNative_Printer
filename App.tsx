/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, createRef } from 'react';
import type { PropsWithChildren } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SunmiPrinter, { AndroidPrinterEscPosTcp, HomeScreen, FindPrinter, SunmiScreen } from './printers';
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
  const onPrintTcpIp = async (ip: string = "192.168.10.150") => {

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
      console.log("Tao đang in đây qua tcp/ip 10");
      await AndroidPrinterEscPosTcp(ip, printSample);
      console.log("OK in ra được bằng Tcp Ip...!");
    } catch (err) {
      console.log("LỖI À???: " + err);
    }

  }


  const onPrintSunmi = async () => {

    const printTextSample =
      "Cho tau font tiếng Việt được không?\n" +
      'Một mẫu in tiếng việt ok đó nhỉ\n' +
      '\n' +
      '================================\n' +
      '\n' +
      "KHÁCH HÀNG:\n" +
      'Nguyễn Văn A\n' +
      '586 Nguyễn Hữu Thọ\n' +
      'Đà nẵng\n' +
      'Điện thoại : 0903500888\n' +
      '\n' +
      "Mã barcode sẽ in ở đây\n" +
      "Mã QRCode sẽ in ở đây\n" +
      '\n' +
      '\n' +
      '\n' +
      '\n' +
      '\n';

    try {
      console.log("Tao đang in qua Inner Bluetooth Sunmi đây...!");

      // in qua Bluetooth bằng API thermal
      // await AndroidPrinterBluetooth(printSample);

      // in ra dạng text
      // SunmiPrinter.printerText(printTextSample);


      /**
       * printBitmap là in ảnh có 2 tham số: 
       * encodedString: string, là chuỗi mã hóa base64 của ảnh (image)
       * pixelWidth: number là số lượng pixel theo chiều ngang của giấy 
       * với khổ giấy 58mm = 384 pixel, 80mm = 576 pixel
       */
      let base64String = "data:image/png;base64,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";

      SunmiPrinter.printBitmap(base64String, 384);
      SunmiPrinter.printerText(printTextSample);

      console.log("OK in ra được bằng Inner Bluetooth Sunmi...!");

    } catch (err) {
      console.log("LỖI À???: " + err);
    }

  }

  const [ip, setIp] = useState('192.168.10.10');

  return (

    // man hinh cu nay chay cuc ky tot
    <SafeAreaView style={backgroundStyle}>
{/* 
      <View style={styles.view}>
        <View style={styles.header}>
          <Text style={styles.headerTxt}>THIẾT LẬP THÔNG TIN MÁY IN</Text>
        </View>
        <View style={styles.body}>

          <SafeAreaView style={styles.row__value}>
            <TextInput
              style={[
                styles.text__input,
                {
                  borderWidth: 2,
                  borderColor: Colors.red,
                },
                styles.text,
              ]}
              placeholder={"Nhập địa chỉ IP nhé"}
              onChangeText={newText => setIp(newText)}
              defaultValue={ip}
            />
          </SafeAreaView>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            style={{
              borderRadius: 6,
              overflow: 'hidden',
              marginHorizontal: 5,
              shadowColor: '#000000',
              shadowOffset: {
                width: 0,
                height: 8,
              },
              shadowOpacity: 0.25,
              shadowRadius: 9,
              elevation: 3,
            }}
            onPress={() => onPrintTcpIp()}
          >
            <LinearGradient
              style={[styles.buttonWrapper]}
              colors={['#00ffff', '#00ffff']
              }
            >
              <Text
                style={[
                  styles.title
                ]}
              >
                {'In TcpIp no base64'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View> */}
      
      {/* <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
        /> */}
      {/* <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
        style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }}>
            </View>
            </ScrollView> */}

      <Button title="In tren Sunmi"
        color="#11FF00"
        onPress={onPrintSunmi}
      />
      {/* Tìm máy in */}
      <FindPrinter />
      <HomeScreen />  
    </SafeAreaView>

    // man hinh nhung nay bi loi gi khong biet

    // <NavigationContainer ref={navigationRef} >
    //   <Stack.Navigator initialRouteName="Home" >
    //     <Stack.Screen
    //       name="Home"
    //       component={HomeScreen}
    //       options={{
    //         headerTitle: 'Printer Demo',
    //       }}
    //     />
    //     <Stack.Screen
    //       name="Find"
    //       options={{
    //         headerTitle: 'Find Printer',
    //       }}
    //       component={FindPrinter}
    //     />
    //     <Stack.Screen
    //       name="Sunmi"
    //       options={{
    //         headerTitle: 'Sunmi Printer',
    //       }}
    //       component={SunmiScreen}
    //     />
    //   </Stack.Navigator >
    // </NavigationContainer >
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
  modal: {
    margin: 0,
    alignItems: 'center',
  },
  view: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    overflow: 'hidden',
    width: '90%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    rowGap: 10,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTxt: {
    color: "#005FAB",
    fontSize: 18,
    fontWeight: '600',
  },
  text: {
    fontSize: 13,
    fontWeight: '400',
  },
  body: {
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  btn: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: Colors.black,
    borderRadius: 8,
  },
  btnTxt: {
    fontSize: 13,
  },

  row: {
    width: '100%',
    // paddingHorizontal: space.space10,
  },
  row__header: {
    fontSize: 14,
    fontWeight: 'bold',
    // paddingVertical: space.space10,
  },
  row__value: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, 0.1)',
    height: 40,
  },
  text__input: {
    flex: 1,
    height: 40,
    backgroundColor: Colors.white,
    // borderRadius: radius.radius5,
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderColor: Colors.darkBlue,
  },
  buttonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 15,
    minHeight: 39,
  },
  title: {
    color: '#000',
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
  },
});


export default App;
